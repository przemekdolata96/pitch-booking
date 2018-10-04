const mongoose = require('mongoose');
const Pitch = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    dates: {}
});

module.exports = mongoose.model('Pitch', Pitch);