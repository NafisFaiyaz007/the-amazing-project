const { Blob } = require("buffer");
var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var fs = require('fs');
const stream = require("stream");
const path = require('path');
var drive = require('./src/googledrive/index')
var filepath;
const { Console } = require('console');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const { file } = require('googleapis/build/src/apis/file');
app.use('/upload', express.static(__dirname + '/upload'));
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://localhost:3000");
  next();
});
app.use(cors({
  origin:'*', 
  credentials: true,
  optionSuccessStatus:200
}));

var storage = multer.memoryStorage({
    destination: function (req, file, cb) {
    cb(null, '')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')
const algorithm = 'aes-256-ctr';
let key = 'MySecretKey';
key = crypto.createHash('sha256').update(String(key)).digest('base64').substring(0, 32);
function Encrypt  (buffer)  {
// function EncryptFile (file) {
//Encryption
    //Create inistialization vector
    const iv = crypto.randomBytes(16);

    //Create a new cypher using the algorithm , key, iv
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    //Create new encrypted buffer
    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    //console.log(result)
    return result;
}
console.log(__dirname)

const decrypt = (encrypted) => {

  //Get the IV : the first 16 bytes
  const iv = encrypted.slice(0, 16);

  //Get the rest
  encrypted = encrypted.slice(16);

  //Create decipher
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  //Decrypt it
  const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  console.log("decrypted: ",result)
  return result;
}

app.post('/upload',(req, res) => {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }

      const encryptedFile = Encrypt(req.file.buffer);
      console.log(encryptedFile)
      res.send(encryptedFile);

});
      });
      app.get("/getFile/:name", function(req, res) {
        const fileName = req.params.name;
        res.sendFile(__dirname + `/Encrypted Files/${fileName}`);
      });


app.post('/decrypt', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    const decryptedFile = decrypt(req.file.buffer);
    res.send(decryptedFile)
});
});

app.listen(8080, function() {

  console.log('App running on port 8080');

});