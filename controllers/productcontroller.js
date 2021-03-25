var router = require('express').Router();
var sequelize = require('../db');
var Product = sequelize.import('../models/product.js');
// var User = sequelize.import('../models/user.js');

//POST new product (admin only)
router.post('/create', (req, res) => {
    // var owner = req.user.id;

    Product.create({
        category: req.body.product.category,
        name: req.body.product.name,
        unit_price: req.body.product.unit_price,
        image: req.body.product.image,
        // owner: owner
    })
    .then(product => res.status(200).json({
        product: product
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
})

//GET all products (admin only)
router.get('/get', function(req, res){

    Product.findAll({

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

//GET all products by category (admin / user)
router.get('/get/:category', function(req, res){
    var category = req.params.category;

    Product.findAll({
        where: {category: category}
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

//GET single product by product.id  (admin / user)
router.get('/getbyproductId/:id', function(req, res){
    var id = req.params.id;

    Product.findOne({
        // where: {id: req.body.product.id, name: req.body.product.name, price: req.body.product.price}
        // where:{id: req.body.product.id}
        where: {id: id}
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


//GET all products for individual user (admin/user)
router.get('/get/:user_id', function(req, res){
    var userid = req.params.id

    Product.findAll({
        where: {owner: userid}
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

//UPDATE by productId
router.put('/update/:id', (req, res)=>{
    var productPK = req.params.id;
    var updateData = req.body.product

    Product.update(updateData, 
        {where: {id: productPK}
    })
    .then(info => res.status(200).json({updateData})
    )
    .catch(err => res.status(500).json({
        error: err
    }))
})

//DELETE by productId
router.delete('/delete/:id', (req, res)=>{
    var data = req.params.id

    Product.destroy({
        where:{id: data}
    })
    .then( 
        function deleteInfoSuccess(data){
            res.send("you removed a product data");
        },
        function deleteInfoError(err){
            res.send(500, err.message);
        }
    );
})

module.exports = router;