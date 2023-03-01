const express = require('express');
const router = express.Router();
const ToDo = require('../models/ToDo');

router.post('/', async (req, res, next) => {
    const todo = new ToDo({
        todo : req.body.todo
    });
    await todo.save()
    .then(result => {
        console.log(result);
        res.redirect('/');
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

router.get('/:todo_id', async (req, res, next) => {
    await ToDo.deleteOne({_id : req.params.todo_id})
    .exec()
    .then(result => {
        console.log(result);
        res.redirect('/');
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