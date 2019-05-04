<template>
  <div class="app-container">
    <el-button type="text" @click="handleAdd">添加类目</el-button>
    <el-table v-loading="listLoading" :data="list" :default-sort = "{prop: 'created_at', order: 'descending'}" stripe element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95" sortable prop="category_id"></el-table-column>
      <el-table-column label="名称" prop="category_name"></el-table-column>
      <el-table-column label="标识" width="110" align="center" prop="category_type"></el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200" sortable >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.create_time | formatter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="类目名称">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="类目标识">
                <el-input v-model="form.region" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{btnText}}</el-button>
                <el-button type="primary" @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import request from '@/utils/request'

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
      let date = new Date(row)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minutes = date.getMinutes()
      return year+'-'+month+'-'+day+' '+hour+':'+minutes
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      dialogVisible: false,
      form: {
        id: '',
        name: '',
        region: ''
      },
      title: '添加类目',
      btnText: '添加'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      request({
        url: '/category/list',
        method: 'get'
        }).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    addCategory() {

    },
    handleClose(done) {
        this.$confirm('取消添加？')
            .then(_ => {
            done();
            })
            .catch(_ => {});
    },
    onSubmit() {
        if(this.form.id===''){
            this.$message('添加成功!')
            request({
                url: '/create',
                method: 'post',
                data: {
                    name: this.form.name,
                    region: this.form.region
                }
            })
        }else{
            this.$message('修改成功!')
            request({
                url: '/update',
                method: 'post',
                data: this.form
            })
        }
      
      this.clearData()
      this.dialogVisible = false
    },
    clearData() {
        this.form = {
            name: '',
            region: ''
        }
    },
    onCancel() {
        this.dialogVisible = false
    },
    handleEdit(index, row) {
      this.btnText = '修改'
      this.title = '修改类目'
      this.form.id = row.category_id
      this.form.name = row.category_name
      this.form.region = row.category_type
      this.dialogVisible = true
    },
    handleAdd() {
      this.btnText = '添加'
      this.title = '添加类目'
      this.form.id = ''
      this.form.name = ''
      this.form.region = ''
      this.dialogVisible = true
    },
    handleDelete(index, row) {
      this.form.id = row.category_id
      this.form.name = row.category_name
      this.form.region = row.category_type
      this.$message('删除成功!')
      request({
        url: '/delete',
        method: 'post',
        data: this.form
      })
    }
  }
}
</script>
