const express = require('express');  //importing express js
const app = express(); //craeting instance
const appConfig = require('./config/appConfig'); //exact path
const fs = require('fs');
const http = require('http')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
 const cookieParser = require('cookie-parser');
//const route = require('./routes/blog.js');

const globalErrorMiddlewware = require('./middlewares/appErrorHandler');
const routeLoggerMiddleware = require('./middlewares/routeLogger');
const logger = require('./libs/loggerLib');
const time = require('./libs/timeLib');
var helmet = require('helmet');

//middlewares 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(cookieParser());

app.use(globalErrorMiddlewware.globalErrorHandler);
app.use(routeLoggerMiddleware.logIp);
app.use(helmet());



//app.get('/',(req,res)=> res.send('Hello World'));

//let helloWorld = (req,res)=> res.send('Hello World!!');
//app.get('/',helloWorld);
//app.get('/home',helloWorld);

//route.setRouter(app);

//models first as they are called in router file (i.e in controller while importing model)
// Bootstrap models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log(file)
        require(modelsPath + '/' + file)
    }
  })
  // end Bootstrap models



// console.log('here1');
//bootstrap rule for route
let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log("including the following file");
        console.log(routesPath + '/' + file)
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});
//end bootstrap rule
//console.log('here2');

//can use as per needed.
// console.log(time.now());
// console.log(time.getLocalTime());
// console.log(time.convertToLocalTime());


//calling global 404 handler after route

app.use(globalErrorMiddlewware.globalNotFoundHandler);

// app.listen(appConfig.port,()=> {
    
//     console.log('example app listening on port 3000');

//     //creating a mongo db connection here
// let db = mongoose.connect(appConfig.db.uri,{useMongoClient : true});
// })


/**
 * Create HTTP server.
 */

const server = http.createServer(app)
// start listening to http server
console.log(appConfig)
server.listen(appConfig.port)
server.on('error', onError)
server.on('listening', onListening)

// end server listening code

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
    let db = mongoose.connect(appConfig.db.uri, { useMongoClient: true })
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})


// handling mongoose connection error
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)

}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);

    } else {
        console.log("database connection open success");
    }

}); // end mongoose connection open handler

