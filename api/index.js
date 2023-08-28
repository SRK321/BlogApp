// api/index.js

// Import required modules and libraries
const express = require('express');
 const cors = require('cors');
 const bodyParser = require('body-parser');
 const mongoose = require('mongoose');
 const Categories = require('./routes/Categories');
 const auth = require('./routes/auth');
 const Users = require('./routes/Users');
 const path = require("path");
const Posts = require("./routes/Posts")


// const categoryRoutes = require('./routes/categoryRoutes');

// Create the Express app
const app = express();

// Set up middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse incoming JSON data
app.use("/images", express.static(path.join(__dirname, "/images")));

// Connect to MongoDB

mongoose
  .connect("mongodb+srv://user123:Sahil1234@mernapp.cmwwlxg.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Import any other configurations or middleware you may need

// Use your route handlers
 app.use('/api/auth', auth);
 app.use('/api' , Users)
 app.use('/api', Posts);
 app.use('/api', Categories);

// Add other routes and middleware as needed
console.log("Man will be man")
app.listen(5000 , () => {
  console.log(`Server is running on port 5000`);
});
