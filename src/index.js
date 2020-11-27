const express = require('express');
const morgan = require('morgan');

//initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 4001);
// Defining CORS
app.use(function(req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended:false })); 
app.use(express.json());

//Routes
app.use('/category', require('./routes/category'));
app.use('/concept', require('./routes/concept'));
app.use('/product', require('./routes/product'));
app.use('/point', require('./routes/acquisition-point'));
app.use('/movement', require('./routes/movement'));
app.use(require('./routes/index'));

//Starting the server
app.listen(app.get('port'),() => {
    console.log('server on port', app.get('port'));
});