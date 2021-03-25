const { decodeBase64 } = require('bcryptjs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('bakery', 'postgres', 'RomeoOhRomeo', {
    host: 'localhost',
    dialect:'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to bakery postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;