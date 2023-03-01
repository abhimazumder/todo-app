const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRoute = require('./routes/index');
const todoRoute = require('./routes/todo');

const mongoURL = "mongodb+srv://" + 'abhishek-mazumder' + ":" + process.env.ATLAS_PASSWORD + "@todo-app.w8ueyn6.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});
mongoose.set('strictQuery', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use('/', indexRoute);
app.use('/todo', todoRoute);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.render('error', { error : {
        status : error.status,
        message : error.message
    }
    });
})

module.exports = app;