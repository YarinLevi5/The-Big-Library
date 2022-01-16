const {
    urlencoded
} = require('express');
var express = require('express');
var app = express();
let books = require('./books.json');
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
let fs = require('fs');
const {
    json
} = require('express/lib/response');
var validator = require('validator');

app.get('/', function (req, res) {
    res.send("<h1>Wellcone to the library</h1>");
});

app.get('/books', function (req, res) {
    res.send(books);
});
app.get('/books/:id', function (req, res) {
    let findBookId = books.find(book => book.id == req.params.id);
    res.send(findBookId);
});
app.get('/books/:name', function (req, res) {
    let findBookName = books.find(book => book.name === req.params.name);
    res.send(findBookName);
});

app.post('/books', function (req, res) {
    let obj = {
        id: books[books.length - 1].id + 1,
        name: req.body.name,
        publish_date: req.body.publish_date
    }
    if (validator.isEmpty(obj.name, obj.publish_date)) {
        throw 'check your fileds!'
    } else {
        res.send('User create')

    }

    fs.readFile("books.json", function (err, data) {
        var jsonArray = JSON.parse(data);
        jsonArray.push(obj);
        fs.writeFile("books.json", JSON.stringify(jsonArray), err => {
            console.log(err);
        })
    })

});

app.listen(8000, function () {
    console.log('Example app listening on port 8000.');
});