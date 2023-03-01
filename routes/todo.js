const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const ToDo = require('../models/ToDo');

router.post('/', async (req, res, next) => {
    const todo = new ToDo({
        _id : new mongoose.Types.ObjectId(),
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

router.get('/done/:todo_id', async (req, res, next) => {
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

router.get('/edit/:todo_id', async (req, res, next) => {
    const doc = ToDo.find({_id : req.params.todo_id}).select('todo').exec()
    .then(doc => {
        console.log(doc);
        res.render('edit', {
            doc : {
                _id : doc[0]._id,
                todo : doc[0].todo
            }
        });
    })    
})

router.post('/edit/:todo_id', async (req, res, next) => {
    await ToDo.updateOne({
        _id : req.params.todo_id
    },
    {
        $set : {
            todo : req.body.todo
        }
    })
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