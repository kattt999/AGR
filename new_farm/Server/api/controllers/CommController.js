/**
 * CommController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var md5 = require('md5');
var StringUtil = require('../common/StringUtil');
var moment = require('moment');
var log = require('../util/log');
const _ = require("lodash");
module.exports = {
  index: function (req, res) {
    let _qdata = StringUtil.getQueryData(req)
    return res.send(
      moment().format('X'))
  },
};

