/**
 * UserRole.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'sys_user_role',
  migrate: 'safe',
  attributes: {
    user_id: {
      type: 'number',
      columnType: 'int'
    },
    role_id: {
      type: 'number',
      columnType: 'int'
    }
  }

}