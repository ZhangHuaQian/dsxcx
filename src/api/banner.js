import '@/utils/interception'
import { serverip as ip } from '@/utils/serverIP'
import axios from 'axios'
import Qs from 'qs'

// axios.defaults.headers.common['token'] = Cookies.get('vue_admin_shop_token')

// export function getList(data) {
// //   if (!jiekou) {
// //     jiekou = '/selectList'
// //   }
//   return axios({
//     url: ip+"/banner/selectList",
//     method: 'post',
//     data: data
//   })
// }

export function getInfoList(data) {
  return axios({
    url: ip + '/banner/selectList',
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

// export function getInfoListPage(data) {
// console.log(data,'这是分页吗')
  

//   return axios({
//     url: ip + '/banner/selectList',
//     method: 'post',
    
//     data:data.json?data:Qs.stringify({openPage:data.openPage,page:data.currentPage,limit:data.pageSize})
//   })
// }

// export function getInfoListPage(openPage, limit, page, form) {

  

//   return axios({
//     url: ip + '/banner/selectList',
//     method: 'post',
//     // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//     data: {
//       openPage,//是否开启分页

//       page,//分页页数
//       limit,//分页行数


//     }
//   })
// }


export function insert(name, form, jiekou) {
  if (!jiekou) {
    jiekou = '/insert'
  }
  return axios({
    url: ip + name + jiekou,
    method: 'post',
    data: form.json ? form : Qs.stringify(form)
  })
}

export function getBannerSee(id) {
  // if (!jiekou) {
  //   jiekou = '/update'
  // }
  return axios({
    url: ip + '/banner/select',
    method: 'post',
    data: {
      id
    }
  })
}

export function bannerAddimg(data) {

  return axios({
    url: ip + '/banner/insert',
    method: 'post',
    data: data
  })
}

export function bannerEdits(data) {
  console.log(data)

  return axios({
    url: ip + '/banner/update',
    method: 'post',
    data: {
      id: data.id,
      bannerName: data.bannerName,
      imageUrl: data.imageUrl,
      jumpLink:data.jumpLink,
      synopsis:data.synopsis
      

    }
  })
}

export function bannerDelete(id) {
  // if (!jiekou) {
  //   jiekou = '/delete'
  // }
  return axios({
    url: ip + "/banner/delete",
    method: 'post',
    data: {
      id
    }
  })
}

export function bannerSearch(data) {
  console.log(data,'搜索')

  return axios({
    url: ip + "/banner/selectList ",
    method: 'post',
    // data: {
    //   bannerName: data,
    //   openPage
    // }
    data:data.json?data:Qs.stringify({openPage:data.openPage,bannerName:data.bannerName})
  })
}

export function downloadFiles(url) {
  return axios({
    url: url,
    method: 'get',
    responseType: 'blob'
  })
}