const express = require('express');
const app = express();
const Mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://douglasdb:121121@cluster0-2rsdh.mongodb.net/test?retryWrites=true";
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

Mongodb.connect(uri, (err, client) =>{
    if (err) {
        return console.log(err);
    }

    db = client.db('douglasdb');

    app.listen(3000);
    console.log('Server rodando na porta 3000');
})

app.get('/', (req, res) =>{
    res.render('index.ejs');
});

app.get('/deletar', (req, res) =>{
    db.collection('sorteio').deleteMany();

    res.render('novo.ejs');
})

app.get('/novo', (req, res) =>{
    res.render('novo.ejs');
})

app.post('/novo', (req, res) =>{
    db.collection('sorteio').insertOne(req.body, (err, results) =>{
        if (err) {
            return console.log(err);
        }

        res.redirect('/novo');
    });
})

app.get('/atual', (req, res) =>{
    db.collection('sorteio').find().toArray((err, results) =>{
        if (err) {
            return console.log(err);
        }

        res.render('atual.ejs', { data: results });
    })
})

app.get('/sorteio', (req, res) =>{
    db.collection('sorteio').find().toArray((err, results) =>{
        if (err) {
            return console.log(err);
        }

        let resultado = [];

        results.forEach(function(results){
            resultado.push(results.name);
        })
        let sorteado = resultado[Math.floor(Math.random() * resultado.length)];

        res.render('sorteio.ejs', { data: sorteado });
    })
})

app.get('/adicionar', (req, res) =>{
    res.render('novo.ejs');
})

