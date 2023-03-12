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
var uuid = require("node-uuid");
const _ = require("lodash");
module.exports = {
  getkey: async function (req, res) {
    let qVo = req.body
    sails.log(qVo)
    if (qVo.timestamp != undefined && qVo.data != undefined && qVo.data.nbid != undefined && qVo.sign != undefined) {
      sails.log(md5("timestamp" + qVo.timestamp + "nbid" + qVo.data.nbid))
      if (md5("timestamp" + qVo.timestamp + "nbid" + qVo.data.nbid) === qVo.sign) {
        let _vo = {
          nbid: qVo.data.nbid
        }
        StallNb.findOne(_vo).exec(function (err, _data) {
          if (err) {
            log.appError(JSON.stringify(err), qVo);
            return res.json({
              code: 1,
              msg: "查询失败!"
            })
          }
          if (_data != undefined) {
            return res.json({
              code: 0,
              msg: "ok",
              data: {
                nbid: _data.nbid,
                nbkey: _data.nbkey
              }
            })
          } else {
            return res.json({
              code: 1,
              msg: "查询失败!"
            })
          }

        });
      } else {
        return res.json({
          code: 1,
          msg: "签名错误"
        })
      }
    } else {
      return res.json({
        code: 1,
        msg: "数据错误"
      })
    }
  },
  check: function (req, res) {
    let qVo = req.body
    sails.log(qVo)
    sails.log(md5("timestamp" + qVo.timestamp + "nbid" + qVo.data.nbid))
    if (qVo.timestamp != undefined && qVo.data != undefined && qVo.data.nbid != undefined && qVo.sign != undefined) {
      if (md5("timestamp" + qVo.timestamp + "nbid" + qVo.data.nbid) === qVo.sign) {
        let _vo = {
          nbid: qVo.data.nbid
        }
        sails.log(_vo)
        StallNb.findOne(_vo).exec(function (err, _data) {
          sails.log(_data)
          if (err) {
            log.appError(JSON.stringify(err), qVo);
            return res.json({
              code: 1,
              msg: "添加失败!"
            })
          }
          if (_data == undefined) {
            _vo.nbkey = uuid.v1().replace(/\-/g, "")
            _vo.httpUrl = 'http://lot.szwchy.net'
            _vo.mqttUrl = 'mqtt://mqtt.szwchy.net'
            _vo.status = 1
            StallNb.create(_vo).exec(function (err, _data) {
              if (err) {
                log.appError(JSON.stringify(err), qVo);
                return res.json({
                  code: 1,
                  msg: "添加失败!"
                })
              }
              return res.json({
                code: 0,
                msg: "ok!"
              })
            });
          } else {

            return res.json({
              code: 0,
              msg: "ok"
            })
          }
        });
      } else {
        return res.json({
          code: 1,
          msg: "签名错误"
        })
      }
    } else {
      return res.json({
        code: 1,
        msg: "数据错误"
      })
    }
  }
};

