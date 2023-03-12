/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'sys_user1',
  attributes: {
    nickname: {
      type: 'string',
      columnType: 'varchar(30)',
      allowNull: true
    },
    user_name: {
      type: 'string',
      columnType: 'varchar(30)'
    },
    user_type: {
      type: 'number',
      columnType: 'int'
    },
    dept_id: {
      type: 'number',
      columnType: 'int'
    },
    email: {
      type: 'string',
      columnType: 'varchar(50)',
      defaultsTo: '',
      allowNull: true
    },
    phone: {
      type: 'string',
      columnType: 'varchar(12)',
      allowNull: true,
      defaultsTo: ''
    },
    phonenumber: {
      type: 'string',
      columnType: 'varchar(11)',
      allowNull: true,
      defaultsTo: ''
    },
    sex: {
      type: 'number',
      columnType: 'int',
      defaultsTo: 2
    },
    avatar: {
      type: 'string',
      columnType: 'varchar(100)',
      allowNull: true,
      defaultsTo: ''
    },
    password: {
      type: 'string',
      columnType: 'varchar(50)'
    },
    salt: {
      type: 'string',
      columnType: 'varchar(20)',
      allowNull: true,
      defaultsTo: ''
    },
    status: {
      type: 'number',
      columnType: 'int',
      defaultsTo: 1
    },
    del_flag: {
      type: 'number',
      columnType: 'int',
      allowNull: true,
      defaultsTo: 1
    },
    login_ip: {
      type: 'string',
      columnType: 'varchar(30)',
      allowNull: true,
      defaultsTo: ''
    },
    login_date: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: '1900-01-01'
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
      // allowNull: true
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
    delete obj.password;
    return obj;
  }

}