/**
 * UserPost.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'sys_user_post',
  attributes: {
    user_id: {
      type: 'number',
      columnType: 'int'
    },
    post_id: {
      type: 'number',
      columnType: 'int'
    }
  }

}