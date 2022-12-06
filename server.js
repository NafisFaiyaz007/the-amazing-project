var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var fs = require('fs');
const path = require('path');
var drive = require('./src/googledrive/index')

const { Console } = require('console');
const crypto = require('crypto');
const bodyParser = require('body-parser');
app.use('/upload', express.static(__dirname + 'upload'));
app.use(cors({
  credentials: true,
}));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'upload')
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
    console.log(result)
    return result;
}
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
const filePath = path.join('./src', 'bg.jpg');
app.post('/upload',(req, res) => {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
          //  console.log(req.file.stream)
    //  return res.status(200).send(req.file)
      console.log(req.body)
      
      fs.readFile(`./upload/${req.file.filename}`, (err, file) => {
        if (err)
            return console.error(err.message);
    
      //  console.log(`Curent file data: ${file}`);
    
        //Encrypt the file
        const encryptedFile = Encrypt(file);
    
        // Flow the encrypted file data to the new file
        fs.writeFile(req.file.originalname, encryptedFile, (err, file) => {
            if (err)
                return console.error(err.message);
            if (file) {
                console.log('File Encrypted Successfully');
            
            }
        })
        fs.unlink(`./upload/${req.file.filename}`, (err => {
          if (err) console.log(err);
          else {
            console.log(`\nDeleted file: ${req.file.filename}`);

          }
        }));drive.uploadFile('encryptedImage', `${req.file.originalname}`)
         
    })

    // },
    //   console.log(req.file))
    // }, (req, res) => {

    //   console.log(req.file);
    //   console.log("file upload: ", req.file.originalname);

      //saveEncryptedFile(req.file.buffer, path.join("./uploads", req.file.originalname), secret.key, secret.iv, req.file, req.user);
      res.status(200).send(req.file)
});
      });


app.post('/decrypt', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }

console.log(req.file)

 fs.readFile(`./upload/${req.file.filename}`, (err, file) => {
  if (err)
      return console.error(err.message);

  //Decrypt file
  if (file) {
      const decryptedFile = decrypt(file);
      console.log(decryptedFile.toString());
      fs.writeFile(req.file.originalname, decryptedFile, (err, file) => {
          if (err)
              return console.error(err.message);
      });drive.generatePublicUrl('10pVrSYLRhRwuKgPgLn3DvptCJaOXNXkS')
  }
})

res.status(200).send(req.file)
});
});
//app.post(`/`)
app.listen(8080, function() {

  console.log('App running on port 8080');

});