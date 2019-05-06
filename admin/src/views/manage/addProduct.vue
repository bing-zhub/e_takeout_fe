<template>
  <div class="app-container">
    <el-container>
      <el-header style="text-align: center; font-size: 24px">
        <h1 style="font-weight:400; color:#589ef8">添加商品</h1>
      </el-header>
      <el-main style="margin-top: 24px">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio
                v-for="(item, index) in categories"
                :key="index"
                :label="item.category_id"
              >{{ item.category_name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="现价" prop="price">
            <el-input-number v-model="form.price" controls-position="right" />
          </el-form-item>
          <el-form-item label="原价">
            <el-input-number v-model="form.oldPrice" controls-position="right" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.description" />
          </el-form-item>
          <el-form-item label="信息">
            <el-input v-model="form.info" />
          </el-form-item>
          <el-form-item prop="image" style="margin-bottom: 30px;">
            <Upload v-model="form.image" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="onSubmit(form)">添加</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import request from '@/utils/request'
import Upload from '@/components/Upload/SingleImage'

export default {
  components: {
    Upload
  },
  data() {
    var checkPrice = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error('价格不能为负'))
      }
    }
    return {
      form: {
        name: '',
        price: '',
        oldPrice: '',
        description: '',
        info: '',
        icon: '',
        image: '',
        type: ''
      },
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { validator: checkPrice, trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择商品类型', trigger: 'blur' }],
        image: [{ required: true, message: '请上传商品照片', trigger: 'blur' }]
      },
      categories: []
    }
  },
  created() {
    request({
      url: '/category/list',
      method: 'get',
      data: {
        sellerId: 0
      }
    }).then(res => {
      this.categories = res.data.items
    })
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          request({
            url: '/product/add',
            method: 'post',
            data: this.form
          }).then(res => {
            this.$message({ message: '添加成功', type: 'success' })
            this.$refs[formName].resetFields()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

