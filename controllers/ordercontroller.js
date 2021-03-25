var router = require('express').Router();
var sequelize = require('../db');
const user = require('../models/user');
var Product = sequelize.import('../models/product.js');
var User = sequelize.import('../models/user.js');
var Order = sequelize.import('../models/order.js');
var Cart = sequelize.import('../models/cart.js');

//POST new order (admin / customer)
router.post('/create/:productId/:qty/:subtotal_price/:cartId', (req, res) => {
    
    Order.create({
        // orderId: req.body.order.orderId,
        qty: req.params.qty,
        subtotal_price: req.params.subtotal_price,
        cartId:req.params.cartId,
        productId: req.params.productId,
    })
    .then(order => res.status(200).json({
        order: order,
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
})
// 
//get all orders
router.get('/getall', function(req, res){
    
    Order.findAll({
        include:[
            {model:Product, as:'product', attributes:['id', 'category', 'name', 'unit_price', 'image']},
            {model: Cart, as: 'cart', attributes:['id', 'tax', 'total_price'], 
                include:{
                    model:User, as:'user', attributes:['id', 'firstname', 'lastname', 'mobile', 'email']
                }
            }
        ]
    }).then(
        function findAllSuccess(allOrders){
            res.json(allOrders);
        },
        function findAllError(err){
            // res.send(500, err.message)
            res.status(500).send(err.message)
        }
    )
})
//get individual order by orderId
router.get('/get/:orderId', function(req, res){
    var orderId = req.params.orderId;

    Order.findOne({
        where: {orderId : orderId},
        include:[
            {model:Product, as:'product', attributes:['id', 'category', 'name', 'unit_price']},
            {model: Cart, as: 'cart', attributes:['id', 'tax', 'total_price'], 
                include:{
                    model:User, as:'user', attributes:['id', 'firstname', 'lastname', 'mobile', 'email']
                }
            }
        ]
    })
    .then(
        function findOneSuccess(data){
            res.json(data);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    )
})

//UPDATE individual order by orderId
router.put('/update/:orderId/:productId/:qty/:subtotal_price', function(req, res){
    var orderId = req.params.orderId;
    var qty = req.params.qty;
    // var unit_price = req.params.unit_price;
    var subtotal_price = req.params.subtotal_price;
    // var cartId = req.params.cartId;
    var productId = req.params.productId;

    Order.update({subtotal_price, qty},
        {where:{orderId: orderId},
        include:[
            {model:Product, as:'product', attributes:['id', 'category', 'name', 'unit_price']},
            {model: Cart, as: 'cart', attributes:['id', 'tax', 'total_price'], 
                include:{
                    model:User, as:'user', attributes:['id', 'firstname', 'lastname', 'mobile', 'email']
                }
            }
        ]}                  
    )
    .then(info=> res.status(200).json({orderId, qty, productId, subtotal_price})
    )
.catch(err => res.status(500).json({error:err}))
});

router.put('/orderconfirmed/:orderId/:isConfirmed', function(req, res){
    var orderId = req.params.orderId;
    // var cartId = req.params.cartId;
    var isConfirmed = req.params.isConfirmed

    Order.update(
        {isConfirmed},
        {where:{orderId: orderId},
        include:[
            {model:Product, as:'product', attributes:['id', 'category', 'name', 'unit_price']},
            {model: Cart, as: 'cart', attributes:['id', 'tax', 'total_price'], 
                include:{
                    model:User, as:'user', attributes:['id', 'firstname', 'lastname', 'mobile', 'email']
                }
            }
        ]}
    )
    .then(allinfo=> res.status(200).json({orderId, isConfirmed})
    )
    .catch(err => res.status(500).json({error:err}))
})

//DELETE individual order by orderId
router.delete('/delete/:orderId', function(req, res){
    var orderId = req.params.orderId;

    Order.destroy(
        {where:{orderId: orderId}}                    
    )
    .then(
        function deleteInfoSuccess(orderId){
            res.send("you removed an orderId");
        },
        function deleteInfoError(err){
            res.send(500, err.message);
        }
    );
    });

//DELETE all orders
router.delete('/deleteall', function(req, res){
    Order.destroy(
        {where:{}}
    )
    .then(
        function deleteAllInfoSuccess(){
            res.send("you removed all orders");
        },
        function deleteAllInfoError(err){
            res.send(500, err.message);
        }
    );
})

//get all orders by userId
router.get('/getallbyuser/:userId', function(req, res){
    var userId = req.params.userId;

    Order.findAll({
        
        include:[{
                model:Product, as:'product', attributes:['id', 'category', 'name', 'unit_price']
            },{
                model: Cart, as: 'cart', attributes:['id', 'tax', 'total_price', 'userId'],
                where:{userId:userId}, 
                include:{
                    model:User, as:'user', attributes:['id', 'firstname', 'lastname', 'mobile', 'email']
                }
            }
        ]
    })
    .then(
        function findOneSuccess(data){
            res.json(data);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    )
})

//get all orders by productId
router.get('/getallbyproduct/:productId', function(req, res){
    var productId = req.params.productId;

    Order.findAll({
        where:{
            productId:productId,
        },
        include:[
            {model:Product, as:'product', attributes:['id', 'category', 'name', 'unit_price']},
            {model: Cart, as: 'cart', attributes:['id', 'tax', 'total_price'], 
                include:{
                    model:User, as:'user', attributes:['id', 'firstname', 'lastname', 'mobile', 'email']
                }
            }
        ]
    })
    .then(
        function findOneSuccess(data){
            res.json(data);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    )
})

//get all orders by cartId
router.get('/getallbycart/:cartId', function(req, res){
    var cartId = req.params.cartId;

    Order.findAll({
        where:{
            cartId:cartId, 
        },
        include:[
            {model:Product, as:'product', attributes:['id', 'category', 'name', 'unit_price']},
            {model: Cart, as: 'cart', attributes:['id', 'tax', 'total_price'], 
                include:{
                    model:User, as:'user', attributes:['id', 'firstname', 'lastname', 'mobile', 'email']
                }
            }
        ]
    })
    .then(
        function findOneSuccess(data){
            res.json(data);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    )
})

module.exports = router;