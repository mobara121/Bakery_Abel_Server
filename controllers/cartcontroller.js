var router = require('express').Router();
var sequelize = require('../db');
var Cart = sequelize.import('../models/cart.js');
var User = sequelize.import('../models/user.js');
var Product = sequelize.import('../models/product.js');
var Order = sequelize.import('../models/order.js');


//POST new cart (admin /customer)
router.post('/create', (req, res) => {
// /:subtotal_price/:tax/:total_price/:pickup_date/:estimated_time/:userId
    Cart.create({
        // cartId: req.params.cartId,
        // subtotal_price: req.params.subtotal_price,
        // tax: req.params.tax,
        // total_price: req.params.total_price,
        // pickup_date: req.params.pickup_date,
        // estimated_time: req.params.estimated_time,
        // userId: req.params.userId
    })
    .then(cart => res.status(200).json({
        cart: cart
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
})

//GET all carts (admin only)
router.get('/getall', function(req, res){

    Cart.findAll({
        include:[
            {model:User, as:'user', attributes:['id', 'firstname', 'lastname', 'mobile', 'email']}]
    })
    .then(
        function findAllSuccess(data){
            res.json(data);
        },
        function findAllError(err){
            res.send(500, err.message);
        }
    );
})

//GET individual cart by cartId
router.get('/get/:cartId', function(req, res){
    var cartId = req.params.cartId;

    Cart.findOne({
        where: {id : cartId},
        include: [{
            model: User,
            as:'user',
            attributes:['id', 'firstname', 'lastname', 'mobile', 'email']
        },]
    })
    .then(
        function findOneSuccess(data){
            res.json(data);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    );
})

//UPDATE individual cart by cartId
router.put('/update/:cartId/:subtotal_price/:tax/:total_price/:pickup_date/:estimated_time/:userId', function(req, res){
    var subtotal_price = req.params.subtotal_price;
    var tax = req.params.tax;
    var total_price = req.params.total_price;    
    var pickup_date = req.params.pickup_date;
    var estimated_time = req.params.estimated_time;
    var userId = req.params.userId;
    var cartId = req.params.cartId;
// 
//  
    Cart.update({cartId, subtotal_price, tax, total_price, pickup_date, estimated_time, userId},
        {where:{id: cartId},
        include:[
            {model: User,
                as:'user',
                attributes:['id', 'firstname', 'lastname', 'mobile', 'email']},
        ]
    }                  
    )
    .then(info=> res.status(200).json({cartId, subtotal_price, tax, total_price, pickup_date,estimated_time, userId})
    )
.catch(err => res.status(500).json({error:err}))
});

//DELETE individual cart by cartId
router.delete('/delete/:cartId', function(req, res){
    var cartId = req.params.cartId;

    Cart.destroy(
        {where:{id:cartId}}
    )
    .then(
        function deleteInfoSuccess(cartId){
            res.send("you removed a cartId");
        },
        function deleteInfoError(err){
            res.send(500, err.message);
        }
    )
})

//GET all carts by userId (admin/user) 
router.get('/getallbyuser/:userId', function(req, res){
    var userId = req.params.userId;

    Cart.findAll({
        where: {
            userId: userId
        },
        include: [{
            model: User,
            as:'user',
            attributes:['id', 'firstname', 'lastname', 'mobile', 'email'],
        }]
    })
    .then(
        function findOneSuccess(data){
            res.json(data);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    );
})

//GET all carts by user.mobile (admin/user) 
router.get('/getallbyuser/:mobile', function(req, res){
    var mobile = req.params.mobile;

    Cart.findAll({
        where: {
            mobile: mobile
        },
        include: [{
            model: User,
            as:'user',
            attributes:['id', 'firstname', 'lastname', 'mobile', 'email'],
        }]
    })
    .then(
        function findOneSuccess(data){
            res.json(data);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    );
})

module.exports = router;