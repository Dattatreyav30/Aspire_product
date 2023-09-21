const Sequelize = require("sequelize");
const sequelize = require("../../util/database");
const User = sequelize.define('user',{
    id :{
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
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
        type : Sequelize.BIGINT,
        allowNull : false
    }
    ,
    email : {
        type : Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false  
    }

})

module.exports = User