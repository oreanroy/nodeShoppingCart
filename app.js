var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');


var routes = require('./routes/index');


var app = express();

// view engine setup
app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs' 
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


var url = 'mongodb://orean:' + 
 process.env.MONGO_ATLAS_PW + 
 '@node-rest-shop-shard-00-00-qqy8u.mongodb.net:27017,node-rest-shop-shard-00-01-qqy8u.mongodb.net:27017,node-rest-shop-shard-00-02-qqy8u.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true'



mongoose.connect(
    url, 
        {
            auth: {
                user: 'orean',
                password: '2437oreanRahul'
            },
            useNewUrlParser: true
        },
    function(err, client) {
        if (err) {
            console.log(err);
        }
    console.log('connected!!!');
    }
);
mongoose.Promise = global.Promise;

require('./config/passport');

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
