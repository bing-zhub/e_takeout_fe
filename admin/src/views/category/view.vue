<template>
  <div class="app-container">
    <el-button type="text" @click="handleAdd">添加类目</el-button>
    <el-button type="text" @click="handleExport">导出Excel</el-button>
    <el-button type="text" @click="importDialogVisible = true">导入Excel</el-button>
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
    <el-dialog title="导入数据" :visible.sync="importDialogVisible" width="50%" :before-close="handleClose">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <el-button v-if="tableData.length!==0" style="width: 100%;margin-top:20px;" @click="handleImport">导入</el-button>
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import request from '@/utils/request'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'


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
      btnText: '添加',
      tableData: [],
      tableHeader: [],
      importDialogVisible: false
    }
  },
  components: {
    UploadExcelComponent
  },
  created() {
    this.fetchData()
  },
  methods: {
    formatDate(val){
      let date = new Date(val)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minutes = date.getMinutes()
      return year+'-'+month+'-'+day+' '+hour+':'+minutes
    },
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
    handleExport() {
      const tHeader =  ['ID', '名称', '标识', '创建时间']
      const data = this.convertToArray()
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'excel-list',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    convertToArray(){
      const ret = []
      this.list.forEach((item)=> {
        let one = [item.category_id, item.category_name, item.category_type, this.formatDate(item.create_time)]
        ret.push(one)
      })
      return ret
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
      const tHeader =  ['ID', '名称', '标识', '创建时间']
      if(this.tableHeader.toString() !== tHeader.toString()){
        this.$message({
          message: '格式不正确, 请按导出格式修改!',
          type: 'warning'
        })
      }
      this.tableData.forEach((item)=> {
        request({
          url: '/create',
          method: 'post',
          data: {
            name: item.名称,
            region: item.标识
          }
        }).then((res)=> {
          if(res.code===0){
            this.$message({
              message: res.data.msg + '导入成功',
              type: 'info'
            })
          }
        })
      })
      
    }
  }
}
</script>
