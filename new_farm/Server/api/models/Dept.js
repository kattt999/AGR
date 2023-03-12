/**
 * Dept.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'sys_dept', 
  attributes: { 
    dept_name: {
      type: 'string',
      columnType: 'varchar(50)'
    },
    parent_id: {
      type: 'number',
      columnType: 'int'
    },
    order_num: {
      type: 'number',
      columnType: 'int'
    },
    ancestors: {
      type: 'string',
      columnType: 'varchar(50)'
    },
    leader: {
      type: 'string',
      columnType: 'varchar(20)'
    },
    phone: {
      type: 'string',
      columnType: 'varchar(11)'
    },
    email: {
      type: 'string',
      columnType: 'varchar(100)',
      allowNull: true,
      defaultsTo: ''
    },
    status: {
      type: 'number',
      columnType: 'int'
    },
    del_flag: {
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
  }
}