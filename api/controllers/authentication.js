var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');

var sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
}

module.exports.register = (req, res) => {
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    console.log('Registering...');
    console.log(user.name);
    console.log(user.email);
    console.log(req.body.password);
    user.setPassword(req.body.password);
    console.log('Setting password complete.');

    user.save((err) => {
        console.log('Generating token.');
        var token;
        token = user.generateJwt();
        console.log('Token generated. Status 200 OK.');
        res.status(200);
        res.json({
            "token":token
        });
    });
}

module.exports.login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        var token;
        console.log('Login');
        if(err){
            res.status(404).json(err);
            return;
        }

        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        }else{
            console.log('In authentication');
            res.status(401).json(info);
        }
    })(req, res);    
}
