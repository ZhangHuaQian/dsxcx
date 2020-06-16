import '@/utils/interception'
import { serverip as ip } from '@/utils/serverIP'
import axios from 'axios'
import Qs from 'qs'



export function getInfoList(data) {
  return axios({
    url: ip + '/postage/selectList',
    method: 'post',

    // data: {
    //   openPage,//是否开启分页

    //   page,//分页页数
    //   limit,//分页行数
    //   form

    // }
    data:data.json?data:Qs.stringify({openPage:data.openPage,page:data.currentPage,limit:data.pageSize,form:data.form})
  })
}

export function postageAdd(data) {
  return axios({
    url: ip + '/postage/insertBatch',
    method: 'post',

    data: [{
      
      province:data.province,
      postage:data.postage,
      isFree:data.isFree,
      
    }]
  })
}
export function postageEdit(data) {
  return axios({
    url: ip + '/postage/insertBatch',
    method: 'post',

    data:[{
      
      province:data.province,
      postage:parseInt(data.postage),
      isFree:data.isFree,
      id:data.id
      
    }]
    // data: {
      
    //   province:"上海",
    //   postage:0,
    //   isFree:"1",
    //   id:data.id
      
    // }
    
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
export function postageSearch(data) {
  console.log(data,'搜索')

  return axios({
    url: ip + "/postage/selectList",
    method: 'post',
    // data: {
    //   bannerName: data,
    //   openPage
    // }
    data:data.json?data:Qs.stringify({openPage:data.openPage,province:data.province})
  })
}
