var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('ticketlist', ['ticketlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/ticketlist', function (req, res) {
  console.log('I received a GET request');

  db.ticketlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/ticketlist', function (req, res) {
  console.log(req.body);
  db.ticketlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/ticketlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.ticketlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/ticketlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.ticketlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/ticketlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.ticketlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {fileName: req.body.fileName, fileContent: req.body.fileContent, status: req.body.status, detail: req.body.detail}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");