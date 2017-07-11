'use strict';
const sq = require('sequelize');
const sqlz = require("./db_connect");

const Users = sqlz.define('users',   {
    id: {  type: sq.INTEGER,primaryKey: true,  autoIncrement:  true },
    googleID:   { type: sq.STRING, unique: true },
    accessToken: sq.TEXT,
    refreshToken:   sq.TEXT,
    photos: sq.TEXT,
    displayName: sq.TEXT

});

const Orders = sqlz.define('orders',   {
    id: {  type: sq.INTEGER,  primaryKey: true,  autoIncrement:  true },
    playlistID: sq.TEXT,
    ownerID:   sq.STRING
});

const Sales = sqlz.define('sales',   {
    id: {  type: sq.INTEGER,  primaryKey: true,  autoIncrement:  true },
    playlistID:   { type: sq.STRING,     unique: true },
    price: sq.FLOAT
});

Users.sync();
Sales.sync();
Orders.sync();

module.exports = {Users,Orders,Sales};


