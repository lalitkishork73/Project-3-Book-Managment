const reviewModel = require("../models/reviewModel");
const bookModel = require("../models/booksModel");

//<=========================== VAlidation keys =========================>//

const {
  isValid,
  isValidObjectId,
  isValidRequestBody,
} = require("../validators/validation");

//<======================== Give ReView by Book Id =================================>//

const reviewByBookId = async function (req, res) {
  try {
    const params = req.params.bookId;

    if (!isValid(params))
      return res
        .status(400)
        .send({ status: false, message: "Book Id Required." });

    if (!isValidObjectId(params))
      return res
        .status(400)
        .send({ status: false, message: `${params}  is not a valid.` });

    let requestReviewBody = req.body;

    const { reviewedBy, rating, review } = requestReviewBody;

    if (!isValidRequestBody(requestReviewBody)) {
      return res.status(400).send({
        status: false,
        message: "Please provide review details to update.",
      });
    }

    if (!isValid(rating)) {
      return res
        .status(400)
        .send({ status: false, message: "Rating is required" });
    }

    if (!(rating >= 1 && rating <= 5)) {
      return res
        .status(400)
        .send({ status: false, message: "number must be 1 to 5" });
    }

    if (!isValid(review)) {
      return res
        .status(400)
        .send({ status: false, message: "review  is required" });
    }

    const searchbook = await bookModel.findOne({
      id_: params,
      isDeleted: false,
    });

    if (!searchbook) {
      return res
        .status(400)
        .send({ status: false, message: "book does not present in database" });
    }

    const bookId = params;

    const reviewedAt = new Date();

    const data = { bookId, reviewedBy, reviewedAt, rating, review };

    const reviewdata = await reviewModel.create(data);
     const reviewUpdate = await reviewModel
       .findOne({ bookId: bookId, _id: reviewdata._id, isDeleted: false })
       .select(["-createdAt", "-updatedAt", "-__v", "-isDeleted"]);

    if (reviewdata) {
      const updatedReview = await bookModel.findOneAndUpdate(
        { _id: bookId, isDeleted: false },
        { $inc: { reviews: 1 } },
        { new: true }
      );

      if (!updatedReview) {
        return res
          .status(404)
          .send({ status: false, message: "reviwe is Deleted or not exist" });
      }

      const bookData = await bookModel.findById(bookId).select({__v:0,ISBN:0})
      bookData._doc.reviewData = reviewUpdate

      return res.status(201).send({
        status: true,
        message: "Success ",
        data: bookData,
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//<======================== Update By BookId && ReviewId =================================>//

const reviewUpdateByBookId = async function (req, res) {
  try {
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;
    let bodyData = req.body;

    if (!bookId) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide Book Id" });
    }

    if (!isValidObjectId(bookId)) {
      return res.status(400).send({
        status: false,
        message: `Please Enter Valid BookId given ${bookId}  is incorrect`,
      });
    }

    if (!reviewId) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide reviewId" });
    }

    if (!isValidObjectId(reviewId)) {
      return res.status(400).send({
        status: false,
        message: `Please Enter Valid BookId given id:${reviewId}  is incorrect`,
      });
    }

    const checkBook = await bookModel.findOne({
      _id: bookId,
      isDeleted: false,
    });

    if (!checkBook) {
      return res
        .status(404)
        .send({ status: false, message: "Book Not Exist in Dateabase " });
    }

    const checkReview = await reviewModel.findOne({
      _id: reviewId,
      isDeleted: false,
    });

    if (!checkReview) {
      return res
        .status(404)
        .send({ status: false, message: "Review Not Exist in Dateabase " });
    }

    if (!isValidRequestBody(bodyData)) {
      return res
        .status(400)
        .send({ status: false, message: "Please Provide Update Information" });
    }

    const { review, rating, reviewedBy } = bodyData;

    if (rating) {
      if (!rating) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide valid rating." });
      }
      if (!(rating >= 1 && rating <= 5)) {
        return res.status(400).send({
          status: false,
          message: "Rating value should be between 1 to 5",
        });
      }
    }

    if (review) {
      if (!review) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide valid review." });
      }
    }

    const updatedReview = await reviewModel
      .findOneAndUpdate(
        { _id: reviewId },
        { review: review, rating: rating, reviewedBy: reviewedBy },
        { new: true }
      )
      .select({
        _id: 1,
        bookId: 1,
        reviewedBy: 1,
        reviewedAt: 1,
        rating: 1,
        review: 1,
      });

    let ReviwedBook = {
      title: checkBook.title,
      bookId: checkBook._id,
      excerpt: checkBook.excerpt,
      userId: checkBook.userId,
      category: checkBook.category,
      review: checkBook.reviews,
      reviewData: updatedReview,
    };
    return res.status(200).send({
      status: true,
      message: "Updated Review Books List",
      data: ReviwedBook,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//<======================== Delete By BookId && ReviewId  =================================>//

const reviewDeleteByBookId = async function (req, res) {
  try {
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;

    if (!bookId) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide Book Id" });
    }

    if (!isValidObjectId(bookId)) {
      return res.status(400).send({
        status: false,
        message: `Please Enter Valid BookId given ${bookId}  is incorrect`,
      });
    }

    if (!reviewId) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide reviewId" });
    }

    if (!isValidObjectId(reviewId)) {
      return res.status(400).send({
        status: false,
        message: `Please Enter Valid BookId given id:${reviewId}  is incorrect`,
      });
    }

    const checkBook = await bookModel.findOne({
      _id: bookId,
      isDeleted: false,
    });

    if (!checkBook) {
      return res.status(404).send({
        status: false,
        message: "Book Not Exist in Dateabase or Already Deleted",
      });
    }

    const checkReview = await reviewModel.findOne({
      _id: reviewId,
      isDeleted: false,
    });

    if (!checkReview) {
      return res
        .status(404)
        .send({ status: false, message: "Review Not Exist in Dateabase " });
    }

    const deleteReview = await reviewModel.findOneAndUpdate(
      { _id: reviewId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (deleteReview) {
      await bookModel.findOneAndUpdate(
        { _id: bookId },
        { $inc: { reviews: -1 } },
        { new: true }
      );
    }

    return res.status(200).send({
      status: true,
      message: "data Deleted Successfully",
      data: deleteReview,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { reviewByBookId, reviewUpdateByBookId, reviewDeleteByBookId };
