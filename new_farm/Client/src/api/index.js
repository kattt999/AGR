/* eslint-disable no-prototype-builtins */
import { request } from './service'
// import { request } from '@/plugin/axios'

const files = require.context('./modules', false, /\.js$/)
const apiGenerators = files.keys().map(key => files(key).default)

const api = {}
apiGenerators.forEach(generator => {
  const apiInstance = generator({
    request
  })
  for (const apiName in apiInstance) {
    if (apiInstance.hasOwnProperty(apiName)) {
      api[apiName] = apiInstance[apiName]
    }
  }
})

export default api
