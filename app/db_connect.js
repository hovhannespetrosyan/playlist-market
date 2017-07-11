'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('db','root','usbw',{
    host:   'localhost',
    dialect:    'mysql',
    port:   3307,
    pool:   {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});
sequelize.authenticate()
.then(() => {console.log("db's response: OK")})
.catch(err => {
    console.error('Unable to connect to the database:',err)
});

module.exports = sequelize;