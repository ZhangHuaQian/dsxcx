import '@/utils/interception'
import { serverip as ip } from '@/utils/serverIP'
import axios from 'axios'
import Qs from 'qs'

export function getInfoList(data) {
  return axios({
    url: ip + '/product/selectList',
    method: 'post',
    data: {
      data
    }
  })
}

export function getTypeList(data) {
  return axios({
    url: ip + '/productType/selectList',
    method: 'post',
    data: {
      data
    }
  })
}

export function TypeAdd(typeName, isIndex) {
  return axios({
    url: ip + '/productType/insert',
    method: 'post',
    data: {
      typeName,
      isIndex
    }
  })
}
export function TypeDelete(id) {
  return axios({
    url: ip + '/productType/delete',
    method: 'post',
    data: {
      id
    }
  })
}

export function TypeEdit(form, isIndex) {
  return axios({
    url: ip + '/productType/update',
    method: 'post',
    data: {
      id: form.id,
      typeName: form.typeName,
      isIndex
    }
  })
}

export function TypeSee(id) {
  return axios({
    url: ip + '/productType/select',
    method: 'post',
    data: {
      id
    }
  })
}

// export function InfoSee (id){
//   return axios({
//     url:ip+'/product/select',
//     method:'post',
//     data:{
//      id
//     }
//   })
// }
export function InfoDelete(id) {
  return axios({
    url: ip + '/product/delete',
    method: 'post',
    data: {
      id
    }
  })
}

export function InfoEdit(form, isIndex) {
  return axios({
    url: ip + '/product/update',
    method: 'post',
    data: {
      id: form.id,
      typeName: form.typeName,
      isIndex
    }
  })
}

export function InfoSee(id) {
  return axios({
    url: ip + '/product/select',
    method: 'post',
    data: {
      id
    }
  })
}

export function SearchType(data, isIndex) {
  return axios({
    url: ip + '/productType/selectList',
    method: 'post',
    data: {
      isIndex,
      typeName: data
    }
  })
}
export function SearchInfo(data, isIndex) {
  return axios({
    url: ip + '/product/selectList',
    method: 'post',
    data: {
      isIndex,
      typeName: data
    }
  })
}

export function productInsert(data) {
  console.log('axios提交的表单',data.productDiscountList.startTime )
  return axios({
    url: ip + '/product/insert',
    method: 'post',
    // data: {
    //   productName: data.productName,//商品名
    //   price: data.price,//价格 单位元，保留两位小数
    //   stock: data.stock,//库存
    //   status: data.status,//下架情况 0上架 1下架
    //   content: data.content,//商品详情
    //   productTypeList: [//商品分类列表
    //     {
    //       id: data.productTypeList.id//商品分类id
    //     }
    //   ],
    //   productDiscountList: [//商品折扣列表
    //     {
    //       discount: ""+data.productDiscountList.discount+"",//折扣 百分比形式
    //       startTime: ""+data.productDiscountList.startTime+"",//打折开始时间 精确到小时
    //       endTime: ""+data.productDiscountList.endTime+""//daze结束时间 精确到小时
    //     }
    //   ],
    //   productImageList: [{//商品图片列表
    //     imageName: ""+data.productImageList.imageName+"",//图片名
    //     imagUrl: ""+data.productImageList.imagUrl+"",//图片地址
    //     isFace: ""+data.productImageList.isFace+""//是否是封面 0否 1是
    //   }
    //   ]
    // }
    data:{...data}
  })
}

export function ReturnImg(data) {
  return axios({
    url: ip + '/base/uploadImg',
    method: 'post',
    data: data

  })
}
