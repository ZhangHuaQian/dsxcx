import '@/utils/interception'
import { serverip as ip } from '@/utils/serverIP'
import axios from 'axios'
import Qs from 'qs'

export function login(data) {
  return axios({
    url: ip + '/login',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function getInfo(token) {
  return axios({
    url: ip + '/getInfo',
    method: 'post',
    data: Qs.stringify({token})
  })
}

export function logout() {
  return axios({
    url: ip + '/logout',
    method: 'post'
  })
}
