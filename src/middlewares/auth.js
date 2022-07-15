const jwt = require("jsonwebtoken");
const bookModel = require("../models/booksModel");

//<=========================== VAlidation keys =========================>//

const { isValidObjectId } = require("../validators/validation.js");

//<================================= Authentication ==============================================>//

const authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-Api-key"] || req.headers["x-api-key"];
    if (!token) {
      return res
        .status(404)
        .send({ status: false, message: "Warning Token Must Be present" });
    }

    let decodedToken = jwt.verify(token, "Secretkey");
    let LoginUserId = decodedToken.userId;
    if (!decodedToken) {
      return res
        .status(401)
        .send({ status: false, message: "Warning unauthorized" });
    }

    req["userId"] = LoginUserId;
    next();
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

//<================================= Authorisation ==============================================>//

const authorisation = async function (req, res, next) {
  try {
    let tokenId = req.userId;
    let bookId = req.params.bookId || req.query.bookId;

    if (!isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: `Book id ${bookId} is invalid` });
    }
    const findUserId = await bookModel.findOne({ _id: bookId });
    if (!findUserId)
      return res.status(404).send({ status: false, message: "User not found" });

    const { userId } = findUserId;

    if (tokenId.toString() !== userId.toString()) {
      return res.status(403).send({ status: false, message: "User not Found" });
    }
    next();
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { authentication, authorisation };
