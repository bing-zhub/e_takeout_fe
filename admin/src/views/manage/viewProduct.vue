<template>
  <el-container>
    <el-header style="text-align: center; font-size: 24px">
      <h1 style="font-weight:400; color:#589ef8">商品管理</h1>
    </el-header>
    <el-main style="margin-top: 24px">
      <el-table
        fit
        highlight-current-row
        v-loading="listLoading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="food.sellCount" label="总销量" sortable></el-table-column>
        <el-table-column prop="food.image" label="图片" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.food.image" :width="120" :height="120">
          </template>
        </el-table-column>
        <el-table-column prop="food.name" label="商品名"></el-table-column>
        <el-table-column sortable prop="food.oldPrice" label="原价" width="80"></el-table-column>
        <el-table-column sortable prop="food.price" label="现价" width="80"></el-table-column>
        <el-table-column prop="food.description" label="描述"></el-table-column>
        <el-table-column prop="food.rating" sortable label="评价"></el-table-column>
        <el-table-column
          prop="type.text"
          label="类别"
          width="100"
          :filters="tags"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="page"
        :limit.sync="recordPerPage"
        @pagination="filterPage"
      />
    </el-main>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="75%" :before-close="handleClose">
      <el-form>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio v-for="(item, index) in tags" :key="index" :label="item.value">{{item.text}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="现价" prop="price">
          <el-input-number v-model="form.price" controls-position="right"/>
        </el-form-item>
        <el-form-item label="原价">
          <el-input-number v-model="form.oldPrice" controls-position="right"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"/>
        </el-form-item>
        <el-form-item label="信息">
          <el-input v-model="form.info"/>
        </el-form-item>
        <el-form-item prop="image" style="margin-bottom: 30px;">
          <Upload v-model="form.image"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(form)" style="width: 100%">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import request from "@/utils/request";
import Upload from "@/components/Upload/SingleImage";
import Pagination from "@/components/Pagination";
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      totalData: [],
      tableData: [],
      listLoading: false,
      tags: [],
      form: {
        id: "",
        name: "",
        price: "",
        oldPrice: "",
        description: "",
        info: "",
        icon: "",
        image: "",
        type: ""
      },
      title: "修改商品",
      dialogVisible: false,
      total: 0,
      page: 1,
      recordPerPage: 10
    };
  },
  components: { Upload, Pagination },
  methods: {
    filterTag(value, row) {
      return value === row.type.value;
    },
    filterPage(){
      let start = (this.page-1)*this.recordPerPage
      let end = this.page*this.recordPerPage-1
      let t = this.totalData.length - start;
      end = Math.min(end, start+t-1) + 1;
      this.tableData =  this.totalData.slice(start, end)
    },
    fetchData() {
      this.listLoading = true;
      this.total = 0;
      request({
        url: "/product/list",
        method: "get"
      }).then(response => {
        let data = response.data;
        data.forEach(category => {
          let type = {
            value: category.type,
            text: category.name
          };
          this.tags.push(type);
          category.foods.forEach(food => {
            let item = {
              type,
              food
            };
            this.totalData.push(item);
          });
          this.total += category.foods.length;
        });
      });

      var context = this;
      setTimeout(function(){
        context.filterPage()
        context.listLoading = false;
      }, 100)
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.form = {
        id: row.food.id,
        name: row.food.name,
        price: row.food.price,
        oldPrice: row.food.oldPrice,
        description: row.food.description,
        info: row.food.info,
        icon: row.food.icon,
        image: row.food.image,
        type: row.type.value
      };
    },
    handleClose(done) {
      this.$confirm("取消修改？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit(form) {
      request({
        url: "/product/update",
        method: "post",
        data: this.form
      });
      this.$message({
        message: "修改成功",
        type: "success"
      });
      this.dialogVisible = false;
    },
    handleDelete(index, row) {
      this.$confirm(`此操作将永久删除${row.food.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request({
            url: "/product/delete",
            method: "post",
            data: {
              id: row.food.id
            }
          }).then(res => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>