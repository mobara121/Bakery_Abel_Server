// module.exports = function(sequelize, DataTypes){
//     return sequelize.define('product', {
//         category: DataTypes.STRING,
//         name: DataTypes.STRING,
//         price: DataTypes.DECIMAL,
//         image: DataTypes.TEXT,
//         // owner: DataTypes.INTEGER
//     });
// };

module.exports = (sequelize, DataTypes)=>{
    const product = sequelize.define('product', {
        category: DataTypes.STRING,
        name: DataTypes.STRING,
        unit_price: DataTypes.DECIMAL,
        image: DataTypes.TEXT,
    });
    

    return product;
}