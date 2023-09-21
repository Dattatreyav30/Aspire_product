const Sequelize = require("sequelize");
const sequelize = require("sequelize");
const User = sequelize.ddefine('user',{
    id :{
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoInrement : true
    },
    companyName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    companyLogoUrl : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    mobile : {
        type : Sequelize.INTEGER,
        allowNull : false
    }
    ,
    password : {
        type : Sequelize.STRING,
        allowNull : false  
    }

})

module.exports = User