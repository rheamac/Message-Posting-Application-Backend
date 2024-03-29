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


// post data from client to database with status code
app.post('/api/message', (req, res) => {
    db.collection('messages').insertOne({'msg': req.body});
    res.status(200).send();
});

// to get all messages
app.get('/api/message', async (req, res) => {
  const docs = await db.collection('messages').find({}).toArray();
  if(!docs) return res.json({error:'Error fetching messages'});
  res.json(docs);
});

// Use connect method to connect to the Server
MongoClient.connect(url,function(err, client) {
    if(err) return console.log("mongodb error", err);
    db =client.db(dbName);
  });

  // to listen to the port
app.listen(port, ()=> console.log("app is running", port));