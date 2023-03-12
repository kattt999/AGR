/**
 * Device.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var moment = require('moment');
module.exports = {
  tableName: 't_device',
  attributes: {
    sn: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    name: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    typeId: {
      type: 'number',
      columnType: 'int'
    },
    farmId: {
      type: 'number',
      columnType: 'int'
    },
    location: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    image: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(2000)'
    },
    installTime: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: '1900-01-01'
    },
    state: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)',
      defaultsTo: ''
    },
    standard: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)',
      defaultsTo: ''
    },
    manufacturer: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },
    userId: {
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    softwareVersion: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)',
      defaultsTo: ''
    },
    thresholdMin: {
      type: 'number',
      allowNull: true,
      columnType: 'float'
    },
    thresholdMax: {
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
      columnType: 'varchar(500)',
      allowNull: true,
      defaultsTo: ''
    },
    operator: {
      type: 'string',
      columnType: 'varchar(255)',
      allowNull: true,
      defaultsTo: ''
    }
  },
  toJSON: function () {
    var obj = this.toObject();
    obj.installTime = moment(obj.installTime).format('YYYY-MM-DD HH:mm:ss')
    obj.createTime = moment(obj.createTime).format('YYYY-MM-DD HH:mm:ss')
    obj.updateTime = moment(obj.updateTime).format('YYYY-MM-DD HH:mm:ss')
    console.log(JSON.stringify(obj))
    return obj;
  },

  beforeCreate: function (values, next) {
    values.installTime = moment(values.installTime).format('YYYY-MM-DD HH:mm:ss')
    values.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
    return next();
  },
  beforeUpdate: function (values, next) {
    values.installTime = moment(values.installTime).format('YYYY-MM-DD HH:mm:ss')
    values.updateTime = moment().format('YYYY-MM-DD HH:mm:ss')

    delete values.createTime
    return next();
  }

}