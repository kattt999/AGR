var jwt = require('jwt-simple'); 
var moment = require('moment');
var log = require('../util/log');
var StringUtil = require('../common/StringUtil');
module.exports = function (req, res, next) {
  var token = req.headers["authorization"];
  var _vo = {}
  _vo.ip = StringUtil.getIp(req)
  _vo.logUrl = req.url;
  _vo.logType = 'Auth';
  _vo.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
  _vo.parameter = JSON.stringify(req.body);   
  sails.log(req.body)
  if (token) {
    try {
      var decoded = jwt.decode(token, sails.config.system.WebTokenSecret);
      if (decoded.exp <= Date.now()) {
        _vo.logText = 'token值已过期.'
        // WebLog.create(_vo).exec(function (err, list) {
        //   if (err) {
        //     log.error(JSON.stringify(err));
        //   }
        // });
        return res.json({
          "code": 50014,
          time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        });
      }
      // if (req.body == undefined) {
      //   req.body = {}
      // }

      var _userVo = {
        id: decoded.iss, 
        sip: _vo.ip,
        userid: decoded.userId
      }
      sails.log(_userVo)
      req['hsquery'] = _userVo  
      // _vo.logText = '通过验证.'
      // _vo.operator = decoded.iss
      // WebLog.create(_vo).exec(function (err, list) {
      //   if (err) {
      //     log.error(JSON.stringify(err));
      //   }
      // });
      return next()
    } catch (err) {
      _vo.logText = JSON.stringify(err);
      log.appError(JSON.stringify(err), req);
      return res.json({
        code: 50008,
        msg: '验证失败.'
      });
    }
  } else {
    _vo.logText = '数据有问题.'
    log.info("headers数据");
    log.appError(JSON.stringify(req.headers), req);
    // WebLog.create(_vo).exec(function (err, list) {
    //   if (err) {
    //     log.error(JSON.stringify(err));
    //   }
    // });
    return res.json({
      code: 50008,
      msg: '数据有问题.'
    });
  }
};
