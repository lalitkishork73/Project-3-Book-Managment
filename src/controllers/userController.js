const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

//<=========================== VAlidation keys =========================>//
let {
  isValid,
  isValidRequestBody,
  isvalidEmail,
  moblieRegex,
  titleEnum,
  isValidPassword,
} = require("../validators/validation");

//<=========================== Create User=============================>//

const createUser = async function (req, res) {
  try {
    const requestbody = req.body;
    const { title, name, phone, email, password, address } = requestbody;

    if (!isValidRequestBody(requestbody)) {
      return res
        .status(400)
        .send({ status: false, message: "Please Provide Information" });
    }
    if (!isValid(title)) {
      return res
        .status(400)
        .send({ status: false, message: "title is required" });
    }

    if (!titleEnum(title)) {
      return res.status(400).send({
        status: false,
        message: "Is not valid title provide Mr, Mrs, Miss ",
      });
    }
    if (!isValid(name)) {
      return res
        .status(400)
        .send({ status: false, message: "name is required" });
    }

    if (!isValid(phone)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter the mobile number" });
    }

    if (!moblieRegex(phone)) {
      return res.status(400).send({
        status: false,
        message: "Please enter the valid mobile number it must be 10 Digit",
      });
    }

    const checkMobile = await userModel.findOne({ phone: phone });
    if (checkMobile) {
      return res
        .status(400)
        .send({ status: false, message: "mobile number already exist " });
    }

    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "email id is required" });
    }

    if (!isvalidEmail(email)) {
      return res.status(400).send({
        status: false,
        message: "Please enter the valid email Example: example12@.gmail.com ",
      });
    }

    const checkEmail = await userModel.findOne({ email: email });
    if (checkEmail) {
      return res
        .status(400)
        .send({ status: false, message: "Email is already exist" });
    }

    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Password is required" });
    }

    if (!isValidPassword(password))
      return res.status(400).send({
        status: false,
        msg: `Password:|${password}| must includes special character[@$!%?&], one uppercase, one lowercase, one number and should be mimimum 8 to 15 characters long| example: Example@12`,
      });

    //<============>>>> User without address <<<<================>//

    if (!address) {
      const userDataN = { title, name, phone, email, password };
      const saveUser = await userModel.create(userDataN);
      return res.status(201).send({
        status: true,
        message: "sucessfully saved",
        data: saveUser,
      });
    }

    //<============>>>> User with address <<<<====================>//

   

    const userData = await userModel.create(requestbody);
    return res.status(201).send({
      status: true,
      message: "sucessfully saved",
      data: userData,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//<=========================== Create login For User =============================>//

const loginUser = async function (req, res) {
  try {
    let data = req.body;
    let email = data.email;
    let password = data.password;

    if (!Object.keys(data) && !Object.values(data)) {
      return res.status(400).send({
        status: false,
        message: "please enter the Information of User",
      });
    }

    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "email id is required" });
    }

    if (!isvalidEmail(email)) {
      return res
        .status(400)
        .send({
          status: false,
          message:
            "Please enter the valid email  Example: example12@.gmail.com ",
        });
    }

    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    }

    if (!isValidPassword(password))
      return res.status(400).send({
        status: false,
        msg: `Password:|${password}| must includes special character[@$!%?&], one uppercase, one lowercase, one number and should be mimimum 8 to 15 characters long for example: Example@12`,
      });

    const checkEmail = await userModel.findOne({
      email: email,
      password: password,
      isDeleted: false,
    });
    if (!checkEmail) {
      return res
        .status(404)
        .send({ status: false, message: "given User data not Found " });
    }

    let token = jwt.sign(
      {
        userId: checkEmail._id.toString(),
        System: "Book Management",
        organisation: "BooksWorld",
      },
      "Secretkey",
      { expiresIn: "10d" }
    );

    res.setHeader("x-api-key", token);
    res
      .status(200)
      .send({ status: true, message: "author login successfuly", data: token });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { createUser, loginUser };
