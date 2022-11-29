
// fs.readFile('file.txt', (err, file) => {
//     if (err)
//         return console.error(err.message);

//     //Decrypt file
//     if (file) {
//         const decryptedFile = decrypt(file);
//         console.log(decryptedFile.toString());
//         fs.writeFile('decrypted_file.txt', decryptedFile, (err, file) => {
//             if (err)
//                 return console.error(err.message);
//         })
//     }
// })