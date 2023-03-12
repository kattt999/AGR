/**
 * Role.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'sys_role1',
  attributes: {
    role_name: {
      type: 'string',
      columnType: 'varchar(30)',
    },
    role_key: {
      type: 'string',
      columnType: 'varchar(100)',
    },
    role_sort: {
      type: 'number',
      columnType: 'int'
    },
    data_scope: {
      type: 'number',
      columnType: 'int',
      defaultsTo: 1
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