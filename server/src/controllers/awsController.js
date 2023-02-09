const aws = require("aws-sdk")

aws.config.update({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY,
    region: "ap-south-1"
})

let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        let s3 = new aws.S3({ apiVersion: '2006-03-01' });

        let uploadParams = {
            ACL: "public-read",
            Bucket: "bucketwala",
            ContentType: file.mimetype,
            Key: "object/" + file.originalname,
            Body: file.buffer
        }


        s3.upload(uploadParams, function (err, data) {
            if (err) {
                console.log(err)
                return reject({ "error": err })
            }
            
            return resolve(data.Location)
        })
    })
}

module.exports = { uploadFile }