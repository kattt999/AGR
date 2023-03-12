/**
 * SysUser.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'sys_user',
  attributes: {
    password: {
      type: 'string',
      columnType: 'varchar(32)'
    },
    username: {
      type: 'string',
      columnType: 'varchar(50)'
    }, 
    salt: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },
    nickname: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },   
    headImgUrl: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },
    phone: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },
    telephone: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    }, 
    email: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
    },    
    birthday: {
      type: 'ref', 
      columnType: 'date',
      defaultsTo: '1900-01-01'
    },
    sex: {
      type: 'number',
      allowNull: true,
      columnType: 'int'
    }, 
    status: {
      type: 'string',
      allowNull: true,
      columnType: 'varchar(255)'
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
    }
  }

}