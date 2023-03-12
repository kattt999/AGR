/*
 * @Author: H
 * @Date: 2017-08-31 14:23:46
 * @Last Modified by:   H
 * @Last Modified time: 2017-08-31 14:23:46
 */
const log4js = require("log4js");
var jwt = require("jwt-simple");
var uuid = require("node-uuid");
var moment = require("moment");
var fs = require("fs"); 
log4js.configure({
  appenders: {
    debug: {
      type: "dateFile",
      filename: "log/log",
      pattern: "-yyyy-MM-dd.log",
      alwaysIncludePattern: true
    },
    web: {
      type: "dateFile",
      filename: "log/logWeb",
      pattern: "-yyyy-MM-dd.log",
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: ["debug"], level: "debug" },
    web: { appenders: ["web"], level: "debug" }
  }
});
var log = log4js.getLogger();
var logWeb = log4js.getLogger("web");

module.exports.debug = function (_val) {
  log.debug(_val);
};

module.exports.info = function (_val) {
  log.info(_val);
};

module.exports.warn = function (_val) {
  log.warn(_val);
};

module.exports.error = function (_val, req) {
  sails.log(_val)
  log.error(_val);
};

module.exports.csError = function (_val, req) {
  log.error(_val);
  if (req) {
    var log_vo = {};
    log_vo.logId = uuid.v1().replace(/\-/g, "");
    if (req.header) {
      log_vo.ip = req.header("x-forwarded-for");
    }
    log_vo.logUrl = req.url;
    log_vo.logType = "CsAuth";
    log_vo.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    log_vo.parameter = JSON.stringify(req.body);
    log_vo.err = _val;
    CsLog.create(log_vo).exec(function (err, list) {
      log.error(JSON.stringify(err));
    });
  }
};

module.exports.appError = function (_val, req) {
  log.error(_val);
  sails.log(_val)
  if (req) {
    var log_vo = {};
    log_vo.logId = uuid.v1().replace(/\-/g, "");

    if (req.header) {
      log_vo.ip = req.header("x-forwarded-for");
    }
    log_vo.logUrl = req.url;
    log_vo.logType = "App";
    log_vo.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    log_vo.parameter = JSON.stringify(req.body);
    log_vo.err = _val;

    // AppLog.create(log_vo).exec(function (err, list) {
    //     log.error(JSON.stringify(err));
    // });
  }
};

module.exports.webError = function (_val, req) {
  log.error(_val);
  if (req) {
    var log_vo = {};
    log_vo.logId = uuid.v1().replace(/\-/g, "");
    if (req.header) {
      log_vo.ip = req.header("x-forwarded-for");
    }
    log_vo.logUrl = req.url;
    log_vo.logType = "App";
    log_vo.createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    log_vo.parameter = JSON.stringify(req.body);
    log_vo.err = _val;
    // WebLog.create(log_vo).exec(function (err, list) {
    //     log.error(JSON.stringify(err));
    // });
  }
};
module.exports.fatal = function (_val) {
  log.fatal(_val);
};

module.exports.debugWeb = function (_val) {
  logWeb.debug(_val);
};

module.exports.infoWeb = function (_val) {
  logWeb.info(_val);
};

module.exports.warnWeb = function (_val) {
  logWeb.warn(_val);
};

module.exports.errorWeb = function (_val) {
  logWeb.error(_val);
};

module.exports.fatalWeb = function (_val) {
  logWeb.fatal(_val);
};

module.exports.fatalWeb = function (_val) {
  logWeb.fatal(_val);
};

module.exports.dellogFile = function (path) {
  var files = fs.readdirSync(path);
  files.forEach(function (itm, index) {
    var stat = fs.statSync(path + itm);
    if (stat.isDirectory()) {
    } else {
      if (!moment().isBefore(moment(stat.ctime).add(2, "days"))) {
        fs.unlinkSync(path + itm);
      }
    }
  });
}