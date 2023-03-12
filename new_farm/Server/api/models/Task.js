/**
 * Task.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var moment = require('moment');
module.exports = {
  tableName: 't_task',
  attributes: {

    product_batches_id: {
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    content: {
      type: 'string',
      columnType: 'varchar(500)'
    },
    state: {
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    img1: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(200)'
    },
    img2: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(200)'
    },
    img3: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(200)'
    },
    img4: {
      type: 'string',
      columnType: 'varchar(200)'
    },
    producter_id: {
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    sys_user_id: {
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    farm_id: {
      type: 'number',
      allowNull: true,
      columnType: 'int'
    },
    create_time: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: '1900-01-01'
    },
    finish_date: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: '1900-01-01'
    },
    activity_date: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: '1900-01-01'
    },
    area: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },
    desc_content: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },
  },
  toJSON: function () {
    var obj = this.toObject();
    obj.createTime = moment(obj.createTime).format('YYYY-MM-DD HH:mm:ss')
    obj.updateTime = moment(obj.updateTime).format('YYYY-MM-DD HH:mm:ss')
    obj.finish_date = moment(obj.finish_date).format('YYYY-MM-DD HH:mm:ss')
    obj.activity_date = moment(obj.activity_date).format('YYYY-MM-DD HH:mm:ss')
    return obj;
  },

  beforeCreate: function (values, next) {
    if (values.finish_date != undefined) {
      values.finish_date = moment(values.finish_date).format('YYYY-MM-DD HH:mm:ss')
    }
    if (values.activity_date != undefined) {
      values.activity_date = moment(values.activity_date).format('YYYY-MM-DD HH:mm:ss')
    }
    values.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
    return next();
  },
  beforeUpdate: function (values, next) {
    values.updateTime = moment().format('YYYY-MM-DD HH:mm:ss')
    delete values.createTime
    return next();
  }

}