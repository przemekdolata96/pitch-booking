const mongoose = require('mongoose');
const Date = mongoose.Schema({
    _id: Number,
    date: String,
    bookings: {}
});

module.exports = mongoose.model('Date', Arena);