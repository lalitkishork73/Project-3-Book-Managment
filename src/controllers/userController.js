const userModel = require('../models/userModel');
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
            return res.status(400).send({ status: false, message: 'plz enter the mobile number' })
        }

        if (!moblieRegex(phone)) {
            return res.status(400).send({ status: false, message: 'please enter the valid mobile number' })
        }

        const checkMobile = await userMoel.findOne({ phone: phone })
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

            return res.status(400).send({ status: false, message: 'plz provide proper street' })
        }


        if (!isValid(address.city)) {
            return res.status(400).send({ status: false, message: 'plz provide city name' })
        }
        if (!isValid(address.pincode)) {
            return res.status(400).send({ status: false, message: 'plz provide pincode' })
        }


        const userData = await userModel.create(requestbody)
        return res.status(201).send({ status: true, message: 'sucessfully save user data', data: userData })

    } catch {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
const loginUser = async function(req, res) {
    try {} catch {}
}

module.exports = { createUser, loginUser };