import axios from 'axios'
import Cookies from 'js-cookie'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { serverip as ip } from '@/utils/serverIP'

axios.interceptors.request.use(
  config => {
    if (Cookies.get('vue_admin_shop_token')) {
      config.headers['token'] = Cookies.get('vue_admin_shop_token')
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    // 拦截响应，做统一处理
    if (response.status) {
      switch (response.status) {
        case 200:
          if (checkUrl(response.config.url)) {
            var results = response.data
            if (results.status === '1') {
              Message.success(results.msg)
            } else {
              Message.error(results.msg)
            }
          }
          break
        case 401:
          MessageBox.confirm('登录信息失效！请重新登录！', '确认登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
          return Promise.reject(new Error(response.message || 'Error'))
      }
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

function checkUrl(url) {
  const jiekou = url.replace(ip, '')
  if (jiekou.indexOf('select') > -1 || jiekou.indexOf('getInfo') > -1) {
    return false
  } else {
    return true
  }
}
