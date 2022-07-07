const reviewModel = require("../models/reviewModel");
const {
    isValid,
    isValidRequestBody,
    isvalidEmail,
    moblieRegex,
} = require("../validators/validation");

const reviewByBookId = async function(req, res) {
    try {} catch (err) {
        return res.status(500).send({ status: false, message: "server error " });
    }
};

const reviewUpdateByBookId = async function(req, res) {
    try {} catch (err) {
        return res.status(500).send({ status: false, message: "server error " });
    }
};

const reviewDeleteByBookId = async function(req, res) {
    try {} catch (err) {
        return res.status(500).send({ status: false, message: "server error " });
    }
};

module.exports = { reviewByBookId, reviewUpdateByBookId, reviewDeleteByBookId };