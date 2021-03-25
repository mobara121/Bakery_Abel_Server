module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define('user', {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        mobile: DataTypes.STRING,
        email: DataTypes.STRING,
        passwordhash: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    });

    return User;
}

