var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    patientID: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        index: true
    },
    BirthDate: {
        type: Date,
    },
    password: {
        type: String
    },
    age: {
        type: String,
    },
    role: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('User', userSchema);