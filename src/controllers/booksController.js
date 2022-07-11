const bookModel = require("../models/booksModel");
const userModel = require("../models/userModel");

//<=========================== VAlidation keys =========================>//

const {
  isValid,
  isValidRequestBody,
  isValidObjectId,
  ISBNregex,
} = require("../validators/validation");

//<======================== createBooks ===========================================>//

const createBooks = async function (req, res) {
  try {
    const requestbody = req.body;
    if (!isValidRequestBody(requestbody)) {
      return res
        .status(400)
        .send({ status: false, message: "requestbody is empty" });
    }

    const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } =
      requestbody;

    if (!isValid(title)) {
      return res
        .status(400)
        .send({ status: false, message: " title must be present...." });
    }

    const uniqueTitle = await bookModel.findOne({ title: title });

    if (uniqueTitle) {
      return res.status(400).send({
        status: false,
        message: "Title is already present plz provide unique title",
      });
    }

    if (!isValid(excerpt)) {
      return res
        .status(400)
        .send({ status: false, message: " excerpt must be present" });
    }

    if (!isValid(userId)) {
      return res
        .status(400)
        .send({ status: false, message: " excerpt is required" });
    }

    if (!isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, message: `${userId}  is not a valid` });

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .send({ status: true, message: "user does not exist" });
    }

    if (!isValid(ISBN)) {
      return res
        .status(400)
        .send({ status: false, message: " ISBN is required" });
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
        .send({ status: false, message: " plz provide category " });
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

    const newbookdata = await bookModel.create(requestbody);
    return res.status(201).send({
      status: true,
      message: "successfully created bookdata",
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

    if (!query) return res.status(200).send({ status: true, data: list });

    let userId = query.userId;
    let category = query.category;
    let subcategory = query.subcategory;

    const filter = { isDeleted: false };

    if (isValid(userId)) {
      if (!isValidObjectId(userId)) {
        return res.status(400).send({
          status: false,
          message: `User id ${userId} is not valid`,
        });
      }
      filter["userId"] = userId;
    }

    if (isValid(category)) {
      filter["category"] = category.toLowerCase();
    }

    if (isValid(subcategory)) {
      let subArr = subcategory
        .trim()
        .split(",")
        .map((element) => element.trim().toLowerCase());
      filter["subcategory"] = { $all: subArr };
    }

    //--finding and sorting books--//
    let booklist = await bookModel
      .find(filter, {
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

    res
      .status(200)
      .send({ status: true, message: "Books list", data: booklist });
  } catch (err) {
    return res.status(500).send({ status: false, message: "server error " });
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

    return res.status(200).send({ status: true, data: bookList });

    // *********Please Read ReadMe Review's Part is Remains ********** //
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//<======================== Update Book by ID ===========================================>//

const updateBookById = async function (req, res) {
  try {
    const bookId = req.params.bookId;
    const bodyData = req.body;

    if (!isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Valid Book Id" });
    }

    if (!isValidRequestBody(bodyData))
      return res
        .status(400)
        .send({ status: false, message: "No user input to update" });

    const { title, excerpt, releaseDate, ISBN } = bodyData;

    if (title) {
      const checkTitle = await bookModel.findOne({
        title: title,
        isDeleted: false,
      });

      if (checkTitle)
        return res.status(409).send({
          status: false,
          message: "Book with this Title already exists",
        });
    }

    if (ISBN) {
      if (!ISBNregex(ISBN))
        return res
          .status(400)
          .send({ status: false, message: "please provide valid ISBN" });

      const checkISBN = await bookModel.findOne({
        ISBN: ISBN,
        isDeleted: false,
      });

      if (checkISBN)
        return res.status(409).send({
          status: false,
          message: "Book with this ISBN already exists",
        });
    }

    const bookData = await bookModel.findOneAndUpdate(
      { _id: bookId, isDeleted: false },
      {
        title: title,
        excerpt: excerpt,
        releasedAt: releaseDate,
        ISBN: ISBN,
      },
      { new: true }
    );

    res.status(200).send({ status: true, message: "Success", data: bookData });
  } catch (err) {
    return res.status(500).send({ status: false, message: "server error " });
  }
};

//<======================== Delete Book by ID ===========================================>//

const deleteBookById = async function (req, res) {
  try {
    let Id = req.params.bookId;

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
    return res.status(500).send({ status: false, message: "server error " });
  }
};

module.exports = {
  createBooks,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
