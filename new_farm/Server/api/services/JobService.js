var moment = require("moment");
var schedule = require("node-schedule");
const _ = require("lodash");
var DataUtil = require("../common/DataUtil");
var log = require("../util/log");
const urlParse = require("url-parse");
var _start_time = moment('2019-12-01').format("YYYY-MM-DD HH:mm:ss");
const path = require("path");




module.exports = {
  /**
   * 初始化定时器
   * @param name
   * @param cron
   * @param disabled
   */
  init: function () {
    setTimeout(() => {
      var rule1 = new schedule.RecurrenceRule();
      var times1 = [1, 31];
      rule1.second = times1;
      schedule.scheduleJob(rule1, function () {
      })


      try {
        sails.log(path.resolve())
        let _data_file = path.join(path.resolve(), "./log/");
        log.dellogFile(_data_file);
      } catch {

      }
    })
  }
}
