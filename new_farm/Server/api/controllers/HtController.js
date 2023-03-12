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
    if (_qdata.query.created_at != undefined) {
      _qdata.query.ddatetime = _qdata.query.created_at
      delete _qdata.query.created_at
    }
    var _hdata = await Humidity.find(_qdata.query).catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), req);
        return res.json({
          code: 1,
          msg: "查询失败!",
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
    });
    var _tdata = await Temperature.find(_qdata.query).catch(function (err) {
      if (err) {
        log.appError(JSON.stringify(err), req);
        return res.json({
          code: 1,
          msg: "查询失败!",
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      }
    });
    return res.json({
      code: 0,
      msg: "ok!",
      data: {
        "page": {
          "page_no": 1,
          "page_size": 9999,
          "tatal_page": 1,
          "tatal_count": 1,
          "is_first_page": true,
          "is_last_page": true
        },
        list: [{ h: _hdata, t: _tdata }]
      },
      time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
    })

  }
};

