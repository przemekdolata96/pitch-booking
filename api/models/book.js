const mongoose = require('mongoose');
const Book = mongoose.Schema({
    book: {
        email: String,
        startTime:Number,
        endTime: Number,
        bookings: {}
    }
});

module.exports = mongoose.model('Book', Arena);