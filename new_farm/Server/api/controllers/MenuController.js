/**
 * MenuController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var md5 = require('md5');
var StringUtil = require('../common/StringUtil');
var moment = require('moment');
var log = require('../util/log');
const _ = require("lodash");
module.exports = {
  find_all_menu: function (req, res) {
    log.appError(JSON.stringify(req.hsquery), req);
    Menu.query(`SELECT m.*
                            FROM   sys_menu          m,
                                sys_role_menu  AS srm,
                                sys_user_role  AS u
                            WHERE  u.role_id = srm.role_id
                                AND srm.menu_id = m.id
                                AND u.user_id = $1  
                                order by menu_type,order_num
                            `, [req.hsquery.userid], function (err, data) {
      if (err) {
        sails.log(err)
        log.appError(JSON.stringify(err), req);
        return res.json({
          code: 1,
          msg: "查询失败!",
          time_stamp: ''
        })
      }
      return res.json({
        code: 0,
        msg: "ok!",
        data: StringUtil.toTree(data.rows),
        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    });
  },
  menus: function (req, res) {
    let _qdata = StringUtil.getQueryData(req)
    Menu.find(_qdata.query).sort(_qdata.sort).exec(function (err, _data) {
      if (err) {
        log.appError(JSON.stringify(err), req);
        return res.json({
          code: 1,
          msg: "查询失败!",
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
      return res.json({
        code: 0,
        msg: "ok!",
        data: StringUtil.toTree(_data),
        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    });
  },
  query: async function (req, res) {
    let qVo = req.body
    var _data = await Menu.findOne({ id: qVo.id }).catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), req);
        return res.json({
          code: 1,
          msg: "查询失败!",
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
    });

    // var _p_data = await RoleMenu.find({ role_id: qVo.id }).catch(function (err) {
    //   log.appError(JSON.stringify(err), req);
    // })
    // _data.role_menu = _p_data.map(obj => { return obj.menu_id }).join()
    return res.json({
      code: 0,
      msg: "ok!",
      data: _data,
      time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  },
  update: function (req, res) {
    let qVo = req.body
    qVo.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    var _qVo = _.cloneDeep(qVo)
    delete _qVo.created_at
    delete _qVo.id
    Menu.update({ id: qVo.id }, _qVo).exec(function (err, _data) {
      if (err) {
        log.appError(JSON.stringify(err), req);
        return res.json({
          code: 1,
          msg: "更新失败!",
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
      return res.json({
        code: 0,
        msg: "ok!",
        data: _data,
        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    });
  },
  create: function (req, res) {
    let qVo = req.body
    qVo.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    Menu.create(qVo).exec(function (err, _data) {
      if (err) {
        log.appError(JSON.stringify(err), qVo);
        return res.json({
          code: 1,
          msg: "添加失败!",
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
      return res.json({
        code: 0,
        msg: "ok!",
        data: _data,
        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    });
  },
  delete: function (req, res) {
    let _vo = req.body
    Menu.destroy(_vo).exec(function (err, vo) {
      if (err) {
        log.appError(JSON.stringify(err), req);
        return res.json({
          code: 1,
          msg: "删除失败!",
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
      return res.json({
        code: 0,
        msg: "删除成功!",
        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    });
  },
};

