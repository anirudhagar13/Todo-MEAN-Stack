/*================ Bais HTTP Server =================*/
//Importing packages =================================
var mongo = require('mongoose')
var express = require('express')
var morgan = require('morgan')
var body = require('body-parser')
var method = require('method-override')
var database = require('./configure/database')
var port = process.env.PORT || 8000;	// Can set env. variable PORT to anything

//Express instance creation
var app = express()

//Configuration ========================================
mongo.connect(database.url);	//Connect mongo with database on mongo.io
app.use(express.static(__dirname + '/public'));	//For automatic response to static files
app.use(morgan('dev'));	//Log all requests onto console
app.use(body.urlencoded({'extended':'true'}));	// parse application/x-www-form-urlencoded       
app.use(body.json());	// parse application/json
app.use(body.json({ type: 'application/vnd.api+json' }));	//Specific parsing of json requests
app.use(method());

// routes ===============================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ===============
app.listen(port);
console.log("App listening on port : "+port);
