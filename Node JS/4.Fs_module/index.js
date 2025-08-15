const fs = require('fs'); // Importing the fs module  
//asynchronous file reading

console.log('read started'); // Indicates the start of the file reading process
// fs.readFile('input.txt',function(err, data) {
//     if (err) {
//         console.error('Error reading file:', err);
//         return err;
//     }
//     console.log('data:', data.toString()); // Outputs the content of the file
//     console.log('read completed'); // Indicates the completion of the file reading process
//     return  data; // Returns the content of the file as a string
// });

// console.log('other stuuff'); // Indicates that other code can run while the file is being read asynchronously

//synchronous file reading
// var data = fs.readFileSync('input.txt'); // Synchronously reads the content of 'input.txt'
// console.log('data:', data.toString()); // Outputs the content of the file   
// console.log('read completed'); // Indicates the completion of the file reading process
// console.log('other stuff'); // This line will not execute until the file reading is complete, as it is synchronous



 
//----------------------- Writing in a file (Asynchronous way) ---------------------
console.log("writng starts");
fs.writeFile("./4.fs_module/input.txt", "file got upadated", (err) => {
  if (err) {
    console.log("Error in updating the file", err);
  } else {
    console.log("Update Succes");
  }
});
console.log("writing ends");

// ------------------------ writing the file (synchronous way)----------

console.log("writing starts");
fs.writeFileSync("./4.fs_module/input.txt", "file update via synchronous way");
console.log("writing ends");

// --------------------- Appending data to the file----------------------------

//Asynchronous way
fs.appendFile(
  "./4.fs_module/input.txt",
  "\nLearing FS module by Chirag Goel sir on pw skills",
  "utf-8",
  (err) => {
    if (err) {
      console.log("Error in appending", err);
    } else {
      console.log("Data Succesfully appended");
    }
  }
);

// //Synchronous way
fs.appendFileSync(
  "./4.fs_module/input.txt",
  "\nAdding data through synchronous way",
  "utf-8"
);

// ----------------------------------Deleting a file ------------------

fs.unlink("./4.fs_module/file.txt", (err) => {
  if (err) {
    console.log("Error in deleting the file", err);
  } else {
    console.log("File Deleted Successfully");
  }
});
