import '@/utils/interception'
import { serverip as ip } from '@/utils/serverIP'
import axios from 'axios'
import Qs from 'qs'
// axios.defaults.headers.common['token'] = Cookies.get('vue_admin_shop_token')

export function getList(name, data, jiekou) {
  if (!jiekou) {
    jiekou = '/selectList'
  }
  return axios({
    url: ip + name + jiekou,
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function insert(name, form, jiekou) {
  if (!jiekou) {
    jiekou = '/insert'
  }
  return axios({
    url: ip + name + jiekou,
    method: 'post',
    data: form.json?form:Qs.stringify(form)
  })
}

export function update(name, data, jiekou) {
  if (!jiekou) {
    jiekou = '/update'
  }
  return axios({
    url: ip + name + jiekou,
    method: 'post',
    data: data.json?data:Qs.stringify(data)
  })
}

export function select(name, data, jiekou) {
  if (!jiekou) {
    jiekou = '/select'
  }
  return axios({
    url: ip + name + jiekou,
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function Delete(name, id, jiekou) {
  if (!jiekou) {
    jiekou = '/delete'
  }
  return axios({
    url: ip + name + jiekou,
    method: 'post',
    data: Qs.stringify({ id })
  })
}

export function downloadFiles(url) {
  return axios({
    url: url,
    method: 'get',
    responseType: 'blob'
  })
}
