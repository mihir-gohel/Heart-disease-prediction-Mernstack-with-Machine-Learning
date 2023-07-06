const mongoose = require('mongoose');

const appoSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : false
    },
    lname : {
        type : String,
        required : false
    },
    contact : {
        type : String,
        required : false
    },
    email : {
        type : String,
        required : false
    },
    appointment : {
        type: String,
        required : false
   }
})

const Appointment = mongoose.model("Appointment" , appoSchema);

module.exports = Appointment;