const sequelize = require("../db");
const Product = sequelize.import("./product");
// const User = sequelize.import("./user");
const Cart = sequelize.import("./cart.js");

module.exports = function(sequelize, DataTypes){
    const Order = sequelize.define('Order', {
        orderId:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            allowNull: true,
        },
        qty: {
            type:DataTypes.INTEGER
        },
        subtotal_price: {
            type:DataTypes.DECIMAL
        },
        isConfirmed:{
            type:DataTypes.BOOLEAN
        }
    });
    

    Cart.belongsToMany(Product, {through: {model:'Order', unique: false}});
    Product.belongsToMany(Cart, {through: {model:'Order', unique:false}});
    Order.belongsTo(Product, {foreignKey:{name:'productId', constraints:false}});
    Order.belongsTo(Cart, {foreignKey:{name:'cartId', constraints: false}, allowNull:true})

    // Cart.hasMany(Order, {as: 'order', foreignKey: 'cartId'});
    // Order.belongsTo(Cart, {as: "cart", foreignKey: 'cartId'});
    return Order;
};
