const reviewModel = require("../models/reviewModel");
const {
    isValid,
    isValidRequestBody,
    isvalidEmail,
} = require("../validators/validation");

const reviewByBookId = async function(req, res) {
    try {} catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

const reviewUpdateByBookId = async function(req, res) {
    try {} catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

const reviewDeleteByBookId = async function(req, res) {
    try {} catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

module.exports = { reviewByBookId, reviewUpdateByBookId, reviewDeleteByBookId };