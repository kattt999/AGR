/**
 * Created by H.
 */
var jwt = require('jwt-simple');
var uuid = require('node-uuid');
var moment = require('moment');
var md5 = require('md5')
var log = require('../util/log');
module.exports = function (req, res, next) {

  var _token = req.headers["token"];
  // sails.log(_token)
  // sails.log(token)
  var _vo = {}
  _vo.ip = req.header('x-forwarded-for')
  try {
    // req.body.sip = _vo.ip
  } catch (error) {
    
  }
 
  _vo.logUrl = req.url
  _vo.logType = 'CsAuth'
  _vo.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  _vo.parameter = JSON.stringify(req.body) 
  // if (token && _token) {
  try {
    var decoded = jwt.decode(_token, sails.config.system.AppTokenSecret); 
    // sails.log(decoded)
    if (decoded.exp <= Date.now()) {
      _vo.logText = 'token值已过期.' 
      CsLog.create(_vo).exec(function (err, list) {
        if (err) {
          log.error(JSON.stringify(err));
        }
      });
      return res.json({
        code: 900,
        msg: _vo.logText
      });
    }
    _vo.logText = '通过验证.'
    _vo.operator = decoded.iss 
    // if (!req.body.parkCode || req.body.parkCode === undefined || req.body.parkCode !== decoded.iss) {
    //   return res.json({
    //     code: 901,
    //     msg: '身份有问题'
    //   });
    // }
    // sails.log(_vo)
    var _userVo = {
      username:decoded.iss,
      role: decoded.role,
      sip : _vo.ip
    }
    req['hsquery'] = _userVo
    // sails.log(_vo)
    // CsLog.create(_vo).exec(function (err, list) {
    //   if (err) {
    //     log.error(JSON.stringify(err));
    //   }
    // });
    return next()
  } catch (err) {
    // sails.log(err)
    _vo.logText = JSON.stringify(err)
    CsLog.create(_vo).exec(function (err, list) {
      if (err) {
        log.error(JSON.stringify(err));
      }
    });
    return res.json({
      code: 902,
      msg: '验证失败.'
    });
  }

  // } else {
  //   _vo.logText = ''
  //   CsLog.create(_vo).exec(function (err, list) {
  //     if (err) {
  //       log.error(JSON.stringify(err));
  //     }
  //   });
  //   return next()
  // return res.json({
  //   code: 903,
  //   msg: _vo.logText
  // });
  // }
};
