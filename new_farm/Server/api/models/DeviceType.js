/**
 * DeviceType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var moment = require('moment');
module.exports = {
  tableName: 't_device_type',
  attributes: {
    name: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    description: {
      type: 'string',
      columnType: 'varchar(1000)'
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
  }

}