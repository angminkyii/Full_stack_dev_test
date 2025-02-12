var mongoose = require('mongoose');
var config = require('./config_file');

mongoose.connect(config.dbPath);
var db = mongoose.connection;

db.on('error', function(){
    console.log('error occured from db');
});

db.once('open', function dbOpen(){
    console.log('Successfully opened the db');
});

exports.mongoose = mongoose;
