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
  index: async function (req, res) {
    let _qdata = StringUtil.getQueryData(req)
    if(_qdata.query.created_at  != undefined){
      _qdata.query.createTime = _qdata.query.created_at 
      delete _qdata.query.created_at 
    }
    sails.log(_qdata)
    Farm.count(_qdata.query).exec(function (cerr, _cdata) {
      if (cerr) {
        log.appError(JSON.stringify(cerr), req.body);
        return res.json({
          code: 1,
          msg: "查询失败!",
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      } 
      Farm.find(_qdata.query).sort(_qdata.sort).skip(_qdata.skip).limit(_qdata.limit).exec(function (err, _data) {
        if (err) {
          log.appError(JSON.stringify(err), req.body);
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
              "page_no": req.body.page,
              "page_size": _qdata.limit,
              "tatal_page": Math.ceil(_cdata / _qdata.limit),
              "tatal_count": _cdata,
              "is_first_page": req.body.page == 1 ? true : false,
              "is_last_page": Math.ceil(_cdata / _qdata.limit) === req.body.page ? true : false
            },
            list: _data
          },
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      });
    });
  },
  query: function (req, res) {
    let qVo = req.body
    Farm.findOne({ id: qVo.id }).exec(function (err, _data) {
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
    qVo.updateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    var _qVo = _.cloneDeep(qVo)
    delete _qVo.createTime
    delete _qVo.id
    Farm.update({ id: qVo.id }, _qVo).exec(function (err, _data) {
      if (err) {
        log.appError(JSON.stringify(err), req);
        return res.json({
          code: 1,
          msg: "更新失败!",

          ddd: _qVo,
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
    qVo.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
    Farm.create(qVo).exec(function (err, _data) {
      if (err) {
        log.appError(JSON.stringify(err), req);
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
    Farm.destroy(_vo).exec(function (err, vo) {
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

