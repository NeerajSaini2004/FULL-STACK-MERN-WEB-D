require('dotenv').config(); // ye dotenv package ko import karta hai jo environment variables ko manage karta hai
const port=process.env.PORT || 3000; // ye port variable ko set karta hai
// agar environment variable PORT set hai to use karega, nahi to 3000 use kare


const app = require('./app');// Importing the Express app from app.js

app.listen(port, () => { // ye server ko start karta hai aur port par listen karta hai
  // ye callback function hai jo server start hone par execute hota hai

    console.log(`Server is listening at http://localhost: ${port}`);

});