/**
 * Device.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var moment = require('moment');
module.exports = {
  tableName: 't_farm',
  attributes: {
    province: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(50)'
    },
    city: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(50)'
    },
    district: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(50)'
    },
    type: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(10)'
    }, 
    name: {
      type: 'string',
      columnType: 'varchar(100)'
    },
    linkman: {
      type: 'string',
      columnType: 'varchar(30)'
    },  
    telephone: {
      type: 'string',
      columnType: 'varchar(50)'
    },   
    createTime: {
      type: 'ref',
      columnType: 'datetime', 
      defaultsTo: '1900-01-01'
    },
    updateTime: {
      type: 'ref',
      columnType: 'datetime', 
      defaultsTo: '1900-01-01'
    }, 
    remark: {
      type: 'string',
      columnType: 'varchar(3000)',
      allowNull: true,
      defaultsTo: ''
    },  
    userId: {
      type: 'number',
      allowNull: true,
      columnType: 'int'
    }, 
    mainCrop: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(100)'
    }, 
    area: {
      type: 'number', 
      allowNull: true,
      columnType: 'int'
    }, 
    img: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(200)'
    }, 
  }

}