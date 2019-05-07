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
      <el-table-column align="center" label="ID" width="95" sortable prop="category_id"/>
      <el-table-column label="名称" prop="category_name"/>
      <el-table-column label="标识" width="110" align="center" prop="category_type"/>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"/>
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
    <el-dialog
      top
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="类目名称">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="类目标识">
          <el-input v-model="form.region"/>
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
      :before-close="handleClose"
    >
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
import request from "@/utils/request";
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
        id: "",
        name: "",
        region: ""
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
        this.list = response.data.items;
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
          item.category_id,
          item.category_name,
          item.category_type,
          this.formatDate(item.create_time)
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
      if (this.form.id === "") {
        addCategoory({
          name: this.form.name,
          region: this.form.region
        }).then(() => {
          this.$message("添加成功!");
        });
      } else {
        updateCategory(this.form).then(() => {
          this.$message("修改成功!");
        });
      }

      this.clearData();
      this.dialogVisible = false;
    },
    clearData() {
      this.form = {
        name: "",
        region: ""
      };
    },
    onCancel() {
      this.dialogVisible = false;
    },
    handleEdit(index, row) {
      this.btnText = "修改";
      this.title = "修改类目";
      this.form.id = row.category_id;
      this.form.name = row.category_name;
      this.form.region = row.category_type;
      this.dialogVisible = true;
    },
    handleAdd() {
      this.btnText = "添加";
      this.title = "添加类目";
      this.form.id = "";
      this.form.name = "";
      this.form.region = "";
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      this.form.id = row.category_id;
      this.form.name = row.category_name;
      this.form.region = row.category_type;
      deleteCategory(this.form).then(() => {
        this.$message("删除成功!");
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
