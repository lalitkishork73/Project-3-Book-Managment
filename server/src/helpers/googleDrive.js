const stream = require('stream');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs')
const GOOGLE_API_FOLDER_ID = process.env.GOOGLE_API_FOLDER_ID;
const KeyFilePath = path.join(__dirname, 'googlekey.js');
const { Key } = require(KeyFilePath)
const jsonKey = JSON.stringify(Key)
// console.log(path.join(__dirname, 'googlekey.json'))
const paths = __dirname + '/googlekey.json';

if (!fs.existsSync(paths)) {
    console.log('file not exist');
    fs.writeFileSync(__dirname + '/googlekey.json', jsonKey, 'utf8')
}

// fs.appendFileSync(__dirname + '/googlekey.json',jsonKey,'utf8')
const Keyfile = path.join(__dirname, 'googlekey.json');
const uploadFiles = async (file) => {
    try {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);


        const auth = new google.auth.GoogleAuth({
            keyFile: Keyfile,
            // keyFile: KeyFilePath,
            scopes: ['https://www.googleapis.com/auth/drive']
        });

        const driveService = google.drive({
            version: 'v3',
            auth
        });

        const fileMetaData = {
            'name': file.originalname,
            'parents': [GOOGLE_API_FOLDER_ID]
        }

        const media = {
            mimeType: file.mimeType,
            body: bufferStream
        }

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id,name'
        });

        return response.data.id

    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports = { uploadFiles };