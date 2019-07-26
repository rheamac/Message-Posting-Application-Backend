const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.text());
app.use(cors());

const port = 3000;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'messageBoard';
let db;



app.post('/api/message',(req, res) => {
    console.log(req.body);
    db.collection('messages').insertOne({'msg': req.body});
    res.status(200).send();
});

// Use connect method to connect to the Server
MongoClient.connect(url,function(err, client) {
    if(err) return console.log("mongodb error", err);
    console.log("Connected successfully to server"); 
    db =client.db(dbName);
  });

app.listen(port, ()=> console.log("app is running", port));