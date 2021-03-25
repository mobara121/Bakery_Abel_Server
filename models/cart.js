const sequelize = require("../db");
const User = sequelize.import("./user.js");

module.exports = function(sequelize, DataTypes){
    const Cart = sequelize.define('cart', {
        // cartId:{
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     unique: true,
        //     autoIncrement: false,
        //     allowNull: true,
        // },
        subtotal_price: DataTypes.DECIMAL,
        tax: DataTypes.DECIMAL,
        total_price: DataTypes.DECIMAL,
        pickup_date: DataTypes.STRING,
        estimated_time: DataTypes.INTEGER
    });

    User.hasMany(Cart, {as: 'cart', foreignKey: 'userId'});
    Cart.belongsTo(User, {as: "user"});

    return Cart;
};