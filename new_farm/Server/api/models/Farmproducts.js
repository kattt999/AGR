/**
 * Device.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var moment = require('moment');
module.exports = {
  tableName: 't_farm_products',
  attributes: {
    type: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(10)'
    },
    state: {
      type: 'number',
      columnType: 'int'
    },
    name: {
      type: 'string',
      columnType: 'varchar(100)'
    },
    plantnum: {
      type: 'number',
      allowNull: true,
      columnType: 'float'
    },
    price: {
      type: 'number',
      allowNull: true,
      columnType: 'float'
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
  },
  toJSON: function () {
    var obj = this.toObject();
    obj.createTime = moment(obj.createTime).format('YYYY-MM-DD HH:mm:ss')
    obj.updateTime = moment(obj.updateTime).format('YYYY-MM-DD HH:mm:ss')
    return obj;
  },

  beforeCreate: function (values, next) {
    values.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
    return next();
  },
  beforeUpdate: function (values, next) {
    values.updateTime = moment().format('YYYY-MM-DD HH:mm:ss')
    delete values.createTime
    return next();
  }

}