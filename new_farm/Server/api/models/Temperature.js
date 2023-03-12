/**
 * Temperature.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 't_temperature',
  attributes: { 
    obtid: {
      type: 'string',
      columnType: 'varchar(10)'
    },
    t: {
      type: 'number',
      columnType: 'double'
    }, 
    farmId: {
      type: 'number',
      columnType: 'int'
    },
    ddatetime: {
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: '1900-01-01'
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