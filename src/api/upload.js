import { serverip } from '@/utils/serverIP'
export const ip4Img = serverip + '/base/uploadImg'
export const ip4File = serverip + '/base/uploadFile'
export const ip4Video = serverip + '/base/uploadVideo'

import { ip } from './imageUpload.js'
import axios from 'axios'
export function uploadFile(data) {
  return axios({
    url: ip,
    method: 'post',
    data
  })
}

