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
module.exports = {
  index: function (req, res) {
    let _qdata = StringUtil.getQueryData(req)
    Post.find(_qdata.query).sort(_qdata.sort).exec(function (err, _data) {
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
            "page_size":  _qdata.limit,
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
    Post.findOne({ id: qVo.id }).exec(function (err, _data) {
      if (err) {
        log.appError(JSON.stringify(err), qVo);
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
    var _qVo = _.cloneDeep(qVo)
    delete  _qVo.created_at
    delete _qVo.id
    Post.update({ id: qVo.id }, _qVo).exec(function (err, _data) {
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
    Post.create(qVo).exec(function (err, _data) {
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
    Post.destroy(_vo).exec(function (err, vo) {
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
