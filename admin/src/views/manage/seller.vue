<template>
  <div class="app-container">
    <el-button type="text" @click="handleAdd">添加卖家</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      :default-sort="{prop: 'created_at', order: 'descending'}"
      stripe
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="用户名" width="95" prop="username" />
      <el-table-column label="角色" prop="role" :formatter="roleFormatter" sortable />
      <el-table-column label="头像" width="150" align="center" prop="avatar" >
        <template slot-scope="scope">
          <img :src="scope.row.avatar" :width="120" :height="120">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="introduction" label="介绍" width="200"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button v-if="scope.row.introduction !== 'disabled'" size="mini" type="danger" @click="handleActive(scope.$index, scope.row)">禁用</el-button>
          <el-button v-if="scope.row.introduction === 'disabled'" size="mini" type="success" @click="handleActive(scope.$index, scope.row)">激活</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog top :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="类目名称">
          <el-input v-model="form.categoryName" />
        </el-form-item>
        <el-form-item label="类目标识">
          <el-input v-model="form.categoryType" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{ btnText }}</el-button>
          <el-button type="primary" @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import {
  deleteCategory,
  getCategories,
  addCategory,
  updateCategory,
  importCategory
} from '@/api/category'

import {
  listSeller,
  activateUser,
  deactivateUser
} from '@/api/user'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    formatter(row, column) {
      const date = new Date(row)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minutes = date.getMinutes()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes
    }
  },
  components: {
    UploadExcelComponent
  },
  data() {
    return {
      list: [],
      listLoading: true,
      dialogVisible: false,
      form: {
        categoryId: '',
        categoryName: '',
        categoryType: ''
      },
      title: '添加类目',
      btnText: '添加',
      tableData: [],
      tableHeader: [],
      importDialogVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    roleFormatter(val) {
      if(val.role==='seller'){
        return '卖家'
      }else{
        return ''
      }
    },
    formatDate(val) {
      const date = val?new Date(val): new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minutes = date.getMinutes()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes
    },
    fetchData() {
      this.listLoading = true
      listSeller().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    handleExport() {
      const tHeader = ['ID', '名称', '标识', '创建时间']
      const data = this.convertToArray()
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'categories_'+this.formatDate(),
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    convertToArray() {
      const ret = []
      this.list.forEach(item => {
        const one = [
          item.categoryId,
          item.categoryName,
          item.categoryType,
          this.formatDate(item.createTime)
        ]
        ret.push(one)
      })
      return ret
    },
    handleClose(done) {
      this.$confirm('取消添加？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    onSubmit() {
      if (this.form.categoryId === '') {
        addCategory({
          categoryName: this.form.categoryName,
          categoryType: parseInt(this.form.categoryType)
        }).then(() => {
          this.fetchData()
          this.$message({ type: 'success', message: '添加成功!' })
        })
      } else {
        updateCategory(this.form).then(() => {
          this.fetchData()
          this.$message({ type: 'success', message: '修改成功!' })
        })
      }

      this.fetchData()
      this.clearData()
      this.dialogVisible = false
    },
    clearData() {
      this.form = {
        categoryName: '',
        categoryType: ''
      }
    },
    onCancel() {
      this.dialogVisible = false
    },
    handleEdit(index, row) {
      this.btnText = '修改'
      this.title = '修改类目'
      this.form.categoryId = row.categoryId
      this.form.categoryName = row.categoryName
      this.form.categoryType = row.categoryType
      this.dialogVisible = true
    },
    handleAdd() {
      this.btnText = '添加'
      this.title = '添加类目'
      this.form.categoryId = ''
      this.form.categoryName = ''
      this.form.categoryType = ''
      this.dialogVisible = true
    },
    handleActive(index, row) {
      if(row.introduction === 'disabled'){
        activateUser(row.username)
          .then(() => {
            this.$message({
              message: '激活成功!',
              type: 'success'
            })
            this.fetchData()
          })
      } else {
        deactivateUser(row.username)
          .then(() => {
            this.$message({
              message: '禁用成功!',
              type: 'success'
            })
            this.fetchData()
          })
      }
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    handleImport() {
      const tHeader = ['ID', '名称', '标识', '创建时间']
      const a = tHeader.toString()
      const b = this.tableHeader.toString()
      if (a !== b) {
        this.$message({
          message: '格式不正确, 请按' + a + '格式修改!',
          type: 'warning'
        })
        return
      }
      const data = []
      this.tableData.forEach(item => {
        const t = {
          categoryName: item.名称,
          categoryType: item.标识
        }
        data.push(t)
      })
      importCategory(data).then(res => {
        this.$message({
          message: res.data + '条数据导入成功',
          type: 'success'
        })
        this.importDialogVisible = false
        this.fetchData()
      })
    }
  }
}
</script>
