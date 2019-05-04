<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="类目名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="类目表示">
        <el-input v-model="form.region" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      form: {
        name: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      request({
        url: '/user/login',
        method: 'post',
        data: this.form
      })
      this.clearData()
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    clearData() {
      this.form = {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

