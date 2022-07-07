const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
let { isValid, isValidRequestBody, isvalidEmail, moblieRegex, titleEnum } = require('../validatores/validation');

const createUser = async function(req, res) {
    try {
        const requestbody = req.body;
        const { title, name, phone, email, password, address } = requestbody;
        console.log(address.street)

        if (!isValidRequestBody(requestbody)) {
            return res.status(400).send({ status: false, message: 'Please Provide Information' })
        }
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: 'title is required' })
        }

        if (!titleEnum(title)) {
            return res.status(400).send({ status: false, msg: "Is not valid title provide Mr, Mrs, Miss " })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'name is required' })

        }

        if (!isValid(phone)) {
            return res.status(400).send({ status: false, message: 'Please enter the mobile number' })
        }

        if (!moblieRegex(phone)) {
            return res.status(400).send({ status: false, message: 'please enter the valid mobile number' })
        }

        const checkMobile = await userModel.findOne({ phone: phone })
        if (checkMobile) {
            return res.status(400).send({ status: false, message: 'mobile number already exist' })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: 'email id is required' })
        }

        if (!isvalidEmail(email)) {
            return res.status(400).send({ status: false, message: "Please enter the valid email..." })
        }

        const checkEmail = await userModel.findOne({ email: email })
        if (checkEmail) {
            return res.status(400).send({ status: false, message: 'email is already exist' })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'password is required' })
        }


        if (!isValid(address.street)) {

            return res.status(400).send({ status: false, message: 'Please provide proper street' })
        }


        if (!isValid(address.city)) {
            return res.status(400).send({ status: false, message: 'Please provide city name' })
        }
        if (!isValid(address.pincode)) {
            return res.status(400).send({ status: false, message: 'Please provide pincode' })
        }


        const userData = await userModel.create(requestbody)
        return res.status(201).send({ status: true, message: 'sucessfully save user data', data: userData })

    } catch {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
const loginUser = async function(req, res) {
    try {
        let data = req.body
        let email = data.email;
        let password = data.password;

        if ((!Object.keys(data)) && (!Object.values(data))) {
            return res.status(400).send({
                status: false,
                message: 'please enter the Information of User'
            })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: 'email id is required' })
        }

        if (!isvalidEmail(email)) {
            return res.status(400).send({ status: false, message: "Please enter the valid email " })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'password is required' })
        }

        const checkEmail = await userModel.findOne({ email: email, password: password })
        if (!checkEmail) {
            return res.status(404).send({ status: false, message: 'given User data not Found ' })
        }


        let token = jwt.sign({
                userId: checkEmail._id.toString(),
                library: "OpenWorld",
                organisation: "BooksWorld",
            },
            "Secretkey", { expiresIn: "10d" }
        );

        res.setHeader("x-api-key", token);
        res
            .status(200)
            .send({ status: true, msg: "author login successfuly", data: token });

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { createUser, loginUser };
module.exports = { createUser, loginUser };