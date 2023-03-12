/**
 * DictType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'sys_dict_type',
  attributes: {
    dict_name: {
      type: 'string',
      columnType: 'varchar(100)'
    },
    dict_name_en: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(100)'
    },
    dict_type: {
      type: 'string',
      columnType: 'varchar(100)'
    },
    dict_value_type: {
      type: 'number',
      columnType: 'int'
    },
    status: {
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