
const log = require('./log');

module.exports.broadcast_config = function (_action, _data) {
    sails.sockets.broadcast(_data.client_id, { type: 'dc_data', action: _action, data: _data });
};

module.exports.broadcast = function (_action, _data) {
    sails.sockets.broadcast('app', { type: 'dc_data', action: _action, data: _data });
};


module.exports.in = function (_data, res, req) {
    let _data1 = _data.data
    if (_data.plc == undefined) {
        WCarBinSource.find({ or: [{ SourcePlate: [_data1.SourcePlate, _data1.SourceID] }, { SourceID: [_data1.SourcePlate, _data1.SourceID] }], Source: _data1.Source, IsOut: 2 }).exec(function (err, _list) {
            if (err) {
                log.appError(JSON.stringify(err), req.body);
                return res.ok({
                    type: 'in',
                    end: 1,
                    action: 'in',
                    data: {
                        code: 100,
                        msg: '100',
                        msg_code: '100',
                        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                    }
                })
            }
            if (_list.length == 0) {
                return res.ok({
                    type: 'in',
                    end: 0,
                    action: 'in',
                    data: {
                        code: 0,
                        data: _data1,
                        msg_code: '100',
                        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                    }, redata: _data
                })
            } else {
                let _cardNo = []
                _(_list).forEach(function (value) {
                    _cardNo.push(value.CardNo)
                });
                WGaragePark.find({ CardNo: _cardNo, CarOutTime: null }).exec(function (errw, _listw) {
                    if (_listw.length == 0) {
                        return res.ok({
                            type: 'in',
                            action: 'in',
                            end: 0,
                            data: {
                                code: 0,
                                data: _data1,
                                msg_code: '100',
                                msg: "查询成功!",
                                time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                            }, redata: _data
                        })
                    } else {
                        return res.ok({
                            type: 'in',
                            action: 'in',
                            end: 1,
                            data: {
                                code: 1,
                                msg: '当前车牌已存在！',
                                msg_code: '200',
                                data: _listw,
                                time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                            }
                        })
                    }
                })
            }
        })
    } else {
        sails.log(_data)
        let qVo = _data.redata.data
        WCarBinSource.create(qVo).exec(function (err, _data) {
            if (err) {
                log.appError(JSON.stringify(err), _data);
                return res.json({
                    type: 'in',
                    action: 'in',
                    end: 1,
                    data: {
                        code: 1,
                        msg: '操作失败，数据有问题',
                        msg_code: '200',
                        time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                    }
                })
            }
            return res.json({
                type: 'in',
                action: 'in',
                end: 1,
                data: {
                    code: 0,
                    msg: "操作成功",
                    msg_code: '0',
                    data: _data,
                    time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
                }
            })
        });
    }
};