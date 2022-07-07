const ObjectId = require("mongoose").Types.ObjectId;

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0;
};

const isValid = function(value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value !== "string") return false;
    if (typeof value === "string" && value.trim().length == 0) return false;

    return true;
};

// <------------------------------User Validation-------------------------------------------->
const isvalidEmail = function(gmail) {
    let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/; //.test(gmail);
    return regex.test(gmail);
};

const moblieRegex = function(mobile) {
    let regex =
        /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([-]?)\d{3}([-]?)\d{4})$/;
    return regex.test(mobile);
};

const ISBNregex = function(ISBN) {
    let regex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    return regex.test(ISBN);
};

const titleEnum = function(title) {
    return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1;
};

let isValidObjectId = function(objectId) {
    if (!ObjectId.isValid(objectId)) return false;
    return true;
};

module.exports = {
    isValid,
    isValidRequestBody,
    isvalidEmail,
    moblieRegex,
    titleEnum,
    ISBNregex,
    isValidObjectId,
};