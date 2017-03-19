var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = (req, res) => {
    console.log('Reading profile.');
    if(!req.payload._id){
        console.log('Payload id does not exist.');
        console.log(req.payload._id);
        res.status(401).json({
            "message": "UnauthorisedError: private profile"
        });
    }else{
        console.log('Finding user.');
        User
        .findById(req.payload._id)
        .exec((err, user) => {
            res.status(200).json(user);
        });
    }
}