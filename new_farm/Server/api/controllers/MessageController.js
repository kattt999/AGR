const _ = require("lodash");
const log = require('../util/log');
var md5 = require('md5');
var StringUtil = require('../common/StringUtil');
var moment = require('moment');
var wcdata = require('../util/wcdata');
module.exports = {
	index: function (req, res, next) {
		// sails.log(req.isSocket)
		// sails.log(req.body)
		// sails.log(req.ip)
		// sails.log(req.ips)

		if (!req.isSocket) { return res.badRequest(); }
		let _data = req.body
		if (_data.action != undefined && _data.action === 'setName') {
			req.socket.clientid = _data.clientid
			sails.sockets.join(req.socket, 'app')
			sails.sockets.join(req.socket, _data.clientid)
			let _ip = _.replace(req.ip, '::ffff:', '')
			let _vo = {
				client_id: _data.clientid,
				mqttname: _data.mqttname,
				ip: _ip,
				dc_status: 1,
				ttype: 1,
				in_confirm: 2,
				payment: 2,
				is_in: 1,
				is_out: 1,
				is_queue: 1
			}
			sails.sockets.broadcast('app', { type: 'dc_data', action: 'access', data: global.access });
			sails.sockets.broadcast('app', { type: 'dc_data', action: 'config', data: global.config });
			DCTerminal.findOne({
				client_id: _vo.client_id
			}).exec(function (err, list) {
				if (err) {
					log.appError(JSON.stringify(err), req);
				} else {
					if (list === undefined || list.client_id === undefined) {
						DCTerminal.create(_vo).exec(function (_err, _data) {
							sails.log(_data)
							if (_err) {
								log.appError(JSON.stringify(_err), req);
							}
						});
					} else {
						DCTerminal.update({ id: list.id }, { ip: _ip }).exec(function (_err, _data) {
							sails.log(_data)
							if (err) {
								log.appError(JSON.stringify(_err), req);
							}
							return res.ok({ type: 'dc_data', action: 'sys_config', data: list });
						});
					}
				}
			});
		} else if (req.socket.clientid == undefined || req.socket.clientid == '') {
			return res.ok({ action: 'getName' });
		} else if (_data.action != undefined && _data.action === 'heartbeat') {
			if (global.terminal == undefined) {
				global.terminal = {}
			}
			global.terminal[req.socket.clientid] = moment().format('YYYY-MM-DD HH:mm:ss')

			return res.ok({ action: 'heartbeat' });
		} else if (_data.action != undefined && _data.action === 'in') {

			// wcdata.in(_data, res, req)
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
		} else if (_data.action != undefined && _data.action === 'out') {

			return res.ok({ action: 'out' });
		} else if (_data.action != undefined && _data.action === 'getid') {
			HsData.query(' SELECT MAX(cardno) from  tblgaragepark where   CarOutTime is null', [], function (err, rawResult) {
				if (err) { return res.serverError(err); }
				sails.log(rawResult);
				return res.ok({ action: 'getid', data: rawResult });
			});
		} else if (_data.action != undefined && _data.action === 'sync') {
			sails.log(_data)
			WGarageInfo.findOne({
				GarageIndex: _data.data.GarageIndex,
				ParkNo: _data.data.ParkNo
			}).exec(function (err, list) {
				if (err) {
					log.appError(JSON.stringify(err), req);
				} else {
					if (list) {
						sails.log(list)
						WCarBinSource.findOne({
							CardNo: _data.data.CardNo, IsOut: 2
						}).exec(function (err1, list1) {
							if (err1) {
								log.appError(JSON.stringify(err1), req);
							} else {
								if (list1) {
									let _parK_vo = {
										PlateNo: list1.SourcePlate,
										GarageInfoID: list.GarageIndex, 
										CardNo: list1.CardNo
									}
									WGaragePark.findOne({										
										GarageInfoID: list.GarageIndex,
										CardNo: list1.CardNo
									}).exec(function (errp, listp) {
										if (errp) {
											sails.log(errp)
											log.appError(JSON.stringify(errp), req);
										} else { 
											if (!listp) {
												WGaragePark.create(_parK_vo).exec(function (err, _data) {
													if (err) {
														log.appError(JSON.stringify(err), _data);
													}
													return res.json({
														code: 0,
														msg: "操作成功",
														msg_code: '0',
														data: _data,
														time_stamp: moment().format('YYYY-MM-DD HH:mm:ss')
													})
												});
											}
										}
									});
								}
							}
						})
					}
				}
			})
		} else {
			sails.log(req.socket.clientid)
			// if (req.socket.clientid == undefined || req.socket.clientid == '') {
			// 	return res.ok({ action: 'getName' });
			// }
			// if (global.terminal == undefined) {
			// 	global.terminal = {}
			// }
			// global.terminal[req.socket.clientid] = moment().format('YYYY-MM-DD HH:mm:ss')

			// sails.log(sails.sockets)
			var msg = "test这是测试消息1^_^" + Math.random();
			// sails.sockets.broadcast('10.120.120.53', 'test', { msg: msg });

			// sails.sockets.broadcast('funSockets', 'message', { msg: msg });

			// sails.sockets.blast('test', { msg: msg });
			return res.ok({ msg: msg });
		}
	}
};