<template>
  <el-upload :data="dataObj" :on-success="onSuccess" show-file-list list-type="picture" :before-upload="beforeUpload" action="https://upload.qiniup.com" drag>
    <i class="el-icon-upload" />
    <div class="el-upload__text">
      将文件拖到此处，或<em>点击上传</em>
    </div>
  </el-upload>
</template>

<script>
import { getToken } from '@/api/qiniu'
// 获取七牛token 后端通过Access Key,Secret Key,bucket等生成token
// 七牛官方sdk https://developer.qiniu.com/sdk#official-sdk

export default {
  data() {
    return {
      dataObj: { token: ''},
      image_uri: [],
      fileList: []
    }
  },
  methods: {
    beforeUpload() {
      const _self = this
      return new Promise((resolve, reject) => {
        getToken().then(response => {
          const key = response.data.qiniu_key
          const token = response.data.qiniu_token
          console.log(_self._data)
          _self._data.dataObj.token = token
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    onSuccess(data) {
      console.log('http://pr0o6uaio.bkt.clouddn.com/'+ data.key)
    }
  }
}
</script>
