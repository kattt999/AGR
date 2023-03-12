/**
 * DictData.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'sys_dict_data', 
  attributes: {
    dict_id: {
      type: 'number',
      columnType: 'int'
    },
    dict_code: {
      type: 'number',
      allowNull: false,
      columnType: 'int'
    },
    dict_sort: {
      type: 'number',
      columnType: 'int'
    },
    dict_label: {
      type: 'string',
      columnType: 'varchar(100)'
    },
    dict_label_en: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(100)'
    },
    dict_value: {
      type: 'string',
      columnType: 'varchar(100)'
    },
    dict_number: {
      type: 'number',
      columnType: 'int'
    },
    dict_type: {
      type: 'string',
      columnType: 'varchar(100)'
    },
    dict_value_type: {
      type: 'number',
      columnType: 'int'
    },
    css_class: {
      type: 'string',
      columnType: 'varchar(100)',
      allowNull: true,
      defaultsTo: ''
    },
    list_class: {
      type: 'string',
      columnType: 'varchar(100)',
      allowNull: true,
      defaultsTo: ''
    },
    is_default: {
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
    update_at: {
      type: 'ref',
      columnType: 'datetime' ,
      defaultsTo: '1900-01-01'
    },
    remark: {
      type: 'string',
      allowNull: true,
      defaultsTo: ''
    }
  }

}