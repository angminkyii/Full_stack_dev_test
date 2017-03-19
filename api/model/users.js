
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var newUser = new mongoose.Schema({
       email: {type: String, required: true, unique: true},
       name: {type: String, required: true},
       hash: String,
       salt: String
    });

newUser.methods.setPassword = (password) => {
    console.log('Setting password.');
    console.log(password);
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    console.log('Hashing complete.');
}

newUser.methods.validPassword = (password) => {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash == hash;
}

newUser.methods.generateJwt = () => {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, 'MY_SECRET');
}

mongoose.model('User',newUser);