var mongoose = require('mongoose');


var surgeryTypeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('SurgeryType', surgeryTypeSchema);