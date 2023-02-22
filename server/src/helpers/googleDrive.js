const stream = require('stream');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const path = require('path');
// const fs = require('fs')
const GOOGLE_API_FOLDER_ID = process.env.GOOGLE_API_FOLDER_ID;
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const EXPIRY_TIME = 15780000

// there lots of way to implement google drive setup only you have to decide which method do you required.

// const Keyfile = path.join(__dirname,'../../', 'googlekey.json');
const uploadFiles = async (file) => {
    try {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);

        const auth = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);

        // const auth = new google.auth.GoogleAuth({
        //     keyFile: Keyfile,
        //     scopes: ['https://www.googleapis.com/auth/drive']
        // });

        auth.setCredentials({
            access_token: ACCESS_TOKEN,
            refresh_token: REFRESH_TOKEN,
            scopes: ['https://www.googleapis.com/auth/drive'],
            expiry_date: EXPIRY_TIME,
        });

        console.log(auth)

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