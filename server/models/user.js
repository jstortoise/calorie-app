const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String,
    role: { type: Number, default: 0 },
    calorie: { type: Number, default: 3000 },
    created: { type: Date, default: Date.now }
});

// Generates Hash
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// Compares the Password
User.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', User);
