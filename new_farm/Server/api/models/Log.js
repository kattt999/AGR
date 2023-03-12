/**
 * Log.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'sys_admin_log',
  attributes: {
    route: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    method: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    description: {
      type: 'string',
      columnType: 'varchar(500)'
    },
    user_id: {
      type: 'number',
      columnType: 'int'
    },
    ip: {
      type: 'string',
      columnType: 'varchar(20)',
      allowNull: true,
      defaultsTo: ''
    },
    created_at: {
      type: 'ref',
      columnType: 'datetime'
    },
    updated_at: {
      type: 'ref',
      columnType: 'datetime'
    }
  }

}