const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ToDo = require('../models/ToDo');

router.get('/', async (req, res, next) => {
    await ToDo.find()
    .exec()
    .then(todos => {
        res.render('index', {todos : todos});
    })
    .catch(error => {
        console.log(error);
        res.render('error', { error : {
            status : 500,
            message : "Internal Server Error"
        }
        });
    }) 
});


module.exports = router;