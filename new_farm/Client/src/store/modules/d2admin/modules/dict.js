import { throttle } from 'lodash'
import api from '@/api'
import utils from '@/utils'
import env from '@/env'

const doFetch = throttle(async function ({ state, commit }) {
  const names = Array.from(new Set(state.fetchList))
  commit('fetchListClean')
  const dictsData = await Promise.all(names.map(name => api.DICTDATA_ALL({
    page_size: 9999,
    dict_type: name
  }))) 
  dictsData.forEach((dictDataSource, dictDataIndex) => {
    const dictName = names[dictDataIndex]
    let dictData = []
    if (dictDataSource.list.length > 0) {
      let _ff = utils.cookies.get('lang') || env.VUE_APP_I18N_LOCALE
      if (_ff === 'zh-chs') {
        dictData = dictDataSource.list.map(e => ({
          label: e.dict_label,
          value: e[dictDataSource.list[0].dict_value === '' ? 'dict_number' : 'dict_value']
        }))
      } else {
        dictData = dictDataSource.list.map(e => ({
          label: e.dict_label_en,
          value: e[dictDataSource.list[0].dict_value === '' ? 'dict_number' : 'dict_value']
        }))
      }
      
    }
    commit('set', {
      name: dictName,
      value: dictData
    })
  })
}, 1000, {
  leading: false
})

export default context => ({
  namespaced: true,
  state: {
    // 字典数据
    dicts: [],
    // 请求队列
    fetchList: []
  },
  actions: {
    /**
     * @description 获取字典
     * @param {Object} vuex context
     * @param {String} name 字典名称
     */
    get ({ state }, name) {
      const dict = state.dicts.find(e => e.name === name)
      return (dict && dict.value) || []
    },
    /**
     * @description 加载一个字典
     * @param {Object} vuex context
     * @param {String} name 字典名称
     */
    fetch (payload, name = '') {
      payload.commit('fetchListPush', name)
      doFetch(payload)
    }
  },
  mutations: {
    /**
     * @description 设置字典
     * @param {Object} vuex context
     * @param {Object} payload {String} name 字典名称
     * @param {Object} payload {Array} value 字典数据
     */
    set (state, { name = '', value = [] } = {}) {
      const dictIndex = state.dicts.findIndex(e => e.name === name)
      if (dictIndex < 0) {
        state.dicts.push({ name, value })
      } else {
        state.dicts.splice(dictIndex, 1, { name, value })
      }
    },
    fetchListPush (state, item) {
      state.fetchList.push(item)
    },
    fetchListClean (state) {
      state.fetchList = []
    }
  }
})
