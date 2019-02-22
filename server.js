const express = require('express');
const app = express();
const Mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://douglasdb:121121@cluster0-2rsdh.mongodb.net/test?retryWrites=true";
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000);

app.get('/', (req, res) =>{
    res.render('index.ejs');
});



