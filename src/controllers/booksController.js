const bookModel = require("../models/booksModel");

const {
    isValid,
    isValidRequestBody,
    isvalidEmail,
    moblieRegex,
} = require("../validators/validation");

const validator = require("../validators/validation");

const createBooks = async function(req, res) {
    try {
        const requestbody = req.body;
        if (!validator.isValidRequestBody(requestbody)) {
            return res
                .status(400)
                .send({ status: false, message: "requestbody is empty" });
        }

        const {
            title,
            excerpt,
            userId,
            ISBN,
            category,
            subcategory,
            deletedAt,
            releasedAt,
        } = requestbody;

        if (!validator.isValid(title)) {
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

        if (!validator.isValid(excerpt)) {
            return res
                .status(400)
                .send({ status: false, message: " excerpt must be present" });
        }

        if (!validator.isValid(userId)) {
            return res
                .status(400)
                .send({ status: false, message: " excerpt is required" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res
                .status(400)
                .send({ status: true, message: "user does not exist" });
        }

        if (!validator.isValid(ISBN)) {
            return res
                .status(400)
                .send({ status: false, message: " ISBN is required" });
        }

        const isbnIsunique = await bookModel.findOne({ ISBN: ISBN });

        if (isbnIsunique) {
            return res
                .status(400)
                .send({ status: false, message: "ISBN is already present" });
        }

        if (!validator.isValid(category)) {
            return res
                .status(400)
                .send({ status: false, message: " plz provide category " });
        }

        if (!validator.isValid(subcategory)) {
            return res
                .status(400)
                .send({ status: false, message: "  subcategory must be present " });
        }

        if (!validator.isValid(deletedAt)) {
            return res
                .status(400)
                .send({ status: false, message: " excerpt is required" });
        }

        if (!validator.isValid(releasedAt)) {
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
        return res.status(500).send({ status: false, message: "server error " });
    }
};

const getAllBooks = async function(req, res) {
    try {} catch (err) {
        return res.status(500).send({ status: false, message: "server error " });
    }
};

const getBookById = async function(req, res) {
    try {} catch (err) {
        return res.status(500).send({ status: false, message: "server error " });
    }
};

const updateBookById = async function(req, res) {
    try {} catch (err) {
        return res.status(500).send({ status: false, message: "server error " });
    }
};

const deleteBookById = async function(req, res) {
    try {} catch (err) {
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