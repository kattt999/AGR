var md5 = require('md5');
const archiver = require('archiver')
const fs = require('fs')
const child = require('child_process');
const moment = require('moment')
const iconv = require('iconv-lite');

module.exports = {

    getPath: function (num, n) {
      var str = num.toString();
      var len = str.length;
      while (len < n) {
        str = '0' + str;
        len++;
      }
      return str;
    },
    backUpData: function (systemConfigs) {
      // sails.log(systemConfigs)

      // let ms = moment().format('YYYYMMDDHHmmss').toString();
      
      // // let databackforder = isDev ? process.cwd() + '/databak/' : systemConfigs[0].databackForderPath;
      // let databackforder = systemConfigs.databackForderPath;
      // let mongoBinPath = systemConfigs.mongodbInstallPath;
      // let dataPath = databackforder + ms;
      // // let cmdstr =   'mongodump -d ' + systemConfigs.dbname + ' -o "' + dataPath + '"'  
      // let cmdstr =   'mongodump  -d ' + systemConfigs.dbname + ' -o "' + dataPath + '"';

      // child.exec(`mongodump -h 127.0.0.1 -d ds_test -o D:\\database\\${ms}`, {encoding: 'buffer'}, (error , stdout, stderr) => {
      //   if (error) throw error;
      //   stdout = iconv.decode(stdout, 'gbk');
      //   stderr = iconv.decode(stderr, 'gbk');
      //   console.log(stdout);
      //   console.log(stderr);  
      // });
      // if (!fs.existsSync(databackforder)) {
      //   fs.mkdirSync(databackforder);
      // }
      // if (fs.existsSync(dataPath)) {
      //   console.log('已经创建过备份了');
      // } else {
      //   fs.mkdirSync(dataPath);
      //   console.log(cmdstr)
      //   child.exec(cmdstr, function (error, stdout, stderr) {
      //     if (error !== null) {
      //       console.log('exec error: ' + error);
      //     } else {
      //       //生成压缩文件
      //       let output = fs.createWriteStream(databackforder + ms + '.zip');
      //       let archive = archiver('zip');

      //       output.on('close', function () {
      //         console.log(archive.pointer() + ' total bytes');
      //         console.log('--数据备份成功--');
      //         console.log('archiver has been finalized and the output file descriptor has closed.'); 
      //       });

      //       output.on('end', function () {
      //         console.log('Data has been drained');
      //       });

      //       archive.on('error', function (err) {
      //         throw err;
      //       });

      //       archive.pipe(output);
      //       archive.directory(dataPath + '/', false);
      //       archive.finalize();
      //     }
      //   });
      // }
    }
  }
