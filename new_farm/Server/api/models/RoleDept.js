/**
 * UserDept.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'sys_role_dept',
  attributes: {
    role_id: {
      type: 'number',
      columnType: 'int'
    },
    dept_id: {
      type: 'number',
      columnType: 'int'
    }
  }

}