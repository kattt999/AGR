export default ({ request }) => ({
  /**
   * @description 字典列表
   * @description http://yapi.xiya.vip/project/11/interface/api/75
   */
  MEMBER_ALL (query = {}) {
    return request({
      url: '/api/member/index',
      method: 'post',
      data: query
    })
  }, 
})
