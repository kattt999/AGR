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
    check_token: async function (req, res) {
        return res.json({
            "code": 0,
            "data": {
                "user_id": 1,
                "user_name": "admin"
            },
            "msg": "success",
            "time_stamp": moment().format('YYYY-MM-DD HH:mm:ss')
        })
    },
    index: async function (req, res) {
        let _qdata = StringUtil.getQueryData(req)
        User.count(_qdata.query).exec(function (cerr, _cdata) {
            if (cerr) {
                log.appError(JSON.stringify(cerr), req.body);
                return res.json({
                    code: 1,
                    msg: "查询失败!",
                    time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                })
            }
            sails.log(_qdata)
            User.find(_qdata.query).sort(_qdata.sort).skip(_qdata.skip).limit(_qdata.limit).exec(function (err, _data) {
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
    query: async function (req, res) {
        let qVo = req.body;
        var _data = await User.findOne({ id: qVo.id }).catch(function (err) {
            if (err) {
                log.appError(JSON.stringify(err), req);
                return res.json({
                    code: 1,
                    msg: "查询失败!",
                    time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                })
            }
        })
        var _p_data = await UserPost.find({ user_id: qVo.id }).catch(function (err) {
            log.appError(JSON.stringify(err), req);
        })
        _data.user_post = _p_data.map(obj => { return obj.post_id })
        var _r_data = await UserRole.find({ user_id: qVo.id }).catch(function (err) {
            log.appError(JSON.stringify(err), req);
        })
        _data.user_role = _r_data.map(obj => { return obj.role_id })
        return res.json({
            code: 0,
            msg: "ok!",
            data: _data,
            time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })

    },
    updpwd: async function (req, res) {
        try {
            var vo = req.body;
            let qVo = {}
            qVo.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
            delete qVo.created_at
            qVo.password = md5(vo.newpassword);
            // qVo.nickname = '123';
            log.info({
                id: 1,
                // password: md5(vo.password)
            })
            log.info(req['hsquery']);
            var _dataVo = await User.findOne({ id: req['hsquery']['userid'] }).catch(function (err) {
                if (err) {
                    log.appError(JSON.stringify(err), req);
                    return res.json({
                        code: 1,
                        msg: "修改密码失败!",
                        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                    })
                }
            })
            if (_dataVo.password !== undefined && _dataVo.password === md5(vo.password)) {
                var _data = await User.update({ id: req['hsquery']['userid'] }, qVo).fetch().catch(function (err) {
                    if (err) {
                        log.appError(JSON.stringify(err), req);
                        return res.json({
                            code: 1,
                            msg: "修改密码失败!",
                            
                            ddd: _qVo,
                            time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                        })
                    }
                });
                if (_data && _data.length > 0) {
                    res.json({
                        code: 0,
                        msg: "修改密码成功",
                        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                    })
                } else {
                    return res.json({
                        code: 1,
                        msg: "修改密码失败!",
                        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                    })
                }
            } else {
                return res.json({
                    code: 1,
                    msg: "修改密码失败,原密码错误!",
                    time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                })
            }
        } catch (err) {
            log.appError(JSON.stringify(err), req);
            return res.json({
                code: 1,
                msg: '修改密码失败.'
            });
        }
    },
    update: async function (req, res) {
        let qVo = req.body
        qVo.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
        var _qVo = _.cloneDeep(qVo)
        delete _qVo.login_date
        delete _qVo.created_at
        delete _qVo.id
        delete _qVo.user_post
        delete _qVo.user_role
        var _data = await User.update({ id: qVo.id }, _qVo).fetch().catch(function (err) {
            if (err) {
                log.appError(JSON.stringify(err), req);
                return res.json({
                    code: 1,
                    msg: "更新失败!",
                    
                    ddd: _qVo,
                    time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                })
            }
        });
        await UserPost.destroy({ user_id: qVo.id }).fetch().catch(function (err) {
            if (err) {
                log.appError(JSON.stringify(err), req);
            }
        });

        await UserRole.destroy({ user_id: qVo.id }).fetch().catch(function (err) {
            if (err) {
                log.appError(JSON.stringify(err), req);
            }
        });
        if (qVo.user_post != undefined && qVo.user_post.length > 0) {
            let _post_arr = _.split(qVo.user_post, ',')
            let _post_list = []
            _(_post_arr).forEach(function (value) {
                _post_list.push({ post_id: value, user_id: qVo.id })
            });

            await UserPost.createEach(_post_list).fetch().catch(function (err) {
                if (err) {
                    log.appError(JSON.stringify(err), req);
                }
            });
        }
        if (qVo.user_role != undefined && qVo.user_role.length > 0) {
            let _role_arr = _.split(qVo.user_role, ',')
            let _role_list = []
            _(_role_arr).forEach(function (value) {
                _role_list.push({ role_id: value, user_id: qVo.id })
            });
            await UserRole.createEach(_role_list).fetch().catch(function (err) {
                if (err) {
                    log.appError(JSON.stringify(err), req);
                }
            });
        }
        return res.json({
            code: 0,
            msg: "ok!",
            data: _data,
            time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
    },
    create: async function (req, res) {
        let qVo = req.body
        let _qVo = _.cloneDeep(qVo);
        delete _qVo.user_post
        delete _qVo.user_role
        _qVo.password = md5(_qVo.password)
        _qVo.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        sails.log(_qVo)
        var _data = await User.create(_qVo).fetch().catch(function (err) {
            if (err) {
                log.appError(JSON.stringify(err), req);
                return res.json({
                    code: 1,
                    msg: "添加失败!",
                    time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                })
            }
        });
        if (qVo.user_post != undefined && qVo.user_post.length > 0) {
            let _post_arr = _.split(qVo.user_post, ',')
            let _post_list = []
            _(_post_arr).forEach(function (value) {
                _post_list.push({ post_id: value, user_id: _data.id })
            });
            if (_post_list.length > 0) {
                var _post_data = await UserPost.createEach(_post_list).fetch().catch(function (err) {
                    if (err) {
                        log.appError(JSON.stringify(err), req);
                        return res.json({
                            code: 1,
                            msg: "添加岗位失败!",
                            time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                        })
                    }
                });
            }
        }
        if (qVo.user_role != undefined && qVo.user_role.length > 0) {
            let _role_arr = _.split(qVo.user_role, ',')
            let _role_list = []
            _(_role_arr).forEach(function (value) {
                _role_list.push({ role_id: value, user_id: _data.id })
            });
            if (_role_list.length > 0) {
                var _role_data = await UserRole.createEach(_role_list).fetch().catch(function (err) {
                    if (err) {
                        log.appError(JSON.stringify(err), req);
                        return res.json({
                            code: 1,
                            msg: "添加角色失败!",
                            time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                        })
                    }
                });
            }
        }
        return res.json({
            code: 0,
            msg: "ok!",
            time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
    },
    delete: async function (req, res) {
        let _vo = req.body
        var _data = await User.destroy(_vo).fetch().catch(function (err) {
            if (err) {
                log.appError(JSON.stringify(err), req);
                return res.json({
                    code: 1,
                    msg: "删除失败!",
                    time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                })
            }
        });
        await UserRole.destroy({ user_id: _vo.id }).fetch().catch(function (err) {
            if (err) {
                log.appError(JSON.stringify(err), req);
                return res.json({
                    code: 1,
                    msg: "删除角色失败!",
                    time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                })
            }
        });
        await UserPost.destroy({ user_id: _vo.id }).fetch().catch(function (err) {
            if (err) {
                log.appError(JSON.stringify(err), req);
                return res.json({
                    code: 1,
                    msg: "删除岗位失败!",
                    time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                })
            }
        });
        return res.json({
            code: 0,
            msg: "删除成功!",
            time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
        })
    },
    upload: function (req, res) {

        req.file('avatar').upload({
            maxBytes: 10000000
        }, function whenDone(err, uploadedFiles) {
            if (err) {
                return res.serverError(err);
            }
        })
    }

};

