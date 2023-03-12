const axios = require('axios')
const _ = require('lodash') 

module.exports.get = function (reqUrl) {
  return new Promise((resolve, reject) => {
    axios({
        url: reqUrl,
        method: 'get',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
        },
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports.getHeaders = function (reqUrl, _header) {
  return new Promise((resolve, reject) => {
    axios({
        url: reqUrl,
        method: 'get',
        headers: _header
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports.postHeaders = function (reqUrl, _data, _header) {
  return new Promise((resolve, reject) => {
    axios({
        url: reqUrl,
        method: 'post',
        data: _data,
        headers: _header
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports.postHeaders1 = function (reqUrl, _data, _header) {
  return new Promise((resolve, reject) => {
    axios({
        url: reqUrl,
        method: 'post',
        data: _data,
        headers: _header,
        transformRequest: [function (data) {
          let ret = ''
          let i = 0
          for (let it in data) {
            if (i == 0) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
            } else {
              ret += '&' + encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
            }
            i++
          }
          return ret
        }]
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
module.exports.postJson = function (reqUrl, _data) {
  return new Promise((resolve, reject) => {
    axios({
        method: 'post',
        url: reqUrl,
        data: _data,
        // headers: {
        //   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36'
        // }
      }).then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
module.exports.post = function (reqUrl, _data) {
  return new Promise((resolve, reject) => {
    axios({
        method: 'post',
        url: reqUrl,
        data: _data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        transformRequest: [function (data) {
          let ret = ''
          let i = 0
          for (let it in data) {
            if (i == 0) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
            } else {
              ret += '&' + encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
            }
            i++
          }
          return ret
        }],
      }).then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}


module.exports.poste = function (reqUrl, _data) {
  return new Promise((resolve, reject) => {
    axios({
        method: 'post',
        url: reqUrl,
        data: _data,
        headers: {
          'accept': 'application/json, text/javascript, */*; q=0.01',
          'x-requested-with': 'XMLHttpRequest',
          // 'accept-encoding': 'gzip, deflate, br',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        transformRequest: [function (data) {
          let ret = ''
          let i = 0
          for (let it in data) {
            if (i == 0) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
            } else {
              ret += '&' + encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
            }
            i++
          }
          return ret
        }],
      }).then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
 


module.exports.postB = function (reqUrl, _data) {
  return new Promise((resolve, reject) => {
    axios({
        method: 'post',
        url: reqUrl,
        data: _data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          // 'Accept': '*/*',
          // 'Accept-Encoding': 'gzip, deflate, br',
          // 'Accept-Language': 'zh-CN,zh;q=0.9'
        },
        // transformRequest: [function (data) {
        //   let ret = ''
        //   let i = 0
        //   for (let it in data) {
        //     if (i == 0) {
        //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
        //     } else {

        //       ret += '&' + encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
        //     }
        //     i++
        //   }
        //   return ret
        // }],
      }).then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}





module.exports.postN = function (reqUrl, _data) {
  return new Promise((resolve, reject) => {
    axios({
        method: 'post',
        url: reqUrl,
        data: _data,
        headers: {
          'Content-Type': 'text/html; charset=UTF-8'
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
 


module.exports.postBetM = function (reqUrl, _data, _headers) {
  return new Promise((resolve, reject) => {
    axios({
        method: 'post',
        url: reqUrl,
        data: _data,
        headers: {
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'x-requested-with': 'XMLHttpRequest', 
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        transformRequest: [function (data) {
          let ret = ''
          let i = 0
          for (let it in data) {
            if (i == 0) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
            } else {
              ret += '&' + encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
            }
            i++
          }
          return ret
        }],
      }).then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
 


module.exports.ToUnicode = function (str) {
  return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
}

module.exports.ToGB2312 = function (str) {
  return unescape(str.replace(/\\u/gi, '%u'));
}


module.exports.replaceStr = function (str, s1, s2) {
  return str.replace(new RegExp(s1, "gm"), s2);
}