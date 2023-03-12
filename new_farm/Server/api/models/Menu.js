/**
 * Menu.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'sys_menu',
  attributes: {
    menu_name: {
      type: 'string',
      allowNull: false,
      columnType: 'varchar(50)'
    },
    menu_name_en: {
      type: 'string',
      allowNull: true,
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
    url: {
      type: 'string',
      columnType: 'varchar(200)',
      allowNull: true,
      defaultsTo: ''
    },
    menu_type: {
      type: 'number',
      columnType: 'int'
    },
    visible: {
      type: 'number',
      columnType: 'int'
    },
    perms: {
      type: 'string',
      columnType: 'varchar(100)',
      allowNull: true,
      defaultsTo: ''
    },
    is_frame: {
      type: 'number',
      columnType: 'int'
    },
    component: {
      type: 'string',
      columnType: 'varchar(100)'
    },
    icon: {
      type: 'string',
      columnType: 'varchar(100)',
      allowNull: true,
      defaultsTo: ''
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
    },
    route_name: {
      type: 'string',
      columnType: 'varchar(100)',
      allowNull: true,
      defaultsTo: ''
    },
    route_path: {
      type: 'string',
      columnType: 'varchar(100)',
      allowNull: true,
      defaultsTo: ''
    },
    route_cache: {
      type: 'number',
      columnType: 'int'
    },
    route_component: {
      type: 'string',
      columnType: 'varchar(100)',
      allowNull: true,
      defaultsTo: ''
    },
  }

}