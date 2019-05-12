<template>
  <el-container>
    <el-header style="text-align: center; font-size: 24px">
      <h1 style="font-weight:400; color:#589ef8">订单管理</h1>
    </el-header>
    <el-main style="margin-top: 24px">
      <el-table
        v-loading="listLoading"
        fit
        highlight-current-row
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" />
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row style="margin-left:20px">
              <el-col v-for="(detail, index) in props.row.orderDetails" :key="index" :span="4" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="detail.productIcon" class="image">
                  <div style="padding: 14px;">
                    <span style="font-size:17px;color:#606266">{{ detail.productName }}</span>
                    <div class="bottom clearfix">
                      <span style="color:#606266">{{ detail.productPrice }}元</span>
                      <span class="quantity">{{ detail.productQuantity }}份</span>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="orderAmount" label="订单金额(元)" sortable />
        <el-table-column prop="consumerName" label="客户名称" />
        <el-table-column prop="consumerPhone" label="电话" />
        <el-table-column prop="consumerAddress" label="地址" />
        <el-table-column
          prop="payStatus"
          label="支付状态"
          :formatter="orderStatusFormatter"
          :filters="payTags"
          :filter-method="filterPayTag"
          filter-placement="bottom-end"
        />
        <el-table-column
          prop="orderStatus"
          label="订单状态"
          :formatter="payStatusFormatter"
          :filters="orderTags"
          :filter-method="filterOrderTag"
          filter-placement="bottom-end"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleFinish(scope.$index, scope.row)">完结</el-button>
            <el-button size="mini" type="danger" @click="handleQuit(scope.$index, scope.row)">退单</el-button>
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
  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getOrders, cancelOrder, finishOrder } from '@/api/order'

export default {
  components: { Pagination },
  data() {
    return {
      totalData: [],
      tableData: [],
      listLoading: false,
      payTags: [
        { value: 0, text: '未支付' },
        { value: 1, text: '支付成功' }
      ],
      orderTags: [
        { value: 0, text: '新订单' },
        { value: 1, text: '完结' },
        { value: 2, text: '已取消' }
      ],
      total: 0,
      page: 1,
      recordPerPage: 10
    }
  },
  watch: {
    total: function() {
      this.filterPage()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    payStatusFormatter(row, col) {
      return this.payTags[row.payStatus].text
    },
    orderStatusFormatter(row, col) {
      return this.orderTags[row.orderStatus].text
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.orderStatus === 1) {
        return 'success-row'
      } else if (row.orderStatus === 2) {
        return 'warning-row'
      }
    },
    filterPayTag(value, row) {
      return value === row.payStatus
    },
    filterOrderTag(value, row) {
      return value === row.orderStatus
    },
    filterPage() {
      const start = (this.page - 1) * this.recordPerPage
      let end = this.page * this.recordPerPage - 1
      const t = this.totalData.length - start
      end = Math.min(end, start + t - 1) + 1
      this.tableData = this.totalData.slice(start, end)
    },
    fetchData() {
      this.listLoading = true
      this.total = 0
      getOrders({ openId: 'oKLGx51nBAgA814f3-uZXksVTKJQ' , size:100}).then(response => {
        this.totalData = response.data
        this.total += response.data.length
        this.listLoading = false
      })
    },
    handleFinish(index, row) {
      console.log({ orderId: row.orderId })
      finishOrder({ orderId: row.orderId })
        .then((res) => {
          this.$message({
            type: 'success',
            message: '完结成功!'
          })
          this.fetchData()
        })
    },
    handleQuit(index, row) {
      this.$confirm(`次操作将取消用户${row.consumerName}订单,若已付款将原路退回, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          cancelOrder({ orderId: row.orderId }).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '退单成功!'
              })
            }
            this.fetchData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退单'
          })
        })
    }
  }
}
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .table-expand {
    font-size: 0;
  }
  .quantity {
    font-size: 13px;
    color: #999;
    float: right;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
