const express = require('express');
const morgan = require('morgan');
const path = require('path');

//initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 4001);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended:false })); 
app.use(express.json()); 

//Global variables

//Routes
app.use('/category', require('./routes/category'));
app.use('/concept', require('./routes/concept'));
app.use('/product', require('./routes/product'));
app.use('/point', require('./routes/acquisition-point'));
app.use('/movement', require('./routes/movement'));
app.use(require('./routes/index'));

//Public
//app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'),() => {
    console.log('server on port', app.get('port'));
});