const mongoose = require('mongoose');

const FormSchema = mongoose.Schema({
    name: String,
    email_id: String,
    contact: String,
    address: String,
    dob: String,
})

module.exports = mongoose.model('Form', FormSchema);