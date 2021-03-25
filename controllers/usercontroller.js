var express = require('express') //7-1
var router = express.Router() //7-2
var sequelize = require('../db'); //7-3
var User = sequelize.import('../models/user.js'); //7-4
// var Product = sequelize.import('../models/product.js');
// var Order = sequelize.import('../models/order.js')
var bcrypt = require('bcryptjs');//7-5
var jwt = require('jsonwebtoken');//7-6


router.post('/adminregister', function(req, res){
    var firstname = req.body.user.firstname;
    var lastname = req.body.user.lastname;
    var mobile = req.body.user.mobile;
    var email = req.body.user.mobile;
    var pass = req.body.user.password;
    var isAdmin = req.body.user.isAdmin;

    User.create({
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        email: email,
        passwordhash: bcrypt.hashSync(pass, 10),//7-7
        isAdmin: isAdmin
    }).then(
        function createSuccess(user){
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});//7-8

            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            })
        }
    )
})

router.post('/adminlogin', function(req, res){
    User.findOne({where: {firstname: req.body.user.firstname, lastname: req.body.user.lastname }}).then(
        function(user){
            if(user){
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
                    if(matches){
                        var token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                    } else{
                        res.status(502).send({error: 'failed to authenticate.'});
                    }
                });
            } else {
                res.status(500).send({error: "you failed."});
            }
        },
        function(err){
            res.status(501).send({error: "Login failed"});
        }
    );
});

//POST customer info
router.post('/customer_create/:firstname/:lastname/:mobile/:email', function(req, res){
    var firstname = req.params.firstname;
    var lastname = req.params.lastname;
    var mobile = req.params.mobile;
    var email = req.params.email;
    // var pass = req.body.user.password;
    // var isAdmin = req.body.user.isAdmin;

    User.create({
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        email: email,
        // passwordhash: bcrypt.hashSync(pass, 10),//7-7
        // isAdmin: isAdmin
    }).then(
        function createSuccess(user){
            // var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});//7-8

            res.json({
                user: user,
                message: 'created',
                // sessionToken: token
            })
        }
    )
})
//POST(login) customer info -->no needed
router.post('/login', function(req, res){
    User.findOne({where: {firstname: req.body.user.firstname, lastname: req.body.user.lastname }}).then(
        function(user){
            if(user){
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
                    if(matches){
                        var token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                    } else{
                        res.status(502).send({error: 'failed to authenticate.'});
                    }
                });
            } else {
                res.status(500).send({error: "you failed."});
            }
        },
        function(err){
            res.status(501).send({error: "Login failed"});
        }
    );
});

router.get('/getall', function(req, res){
    User.findAll({
        include:[Order]
        // include:[{model:Order, attributes:['orderId', 'productId', 'qty', 'subtotal_price', 'createdAt']},
                // {model:Product, attributes:'id'}
            // ]
    }).then(
        function fincOneSuccess(allUsers){
            res.json(allUsers);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    );
})

//get individual user
router.get('/get/:id', function(req, res){
    var id = req.params.id;

    User.findOne({
        where:{id:id},
        // include:[Order]
    }).then(
        function fincOneSuccess(user){
            res.json(user);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    );
})

//UPDATE by userId
router.put('/update/:id', (req, res)=>{
    var userPK = req.params.id;
    var updateData = req.body.user

    Product.update(updateData, 
        {where: {id: userPK}
    })
    .then(info => res.status(200).json({updateData})
    )
    .catch(err => res.status(500).json({
        error: err
    }))
})

//get individual user by firstname & mobile
router.get('/getbymobile/:firstname/:mobile', function(req, res){
    var firstname = req.params.firstname;
    var mobile = req.params.mobile;

    User.findOne({
        where:{firstname:firstname, mobile:mobile},
        // include:[Order]
    }).then(
        function fincOneSuccess(user){
            res.json(user);
        },
        function findOneError(err){
            res.send(500, err.message);
        }
    );
})

//UPDATE by mobile
router.put('/update/:id', (req, res)=>{
    var userPK = req.params.id;
    var updateData = req.body.user

    Product.update(updateData, 
        {where: {id: userPK}
    })
    .then(info => res.status(200).json({updateData})
    )
    .catch(err => res.status(500).json({
        error: err
    }))
})

//DELETE by userId
router.delete('/delete/:id', (req, res)=>{
    var data = req.params.id

    Product.destroy({
        where:{id: data}
    })
    .then( 
        function deleteInfoSuccess(data){
            res.send("you removed a user data");
        },
        function deleteInfoError(err){
            res.send(500, err.message);
        }
    );
})
module.exports = router;