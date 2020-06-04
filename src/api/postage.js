import '@/utils/interception'
import { serverip as ip } from '@/utils/serverIP'
import axios from 'axios'
import Qs from 'qs'



export function getInfoList(openPage, limit, page, form) {
  return axios({
    url: ip + '/postage/selectList',
    method: 'post',

    data: {
      openPage,//是否开启分页

      page,//分页页数
      limit,//分页行数
      form

    }
  })
}

export function postageAdd(data) {
  return axios({
    url: ip + '/postage/insertBatch',
    method: 'post',

    data: {
      
      province:data.province,
      postage:data.postage,
      isFree:data.isFree
    }
  })
}

export function SearchInfo(openPage,input) {
  return axios({
    url: ip + '/postage/selectList',
    method: 'post',

    data: {
      
      openPage,
      province:input
    }
  })
}
