/**
 * Device.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 't_cropland',
  attributes: {
    sn: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    linkman: {
      type: 'string',
      columnType: 'varchar(30)'
    },    
    area: {
      type: 'number',
      columnType: 'float'
    },
    farmId: {
      type: 'number',
      columnType: 'int'
    },
    location: {
      type: 'string',
      columnType: 'varchar(255)'
    },
    mainCrop: {
      type: 'string',
      columnType: 'varchar(50)'
    },   
    // userId: {
    //   type: 'number',
    //   columnType: 'int'
    // },   
    createTime: {
      type: 'ref',
      columnType: 'datetime', 
      defaultsTo: '1900-01-01'
    },
    updateTime: {
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