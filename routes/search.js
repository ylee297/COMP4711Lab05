const express = require('express');
let mod = require('../artists');
let path = require('path');
const router = express.Router();
let app = express();


app.use(express.static(path.join(__dirname,'public')));
app.get('/search', (req,res) => {
    res.sendFile(path.join(__dirname,'../','views','search.html'));
});

app.post('/search/add', function (req, res) {
    mod.add(res.req.body);
    res.json("Darren's help!");
});

app.post('/search/delete', function (req, res) {
    mod.del(res.req.body.index);
    res.json("Darren's help!");
});

app.post('/search/sortedSearch', function (req, res) {
    let json = { "indexes" : mod.getIndexes(res.req.body.query)};
    res.json(json);
});




module.exports = app;
