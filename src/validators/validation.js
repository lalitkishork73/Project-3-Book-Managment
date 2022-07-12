const ObjectId = require("mongoose").Types.ObjectId;

//<======================== Validators =====================================>//

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value !== "string") return false;
  if (typeof value === "string" && value.trim().length == 0) return false;

  return true;
};

const isvalidEmail = function (gmail) {
  let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/; //.test(gmail);
  return regex.test(gmail);
};

const moblieRegex = function (mobile) {
  let regex =
    /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([-]?)\d{3}([-]?)\d{4})$/;
  return regex.test(mobile);
};

let isValidPassword=function(password){
    let regexPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
    return regexPassword.test(password);
}

const ISBNregex = function (ISBN) {
  let regex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
  return regex.test(ISBN);
};

const titleEnum = function (title) {
  return ["Mr", "Mrs", "Miss"].indexOf(title) !== -1;
};

let isValidObjectId = function (objectId) {
  if (!ObjectId.isValid(objectId)) return false;
  return true;
};

let isValidDate = function (value) {
  let regEx = /^\d{4}-\d{2}-\d{2}$/;
  return regEx.test(value);
};

module.exports = {
  isValid,
  isValidRequestBody,
  isvalidEmail,
  moblieRegex,
  titleEnum,
  ISBNregex,
  isValidObjectId,
  isValidDate,
  isValidPassword,
};
