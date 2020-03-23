const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();


const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database!");
  // we're connected!
});

const MessageSchema = mongoose.Schema({
  name: {type: String },
  comment: {type: String},
});

const Message = mongoose.model("Message", MessageSchema);
// const Datastore = require ("nedb");

// const db = new Datastore({filename: "dada.db", autoload: true});



app.use(express.static("Public"));
app.use(express.json());

app.post("/add", (request, response) => {
    const newName = request.body.name;
    const newComment = request.body.comment;
    addMessage(newName, newComment, (err, newName) => {
        response.json(newName);
    });

    
});

app.get("/display", (request, response) => {
    const messages = Message.find((err, data) => {
        response.json(data);

    });
    
})

function addMessage(name, comment, cb){
    Message.create({name: name, comment: comment}, (err, newMessage) => {
        if (err){
            console.log(err);
        }
        
        else {
            cb(err, newMessage);
        }

    })
    //Message.insert({name: name},(err, newName) => {
//cb(err, newName);
    //});
}

// app.listen(8000, () => {
//      console.log("I hear you on 8000!");

// }):

const port = process.env.PORT || 3000; 
app.listen(port, () => { console.log(`Express server listening on port ${port}!`); 
});
