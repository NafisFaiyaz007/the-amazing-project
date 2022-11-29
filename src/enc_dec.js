const { Console } = require('console');
const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-256-ctr';
let key = 'MySecretKey';
key = crypto.createHash('sha256').update(String(key)).digest('base64').substring(0, 32);

//Encryption
const encrypt = (buffer) => {
    //Create inistialization vector
    const iv = crypto.randomBytes(16);

    //Create a new cypher using the algorithm , key, iv
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    //Create new encrypted buffer
    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    return result;
}

//Decryption
const decrypt = (encrypted) => {
    //Get the IV : the first 16 bytes
    const iv = encrypted.slice(0, 16);

    //Get the rest
    encrypted = encrypted.slice(16);

    //Create decipher
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    //Decrypt it
    const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return result;
}

// Read File
fs.readFile('sample.txt', (err, file) => {
    if (err)
        return console.error(err.message);

   console.log(`Curent file data: ${file}`);

    //Encrypt the file
    const encryptedFile = encrypt(file);

    //Flow the encrypted file data to the new file
    fs.writeFile('/file.txt', encryptedFile, (err, file) => {
        if (err)
            return console.error(err.message);
        if (file) {
            console.log('File Encrypted Successfully');
        
        }
    })
})

fs.readFile('/file.txt', (err, file) => {
    if (err)
        return console.error(err.message);

    //Decrypt file
    if (file) {
        const decryptedFile = decrypt(file);
        console.log(decryptedFile.toString());
        fs.writeFile('decrypted_file.txt', decryptedFile, (err, file) => {
            if (err)
                return console.error(err.message);
        })
    }
})