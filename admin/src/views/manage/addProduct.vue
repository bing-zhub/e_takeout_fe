<template>
  <div class="app-container">
    <el-container>
      <el-header style="text-align: center; font-size: 24px">
        <h1 style="font-weight:400; color:#589ef8">添加商品</h1>
      </el-header>
      <el-main style="margin-top: 24px">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item
            label="名称"
            :rules="[{ required: true, message: '请输入商品名称', trigger: 'change' }]"
            prop="name"
          >
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item
            label="类型"
            prop="type"
            :rules="[{ required: true, message: '请输入选择商品类别', trigger: 'change' }]"
          >
            <el-radio-group v-model="form.type">
              <el-radio
                v-for="(item, index) in categories"
                :key="index"
                :label="item.categoryType"
              >{{ item.categoryName }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="现价"
            :rules="[{ required: true, message: '请输入商品金额', trigger: 'change' },
                     { validator: checkPrice, trigger: 'change' }]"
            prop="price"
          >
            <el-input-number v-model="form.price" controls-position="right" />
          </el-form-item>
          <el-form-item
            label="原价"
            :rules="[{ required: true, message: '请输入商品金额', trigger: 'change' },
                     { validator: checkPrice, trigger: 'change' }]"
            prop="oldPrice"
          >
            <el-input-number v-model="form.oldPrice" controls-position="right" />
          </el-form-item>
          <el-form-item
            label="库存"
            :rules="[{ required: true, message: '请输入商品库存', trigger: 'change' },
                     { validator: checkStock, trigger: 'change' }]"
            prop="stock"
          >
            <el-input-number v-model="form.stock" controls-position="right" />
          </el-form-item>
          <el-form-item label="描述" prop="desciption">
            <el-input v-model="form.description" />
          </el-form-item>
          <el-form-item label="信息" prop="info">
            <el-input v-model="form.info" />
          </el-form-item>
          <el-form-item prop="image" style="margin-bottom: 30px;">
            <Upload v-model="form.image" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="submitForm('form')">添加</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Upload from '@/components/Upload/SingleImage'
import { getCategories } from '@/api/category'
import { addProduct } from '@/api/product'

export default {
  components: {
    Upload
  },
  data() {
    var checkPrice = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error('价格不能为负'))
      } else {
        callback()
      }
    }
    var checkStock = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error('库存应为正整数'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        price: '',
        oldPrice: '',
        description: '这个卖家很懒, 还没编辑~',
        info: '这个卖家很懒, 还没编辑~',
        icon: 'http://pr0o6uaio.bkt.clouddn.com/FrWYf-tRZvlKCZJB8SXj4SoMNH94',
        image: 'http://pr0o6uaio.bkt.clouddn.com/FrWYf-tRZvlKCZJB8SXj4SoMNH94',
        type: '',
        stock: ''
      },
      checkPrice,
      checkStock,
      categories: []
    }
  },
  created() {
    // sellerId
    getCategories(0).then(res => {
      this.categories = res.data
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addProduct(this.form).then(res => {
            this.$message({ message: '添加成功', type: 'success' })
            this.$refs[formName].resetFields()
          })
        } else {
          this.$message({ message: '缺少信息', type: 'error' })
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

