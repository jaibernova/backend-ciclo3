const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    identificacion: String,
    name: String,
    lastname: String,
    telephone: String,
    email: {
        type: String,
        unique: true,
    },
    typeusername: String,
    status: String,
    password: String
})

module.exports = mongoose.model('users', User)