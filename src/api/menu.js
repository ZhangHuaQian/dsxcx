import { serverip as ip } from '@/utils/serverIP'
import axios from 'axios'
import Cookies from 'js-cookie'

export function menuList() {
  axios.defaults.headers.common['token'] = Cookies.get('vue_admin_shop_token')
  const user = {
    id: Cookies.get('vue_admin_shop_userID')
  }
  return axios({
    url: ip + '/sys/menuList',
    method: 'post',
    data: user
  })
}
