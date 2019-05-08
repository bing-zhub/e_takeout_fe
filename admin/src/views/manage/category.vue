<template>
  <div class="app-container">
    <el-button type="text" @click="handleAdd">添加类目</el-button>
    <el-button type="text" @click="handleExport">导出Excel</el-button>
    <el-button type="text" @click="importDialogVisible = true">导入Excel</el-button>
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
      <el-table-column align="center" label="ID" width="95" sortable prop="categoryId"/>
      <el-table-column label="名称" prop="categoryName"/>
      <el-table-column label="标识" width="110" align="center" prop="categoryType"/>
      <el-table-column align="center" prop="createTime" label="创建时间" width="200" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime | formatter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      top
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="类目名称">
          <el-input v-model="form.categoryName"/>
        </el-form-item>
        <el-form-item label="类目标识">
          <el-input v-model="form.categoryType"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{ btnText }}</el-button>
          <el-button type="primary" @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="导入数据"
      top
      :visible.sync="importDialogVisible"
      width="50%"
      :before-close="handleClose">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
      <el-button
        v-if="tableData.length!==0"
        style="width: 100%;margin-top:20px;"
        @click="handleImport"
      >导入</el-button>
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item"/>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import {
  deleteCategory,
  getCategories,
  addCategory,
  updateCategory,
  importCategory
} from "@/api/category";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    },
    formatter(row, column) {
      const date = new Date(row);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      return year + "-" + month + "-" + day + " " + hour + ":" + minutes;
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
        categoryId: "",
        categoryName: "",
        categoryType: ""
      },
      title: "添加类目",
      btnText: "添加",
      tableData: [],
      tableHeader: [],
      importDialogVisible: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    formatDate(val) {
      const date = new Date(val);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      return year + "-" + month + "-" + day + " " + hour + ":" + minutes;
    },
    fetchData() {
      this.listLoading = true;
      getCategories(0).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    handleExport() {
      const tHeader = ["ID", "名称", "标识", "创建时间"];
      const data = this.convertToArray();
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "excel-list",
          autoWidth: true,
          bookType: "xlsx"
        });
      });
    },
    convertToArray() {
      const ret = [];
      this.list.forEach(item => {
        const one = [
          item.categoryId,
          item.categoryName,
          item.categoryType,
          this.formatDate(item.createTime)
        ];
        ret.push(one);
      });
      return ret;
    },
    handleClose(done) {
      this.$confirm("取消添加？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {
      if (this.form.categoryId === "") {
        addCategory({
          categoryName: this.form.categoryName,
          categoryType: this.form.categoryType
        }).then(() => {
          this.fetchData();
          this.$message({type:'success', message: "添加成功!"});
        });
      } else {
        updateCategory(this.form).then(() => {
          this.fetchData();
          this.$message({type: 'success', message: "修改成功!"});
        });
      }

      this.fetchData();
      this.clearData();
      this.dialogVisible = false;
    },
    clearData() {
      this.form = {
        categoryName: "",
        categoryType: ""
      };
    },
    onCancel() {
      this.dialogVisible = false;
    },
    handleEdit(index, row) {
      this.btnText = "修改";
      this.title = "修改类目";
      this.form.categoryId = row.categoryId;
      this.form.categoryName = row.categoryName;
      this.form.categoryType = row.categoryType;
      this.dialogVisible = true;
    },
    handleAdd() {
      this.btnText = "添加";
      this.title = "添加类目";
      this.form.categoryId = "";
      this.form.categoryName = "";
      this.form.categoryType = "";
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      deleteCategory(row).then(() => {
        this.$message({
          message : "删除成功!",
          type : "success" 
        });
        this.fetchData();
      });
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning"
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    },
    handleImport() {
      const tHeader = ["ID", "名称", "标识", "创建时间"];
      const a = tHeader.toString();
      const b = this.tableHeader.toString();
      if (a !== b) {
        this.$message({
          message: "格式不正确, 请按" + a + "格式修改!",
          type: "warning"
        });
        return;
      }
      const data = [];
      this.tableData.forEach(item => {
        const t = {
          categoryName: item.名称,
          categoryType: item.标识
        };
        data.push(t);
      });
      importCategory(data).then(res => {
        this.$message({
          message: res.data.msg + "条数据导入成功",
          type: "success"
        });
      });
    }
  }
};
</script>
