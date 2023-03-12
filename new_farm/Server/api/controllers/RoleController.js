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
  index: function (req, res) {
    let _qdata = StringUtil.getQueryData(req)
    Role.find(_qdata.query).sort(_qdata.sort).exec(function (err, _data) {
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
        data: {
          "page": {
            "page_no": 1,
            "page_size": 9999,
            "tatal_page": 1,
            "tatal_count": _data.length,
            "is_first_page": true,
            "is_last_page": true
          },
          list: _data
        },
        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    });
  },
  query: async function (req, res) {
    let qVo = req.body
    var _data = await Role.findOne({ id: qVo.id }).catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), req);
        return res.json({
          code: 1,
          msg: "查询失败!",
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
    });

    var _p_data = await RoleMenu.find({ role_id: qVo.id }).catch(function (err) {
      log.appError(JSON.stringify(err), req);
    })
    _data.role_menu = _p_data.map(obj => { return obj.menu_id; }).join();
    var _d_data = await RoleDept.find({ role_id: qVo.id }).catch(function (err) {
      log.appError(JSON.stringify(err), req);
    })
    _data.role_dept = _d_data.map(obj => { return obj.dept_id; }).join();
    return res.json({
      code: 0,
      msg: "ok!",
      data: _data,
      time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  },
  update: async function (req, res) {
    let qVo = req.body
    qVo.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    var _qVo = _.cloneDeep(qVo)
    delete _qVo.id
    delete _qVo.role_menu
    delete _qVo.role_dept
    delete _qVo.created_at
    delete _qVo.updated_at
    var _data = await Role.update({ id: qVo.id }, _qVo).fetch().catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), req);
        return res.json({
          code: 1,
          msg: "更新失败!",
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
    });

    let _menu_arr = _.split(qVo.role_menu, ',')
    let _menu_list = []
    _(_menu_arr).forEach(function (value) {
      _menu_list.push({ menu_id: value, role_id: qVo.id })
    });
    await RoleMenu.destroy({ role_id: qVo.id }).fetch().catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), req);
      }
    });
    await RoleMenu.createEach(_menu_list).fetch().catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), req);
      }
    });

    let _dept_arr = _.split(qVo.role_dept, ',')
    let _dept_list = []
    _(_dept_arr).forEach(function (value) {
      _dept_list.push({ dept_id: value, role_id: qVo.id })
    });
    await RoleDept.destroy({ role_id: qVo.id }).fetch().catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), req);
      }
    });
    await RoleDept.createEach(_dept_list).fetch().catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), req);
      }
    });

    return res.json({
      code: 0,
      msg: "ok!",
      data: _data,
      time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  },
  create: async function (req, res) {
    let qVo = req.body
    qVo.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    let _qVo = _.cloneDeep(qVo)
    delete _qVo.role_menu
    var _data = await Role.create(_qVo).fetch().catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), _qVo);
        return res.json({
          code: 1,
          msg: "添加失败!",
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
    });
    let _menu_arr = _.split(qVo.role_menu, ',')
    let _menu_list = []
    _(_menu_arr).forEach(function (value) {
      _menu_list.push({ menu_id: value, role_id: _data.id })
    });
    await RoleMenu.createEach(_menu_list).fetch().catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), req);
      }
    });
    let _dept_arr = _.split(qVo.role_dept, ',')
    let _dept_list = []
    _(_dept_arr).forEach(function (value) {
      _dept_list.push({ dept_id: value, role_id: qVo.id })
    });
    await RoleDept.createEach(_dept_list).fetch().catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), req);
      }
    });
    log.info(_data);
    return res.json({
      code: 0,
      msg: "ok!",
      data: _data,
      time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  },
  delete: async function (req, res) {
    let _vo = req.body;
    var _data = await Role.destroy(_vo).fetch().catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), req);
        return res.json({
          code: 1,
          msg: "删除失败!",
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
    });
    await RoleMenu.destroy({ role_id: _vo.id }).fetch().catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), req);
      }
    });
    return res.json({
      code: 0,
      msg: "删除成功!",
      time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  },

};

