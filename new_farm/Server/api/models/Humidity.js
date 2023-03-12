/**
 * Humidity.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 't_humidity',
  attributes: { 
    obtid: {
      type: 'string',
      columnType: 'varchar(10)'
    },
    h: {
      type: 'number',
      columnType: 'int'
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