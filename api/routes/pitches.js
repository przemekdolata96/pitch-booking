const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Pitch = require('../models/pitch');
/* This route doesn't need authentication */
router.get('/', function (req, res) {
    const query = Pitch.find({}).select('_id name');
    
    query.exec(function (err, pitches) {
        if (err) return next(err);
        res.json({
            pitches: pitches
        });
    })
});

router.post('/', function (req, res) {
    const pitch = new Pitch({
        _id: new mongoose.Types.ObjectId(),
        name: 'Pitch Name',
        dates: {}
    })
    pitch.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: "Handling POST",
        pitch: pitch
    })
});

module.exports = router;