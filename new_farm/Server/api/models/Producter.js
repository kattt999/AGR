/**
 * Producter.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var moment = require('moment');
module.exports = {
  tableName: 't_producter',
  attributes: {
    isactive: {
      type: 'string',
      columnType: 'char(1)'
    },
    username: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(10)'
    },
    phone: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(11)'
    },
    wechat: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(30)'
    }, 
    usercard: {
      type: 'string',
      columnType: 'varchar(30)'
    }, 
    createdate: {
      type: 'ref',
      columnType: 'datetime', 
      defaultsTo: '1900-01-01'
    }, 
    sys_user_id: {
      type: 'number',
      allowNull: true,
      columnType: 'int'
    }, 
    producerTypeId: {
      type: 'number',
      allowNull: true,
      columnType: 'int'
    }, 
    password: {
      type: 'string', 
      columnType: 'varchar(20)'
    }, 
    farm_id: {
      type: 'number', 
      columnType: 'int'
    }, 
    openid: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    }, 
  }

}