const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");
const route = require('./src/route/route.js')

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://group22:1234@group22databse.uvtoalh.mongodb.net/group22Database";

mongoose.connect(MONGODB_URI)
.then(()=> console.log("MongoDB is connected successfully"))
.catch(err => console.log(err))


app.use("/api",route)

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('Express app running on port ' + PORT)
});


