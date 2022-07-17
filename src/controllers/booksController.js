const bookModel = require("../models/booksModel");
const userModel = require("../models/userModel");
const reviewModel = require("../models/reviewModel");

//<=========================== VAlidation keys =========================>//

const {
  isValid,
  isValidRequestBody,
  isValidObjectId,
  ISBNregex,
  isValidDate,
} = require("../validators/validation");
const { uploadFile } = require("./awsController");

//<======================== createBooks ===========================================>//

const createBooks = async function (req, res) {
  try {
    const requestbody = req.body;
    // let files = req.files;
    if (!isValidRequestBody(requestbody)) {
      return res
        .status(400)
        .send({ status: false, message: "Request body is empty" });
    }

    const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } =
      requestbody;

    if (!isValid(title)) {
      return res
        .status(400)
        .send({ status: false, message: " title must be present " });
    }

    const uniqueTitle = await bookModel.findOne({ title: title });

    if (uniqueTitle) {
      return res.status(400).send({
        status: false,
        message: "Title is already present please provide unique title",
      });
    }
    // if (req.files.length == 0) {
    //      return res.status(400).send({ status: false, message: "bookCover is required" })
    //  };

    if (!isValid(excerpt)) {
      return res
        .status(400)
        .send({ status: false, message: " Excerpt must be present" });
    }

    if (!isValid(userId)) {
      return res
        .status(400)
        .send({ status: false, message: " Excerpt is required" });
    }

    if (!isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, message: `${userId}  is not a valid` });

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .send({ status: true, message: "User does not exist" });
    }

    if (!isValid(ISBN)) {
      return res
        .status(400)
        .send({ status: false, message: " ISBN is required" });
    }

    if (!ISBNregex(ISBN)) {
      return res.status(400).send({
        status: false,
        message: `ISBN:${ISBN} Not Valid | it must be Required 13 digit | Example: ISBN: 123-4567890123`,
      });
    }

    const isbnIsUnique = await bookModel.findOne({
      ISBN: ISBN,
      isDeleted: false,
    });

    if (isbnIsUnique) {
      return res
        .status(400)
        .send({ status: false, message: "ISBN is already present" });
    }

    if (!isValid(category)) {
      return res
        .status(400)
        .send({ status: false, message: " please provide category " });
    }

    if (!isValid(subcategory)) {
      return res
        .status(400)
        .send({ status: false, message: "  subcategory must be present " });
    }

    if (!isValid(releasedAt)) {
      return res
        .status(400)
        .send({ status: false, message: "relesedAt must be present " });
    }

    if (!isValidDate(releasedAt))
      return res.status(400).send({
        status: false,
        message: "Please provide date in YYYY-MM-DD format",
      });

    /* let uploadedFileURL = await uploadFile(files[0]);
    requestbody["bookCover"] = uploadedFileURL; */

    const newbookdata = await bookModel.create(requestbody);
    return res.status(201).send({
      status: true,
      message: "Created Success",
      data: newbookdata,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//<======================== Get all Books ===========================================>//

const getAllBooks = async function (req, res) {
  try {
    let list = await bookModel.find({ isDeleted: false }).sort({ title: 1 });
    if (list.length == 0) {
      res.status(404).send({ status: false, message: "Books not found" });
    }

    let query = req.query;

    if (!isValidRequestBody(query))
      return res
        .status(200)
        .send({ status: true, message: "Success Without query", data: list });

    let { userId, category, subcategory } = query;

    const filter = { isDeleted: false };

    if (userId) {
      if (isValid(userId)) {
        if (!isValidObjectId(userId)) {
          return res.status(400).send({
            status: false,
            message: `User id ${userId} is not valid`,
          });
        }
        filter["userId"] = userId;
      }
    }

    if (category) {
      if (isValid(category)) {
        filter["category"] = category.toLowerCase();
      }
    }

    if (subcategory) {
      if (isValid(subcategory)) {
        let subCat = subcategory
          .trim()
          .split(",")
          .map((element) => element.trim().toLowerCase());
        filter["subcategory"] = { $all: subCat };
      }
    }

    //--finding and sorting books--//
    let booklist = await bookModel
      .find(filter)
      .select({
        _id: 1,
        title: 1,
        excerpt: 1,
        userId: 1,
        category: 1,
        subcategory: 1,
        reviews: 1,
        releasedAt: 1,
      })
      .sort({ title: 1 });

    if (booklist.length == 0)
      return res
        .status(404)
        .send({ status: false, message: "Books not found." });

    return res
      .status(200)
      .send({ status: true, message: "Success", data: booklist });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//<======================== Get Books ID ===========================================>//

const getBookById = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    if (!isValid(bookId))
      return res
        .status(400)
        .send({ status: false, message: "Book Id Required." });
    if (!isValidObjectId(bookId))
      return res
        .status(400)
        .send({ status: false, message: `${bookId}  is not a valid.` });

    let bookList = await bookModel.findOne({ _id: bookId, isDeleted: false });
    if (!bookList)
      return res
        .status(404)
        .send({ status: false, message: "Books not found." });

    const {
      title,
      excerpt,
      userId,
      category,
      reviews,
      subcategory,
      deletedAt,
      isDeleted,
      releasedAt,
      createdAt,
      updatedAt,
    } = bookList;
    let details = {
      title,
      excerpt,
      userId,
      category,
      reviews,
      subcategory,
      deletedAt,
      isDeleted,
      releasedAt,
      createdAt,
      updatedAt,
    };

    let getReview = await reviewModel
      .find({ bookId: bookId, isDeleted: false })
      .select({
        _id: 1,
        bookId: 1,
        reviewedBy: 1,
        reviewedAt: 1,
        rating: 1,
        review: 1,
      });
    details["reviewData"] = getReview;

    return res
      .status(200)
      .send({ status: true, message: "Success", data: details });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//<======================== Update Book by ID ===========================================>//

const updateBookById = async function (req, res) {
  try {
    const bookId = req.params.bookId;
    const bodyData = req.body;

    if (!isValid(bookId))
      return res
        .status(400)
        .send({ status: false, message: "Book Id Required." });

    if (!isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Valid Book Id" });
    }

    if (!isValidRequestBody(bodyData))
      return res
        .status(400)
        .send({ status: false, message: "No user input to update" });

    const isDeletedBook = await bookModel.findOne({
      _id: bookId,
      isDeleted: false,
    });
    if (!isDeletedBook) {
      return res
        .status(404)
        .send({ status: false, message: "Book not Found for Update" });
    }
    const { title, excerpt, releasedAt, ISBN } = bodyData;

    //<============> TItle Validation <================>//

    if (title) {
      if (!isValid(title)) {
        return res
          .status(400)
          .send({ status: false, message: "Please Provide Title" });
      }

      const checkTitle = await bookModel.findOne({
        title: title,
        isDeleted: false,
      });

      if (checkTitle)
        return res.status(400).send({
          status: false,
          message: "Book with this Title already exists",
        });
    }

    //<============> Excerpt Validation <================>//

    if (excerpt) {
      if (!isValid(excerpt)) {
        return res
          .status(400)
          .send({ status: false, message: "Please Provide exxerpt" });
      }
    }

    //<============> Released AT Validation <================>//

    if (releasedAt) {
      if (!isValid(releasedAt)) {
        return res
          .status(400)
          .send({ status: false, message: "Please Provide realsed at" });
      }
      if (!isValidDate(releasedAt))
        return res.status(400).send({
          status: false,
          message: "Realease date format is not valid",
        });
    }
    //<============> ISBN Validation <================>//

    if (ISBN) {
      if (!isValid(ISBN)) {
        return res
          .status(400)
          .send({ status: false, message: "Please Provide ISBN" });
      }
      if (!ISBNregex(ISBN))
        return res.status(400).send({
          status: false,
          message: `ISBN:${ISBN} Not Valid | it must be Required 13 digit | Example: ISBN: 123-4567890123`,
        });

      const checkISBN = await bookModel.findOne({
        ISBN: ISBN,
        isDeleted: false,
      });

      if (checkISBN)
        return res.status(400).send({
          status: false,
          message: "Book with this ISBN already exists",
        });
    }

    const bookData = await bookModel.findOneAndUpdate(
      { _id: bookId, isDeleted: false },
      {
        title: title,
        excerpt: excerpt,
        releasedAt: releasedAt,
        ISBN: ISBN,
      },
      { new: true }
    );

    return res
      .status(200)
      .send({ status: true, message: "Success", data: bookData });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//<======================== Delete Book by ID ===========================================>//

const deleteBookById = async function (req, res) {
  try {
    let Id = req.params.bookId;

    if (!isValidRequestBody(Id)) {
      return res
        .status(400)
        .send({ status: false, message: "Please Provide Book ID" });
    }

    if (!isValidObjectId(Id)) {
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Valid Book Id" });
    }

    const deleteBook = await bookModel.findOneAndUpdate(
      { _id: Id, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!deleteBook)
      return res
        .status(404)
        .send({ status: false, message: "Book not found or Already Deleted" });
    return res
      .status(200)
      .send({ status: true, message: "Success", data: deleteBook });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  createBooks,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
