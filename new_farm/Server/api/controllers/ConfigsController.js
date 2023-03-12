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
    Configs.find(_qdata.query).sort(_qdata.sort).exec(function (err, _data) {
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
  query: function (req, res) {
    let qVo = req.body
    Configs.findOne({ id: qVo.id }).exec(function (err, _data) {
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
        data: _data,
        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    });
  },

  update: function (req, res) {
    let qVo = req.body
    qVo.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
    delete qVo.created_at
    var _qVo = _.cloneDeep(qVo)
    delete _qVo.id
    Configs.update({ id: qVo.id }, _qVo).exec(function (err, _data) {
      sails.log(err)
      sails.log(_data)
      if (err) {
        log.appError(JSON.stringify(err), req);
        return res.json({
          code: 1,
          msg: "更新失败!",
          ddd: _qVo,
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
      Configs.find({}).exec(function (err, _data1) {
        let __data = []
        _(_data1).forEach(function (value) {
          __data[value.config_key] = value.config_value
        });
        global.config = __data
        sails.sockets.broadcast('app', { type: 'dc_data', action: 'config', data: __data });
      })
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
    Configs.create(qVo).exec(function (err, _data) {
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
        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    });
  },
};

