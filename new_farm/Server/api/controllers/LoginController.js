/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var md5 = require('md5');
var moment = require('moment');
var log = require('../util/log');
const _ = require("lodash");
var jwt = require('jwt-simple');
var StringUtil = require('../common/StringUtil');
module.exports = {
    login: async function (req, res) {
        try {


            let qVo = req.body;
            qVo.password = md5(qVo.password);
            // log.appError(qVo);
            var _data = await User.findOne(qVo).catch(function (err) {
                if (err) {
                    // log.appError(JSON.stringify(err), req);
                    return res.json({
                        code: 1,
                        msg: "登录失败!",
                        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                    })
                }
            });
            
            // log.appError(_data);
            if (_data && _data.user_name !== undefined && _data.user_name.length > 0) {
                var expires = moment().add(5, 'days').valueOf();
                let token = jwt.encode({
                    iss: _data.user_name,
                    sub: 'HS',
                    exp: expires,
                    userId: _data.id
                },
                    sails.config.system.AppTokenSecret
                );
                return res.json({
                    "code": 0,
                    "msg": "登录成功!",
                    "data": {
                        nickname: _data.nickname,
                        token: token,
                        userId: _data.id,
                        userName: _data.user_name,
                        ds: sails.config.datastores
                    },
                    time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            } else {
                return res.json({
                    code: 1,
                    msg: "登录失败,用户口或者密码错误!",
                    time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                })
            }
        } catch (ex) {
            // log.appError(ex);
            return res.json({
                code: 1,
                msg: "登录失败,用户口或者密码错误!",
                time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
            })
        }
    },
    logout: async function (req, res) {
        let qVo = req.body;
        return res.json({
            "code": 0,
            "msg": "注销成功!",
            time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        });
    }
};

