import '@/utils/interception'
import { serverip as ip } from '@/utils/serverIP'
import axios from 'axios'
import Qs from 'qs'

export function getInfoList(data){
  return axios({
    url:ip+'/order/selectList',
    method:'post',
    data:data.json?data:Qs.stringify({openPage:data.openPage,page:data.currentPage,limit:data.pageSize,form:data.form})
  })
}
 
 export function getDelete(data){
  return axios({
    url:ip+'/order/delete',
    method:'post',
    data:data.json?data:Qs.stringify({id:data.id})
  })
}
export function ManageInfo(data){
  console.log(data,'qingqiuti')
  return axios({
    url:ip+'/order/select',
    method:'post',
    data:data.json?data:Qs.stringify({id:data.id})
    // data:{
    //   id:data.id
    // }
  })
}
export function orderEdit(data){
  
  return axios({
    url:ip+'/order/update',
    method:'post',
    data:data.json?data:Qs.stringify({id:data.id,status:data.status})
    
  })
}




// export function getTypeList(data){
//   return axios({
//     url:ip+'/productType/selectList',
//     method:'post',
//     data:{
//       data
//     }
//   })
// }

// export function TypeAdd (typeName,isIndex,synopsis){
//   return axios({
//     url:ip+'/productType/insert',
//     method:'post',
//     data:{
//       typeName,
//       isIndex,
//       synopsis
//     }
//   })
// }
// export function TypeDelete (id){
//   return axios({
//     url:ip+'/productType/delete',
//     method:'post',
//     data:{
//      id 
//     }
//   })
// }

// export function TypeEdit (form,isIndex){
//   return axios({
//     url:ip+'/productType/update',
//     method:'post',
//     data:{
//      id:form.id,
//      typeName:form.typeName,
//      synopsis:form.synopsis,
//      isIndex 
//     }
//   })
// }

// export function TypeSee (id){
//   return axios({
//     url:ip+'/productType/select',
//     method:'post',
//     data:{
//      id
//     }
//   })
// }
// export function InfoDelete (id){
//   return axios({
//     url:ip+'/product/delete',
//     method:'post',
//     data:{
//      id 
//     }
//   })
// }

// export function InfoEdit (form,isIndex){
//   return axios({
//     url:ip+'/product/update',
//     method:'post',
//     data:{
//      id:form.id,
//      typeName:form.typeName,
//      isIndex 
//     }
//   })
// }

// export function InfoSee (id){
//   return axios({
//     url:ip+'/product/select',
//     method:'post',
//     data:{
//      id
//     }
//   })
// }

// export function SearchType (data,isIndex){
//   return axios({
//     url:ip+'/productType/selectList',
//     method:'post',
//     data:{
//       isIndex,
//      typeName:data
//     }
//   })
// }
// export function SearchInfo (data,isIndex){
//   return axios({
//     url:ip+'/product/selectList',
//     method:'post',
//     data:{
//       isIndex,
//      typeName:data
//     }
//   })
// }

// export function ReturnImg(data){
//   return axios({
//     url:ip+'/base/uploadImg',
//     method:'post',
//     data:{
//       data
//     }
//   })
// }
