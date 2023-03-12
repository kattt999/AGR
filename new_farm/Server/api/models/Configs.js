/**
 * Configs.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var moment = require('moment');
module.exports = {
  tableName: 'sys_configs',
  attributes: {
    config_name: {
      type: 'string',
      columnType: 'varchar(100)'
    },
    config_key: {
      type: 'string',
      columnType: 'varchar(100)'
    },
    config_value: {
      type: 'string',
      columnType: 'varchar(100)'
    },
    config_type: {
      type: 'number',
      columnType: 'int'
    },
    created_at: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: '1900-01-01'
    },
    updated_at: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: '1900-01-01'
    },
    remark: {
      type: 'string',
      columnType: 'varchar(500)',
      allowNull: true,
      defaultsTo: ''
    }
  },
  toJSON: function () {
    var obj = this.toObject();
    obj.created_at = moment(obj.created_at).format('YYYY-MM-DD HH:mm:ss')
    obj.updated_at = moment(obj.updated_at).format('YYYY-MM-DD HH:mm:ss')
    return obj;
  },
  beforeCreate: function (values, next) {
    values.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    return next();
  },
  beforeUpdate: function (values, next) {
    delete values.created_at
    values.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    return next();
  }
}