const bookModel = require("../models/booksModel");
const userModel = require("../models/userModel");
const reviewModel = require("../models/reviewModel");
const { uploadFiles } = require("../helpers/googleDrive");

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
    const id = req.params.id;
    let files = req.files;
    if (!isValidRequestBody(requestbody)) {
      return res
        .status(400)
        .send({ status: false, message: "Request body is empty" });
    }

    const { title, excerpt, ISBN, category, subcategory, releasedAt } =
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
    requestbody["title"] = title.toLowerCase();
    if (req.files.length == 0) {
      return res.status(400).send({ status: false, message: "bookCover is required" })
    };

    if (!isValid(excerpt)) {
      return res
        .status(400)
        .send({ status: false, message: " Excerpt must be present" });
    }

    if (!isValid(id)) {
      return res
        .status(400)
        .send({ status: false, message: " Excerpt is required" });
    }

    const user = await userModel.findOne({ email: id });


    if (!user) {
      return res
        .status(400)
        .send({ status: true, message: "User does not exist" });
    }
    requestbody["userId"] = user._id.toString();
    const userId = user._id.toString();
    if (!isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, message: `${user._id.toString()}  is not a valid` });

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

    requestbody["releasedAt"] = releasedAt.slice(0, 10)

    // upload Files using AWS s3 bucket
    // let uploadedFileURL = await uploadFile(files[0]);
    // requestbody["bookCover"] = uploadedFileURL;

    //uload Files using Google Drive GCP

    let fileResponse;
    if (files && files.length > 0) {
      fileResponse = await uploadFiles(files[0]);
    }
    else
      return res
        .status(400)
        .send({ status: false, message: "Please Provide Document" });

    let DocUrl = "https://drive.google.com/uc?export=view&id=" + fileResponse;

    requestbody["bookCover"] = DocUrl;



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

//<=============Get all Books by user ===============================>//
const getUsersAllBook = async (req, res) => {
  try {
    const userId = req.params.Id;

    if (!userId) {
      return res.status(400).send({ status: false, message: "Please provide id" });
    }

    const findUser = await userModel.findOne({ email: userId });

    if (!findUser) {
      return res.status(404).send({ status: false, message: "not userfound" });
    }

    const BookUserId = findUser._id.toString();

    const findAllusersBook = await bookModel.find({ userId: BookUserId, isDeleted: false });

    if (!findAllusersBook) {
      return res.status(404).send({
        status: false, message: "not Found Books!"
      })
    }

    return res.status(200).send({ status: true, message: "data fetch successfully", data: findAllusersBook });

  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}


//<======================== Get all Books ===========================================>//

const getAllListBook = async (req, res) => {
  try {

    let list = await bookModel.find({ isDeleted: false }).sort({ title: 1 });

    if (list.length == 0) {
      return res.status(404).send({ status: false, message: "Books not found" });
    }
    return res
      .status(200)
      .send({ status: true, message: "Success", data: list });
  }
  catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
}


//<======================== Search all Books by query ===========================================>//

const getAllBooks = async function (req, res) {
  try {

    // const UserId = req.params.UId || req.query;
    // console.log(UserId);
    /* const getUser = await userModel.findOne({ email: UserId })

    if (!getUser) {
      return res.status(404).send({ status: false, message: "not found" })
    }

    const user = getUser._id.toString(); */

    let query = req.query;
    // console.log(query)

    if (!isValidRequestBody(query))
      return res
        .status(200)
        .send({ status: true, message: "Success Without query", data: user });

    let { user, category, subcategory, title } = query;

    const filter = { isDeleted: false };

    // console.log(user)

    if (user) {
      if (isValid(user)) {
        const userId = await userModel.findOne({ name: user })
        if (!isValidObjectId(userId._id.toString())) {
          return res.status(400).send({
            status: false,
            message: `User id ${userId} is not valid`,
          });
        }
        // console.log(userId)
        filter["userId"] = userId._id.toString();
      }
    }

    if (title) {
      if (isValid(title)) {
        // console.log(title)
        filter["title"] = title
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

    let getReview = await reviewModel
      .find({ bookId: bookId, isDeleted: false })

    if (!getReview) {
      return res.status(404).send({ status: false, message: "not found review" })
    }

    const updateBook = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false },
      { reviews: getReview.length }, { new: true }).select({ createdAt: 0, updatedAt: 0 });

    if (!updateBook) {
      return res.status(400).send({
        status: false, message: "not able to fetch information"
      })
    }

    updateBook._doc.reviewData = getReview;
    // console.log(updateBook)
    return res
      .status(200)
      .send({ status: true, message: "Success", data: updateBook });
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
  getUsersAllBook,
  getAllListBook
};
