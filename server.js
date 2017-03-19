var express = require('express');
var port = require('./config_file').port;
var path = require('path');
var server = express();
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

require('./api/model/db');
require('./api/model/users');
require('./api/config/passport');


server.use(passport.initialize());
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.static(path.join(__dirname, 'api_client')));
server.use(bodyParser.json());
server.use(cookieParser());

var routeApi = require('./api/routes/routes');

server.use('/api', routeApi);
server.use((req, res) => {
  res.sendFile(path.join(__dirname, 'app_client','index.html'));
});

server.use((err, req, res, next) => {
    if(err.name == 'UnauthorizedError'){
        res.status(401);
        res.json({"message": err.name + ": " + err.message});
    }
});

//server.use('/api',routeApi);
server.listen(port, () => {
    console.log(`Listening to port ${port}`);
})