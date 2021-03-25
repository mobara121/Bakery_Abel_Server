require('dotenv').config(); //11

var express = require('express'); //4
var app = express(); //4
var user = require('./controllers/usercontroller');
var product = require('./controllers/productcontroller');
var order = require('./controllers/ordercontroller');
var cart = require('./controllers/cartcontroller');
var sequelize = require('./db'); //8-3

app.use(express.json());
app.use(require('./middleware/headers'));
app.use('/user', user);//9

// app.use(require('./middleware/validate-session'));
app.use('/product', product);
app.use('/order', order);
app.use('/cart', cart);
sequelize.sync();
app.listen(3000, function(){

});
