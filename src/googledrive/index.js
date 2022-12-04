const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '157471867320-bpms4k3r80nqotpf2nijdpdgn18b01g6.apps.googleusercontent.com'
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

//refresh token
const REFRESH_TOKEN = '1//04V3srouRkmYtCgYIARAAGAQSNwF-L9IrKeIMvmPtpvp3AdcETXn8y8qCsJSaT2XDReE9aEKmkFsroHIbgTRRut1Sipyqu5EKxC0';

//intialize auth client
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

//setting outr credentials
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//initialize google drive
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

//file path for out file
const filePath = path.join('./', 'sky.jpg');

//function to upload the file
 async function uploadFile() {
    try{
      const response = await drive.files.create({
        requestBody: {
            name: 'sky.jpg', //file name
            mimeType: 'image/jpeg',
        },
        media: {
            mimeType: 'image/jpeg',
            body: fs.createReadStream(filePath),
        },
      });
  
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}
  
uploadFile()
//delete file function
async function deleteFile() {
    try {
        const response = await drive.files.delete({
            fileId: '1psrdHiVyQEJeTruNAH15_9TIY2oRuyzN',
        });
        console.log(response.data, response.status);
    } catch (error) {
        console.log(error.message);
    }
  }


//create a public url
async function generatePublicUrl() {
    try {
        const fileId = '1psrdHiVyQEJeTruNAH15_9TIY2oRuyzN';
        //change file permisions
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
            role: 'reader',
            type: 'anyone',
            },
        });

        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });
      console.log(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  generatePublicUrl()