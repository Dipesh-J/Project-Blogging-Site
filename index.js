const mongoose = require('mongoose');
const express = require("express");
const route = require('./src/route/route.js')

const app = express();

app.use(express.json())

mongoose.connect("mongodb+srv://group22:1234@group22databse.uvtoalh.mongodb.net/group22Database")
.then(()=> console.log("MongoDB is connected successfully"))
.catch(err => console.log(err))


app.use("/",route)

app.listen(3000, function () {
    console.log('Express app running on port ' + 3000)
});


