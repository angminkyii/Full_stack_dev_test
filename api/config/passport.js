var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('../model/db').mongoose;
var User = mongoose.model('User');

passport.use(new localStrategy({
    usernameField: 'email'
},(username, password, done) => {
    User.findOne({email: username}, (err, user) => {
        if(err){ return done(err);
        }
        if(!user) {
            return done(null, false, {message: 'User not found'});
        } 
        if(!user.validPassword(password)){
            return done(null, false, {
                message: 'Password is wrong'
            });
        }
        return done(null, user);
    });
}));