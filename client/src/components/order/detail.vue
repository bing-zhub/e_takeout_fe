<template>
  <div id="detail">
    <div class="statushead">
      <div class="statuscircle" style="transform: scale(1); opacity: 1;">
        <img
          class="circleimage"
          src="http://pr0o6uaio.bkt.clouddn.com/FrWYf-tRZvlKCZJB8SXj4SoMNH94"
        >
      </div>
      <h1 class="statustext">{{order.orderStatus | orderStatusName}}</h1>
      <div class="buttons">
        <button
          v-if="order.orderStatus === 0 && order.payStatus === 0"
          @click="pay(order.orderId)"
        >去支付</button>
        <button
          v-if="order.orderStatus === 0"
          @click="cancelOrder(order.orderId)"
        >{{cancelOrderName}}</button>
      </div>
    </div>
    <div class="restaurant-card">
      <div class="head listitem">
        <div class="name-wrap">
          <img class="avatar" src="http://pr0o6uaio.bkt.clouddn.com/FrWYf-tRZvlKCZJB8SXj4SoMNH94">
          <span class="name">商品信息</span>
        </div>
      </div>
      <div class="product-list listitem">
        <ul class="cart-item">
          <li class="product-item"  v-for="(orderDetail, index) in orderDetailList" :key="index">
            <div style="display: inline-block;">
              <p style="float: left">{{orderDetail.productName}} </p>
              <p style="float: right; color: #8f4919"> x{{orderDetail.productQuantity}} &yen;{{orderDetail.productPrice * orderDetail.productQuantity}}</p>
            </div>
          </li>
        </ul>
      </div>
      <!---->
      <div class="finalprice listitem">实付 &yen;{{order.orderAmount}}</div>
    </div>
    <div class="detailcard">
      <!---->
      <div class="detailcard-delivery card">
        <div class="title listitem">配送信息</div>
        <ul class="cardlist">
          <li class="listitem">
            <span>送达时间：</span> 尽快送达
          </li>
          <li class="listitem">
            <span>送货地址：</span>
            <div class="content">
              <p>{{order.consumerName}}</p>
              <p>{{order.consumerPhone}}</p>
              <p>{{order.consumerAddress}}</p>
            </div>
          </li>
          <!---->
        </ul>
      </div>
      <div class="detailcard-order card">
        <div class="title listitem">订单信息</div>
        <ul class="cardlist">
          <li class="listitem">
            <span>订单号：</span>
            {{order.orderId}}
          </li>
          <li class="listitem">
            <span>支付方式：</span>
            {{order.payType | payName}}
          </li>
          <li class="listitem">
            <span>下单时间：</span>
            {{order.createTime | time}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.js'

export default {
  data () {
    return {
      order: {},
      orderDetailList: [],
      cancelOrderName: '取消订单'
    }
  },
  created () {
    const body = {
      'orderId': this.$route.params.orderId,
      'openId': this.$cookies.get('openid')
    }
    this.$http
      .post(api.getOrderDetail, JSON.stringify(body))
      .then(function (response) {
        this.order = response.body.data
        console.log(this.order)
        this.orderDetailList = this.order.orderDetails
      })
  },
  filters: {
    payName: function (value) {
      if (value === 0) {
        return '货到付款'
      } else {
        return '微信支付'
      }
    },
    time: function (value) {
      var date = new Date(value)
      return (
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes()
      )
    },
    orderStatusName: function (value) {
      if (value === 0) {
        return '待接单'
      } else if (value === 1) {
        return '订单已完结'
      } else if (value === 2) {
        return '订单已取消'
      } else {
        return ''
      }
    }
  },
  methods: {
    cancelOrder: function (orderId) {
      this.cancelOrderName = '取消中...'
      this.$http
        .post(api.cancelOrder, {
          orderId: orderId,
          openid: this.$cookies.get('openid')
        })
        .then(function (response) {
          response = response.body
          if (response.code === 0) {
            location.reload()
          } else {
            alert('取消订单失败:' + response.msg)
          }
        })
    },
    pay: function (orderId) {
      location.href =
        api.wechatPayUrl +
        '?openid=' +
        this.$cookies.get('openid') +
        '&orderId=' +
        orderId +
        '&returnUrl=' +
        encodeURIComponent(api.sellUrl + '/#/order/' + orderId)
    }
  }
}
</script>

<style lang="stylus">
html,
body {
  height: 100%;
}
#detail {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .statuscircle {
    margin-bottom: 10px;
    text-align: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }

  .statushead {
    position: relative;
    padding-top: 20px;
    text-align: center;
    background-color: #fff;
    padding-bottom: 30px;
    margin-bottom: 10px;
    .statustext {
      img {
        width: 8px;
      }
    }
    .buttons button {
      height: 1.853333rem;
      width: 4.8rem;
      white-space: nowrap;
      border-radius: 0.08rem;
      font-size: 0.8rem;
      color: #666;
      margin: 0.4rem 0.133333rem 0;
      border: 1px solid #ccc;
      background-color: transparent;
    }
  }
  .restaurant-card {
    margin-bottom: 10px;
    background-color: #fff;
    img {
      width: 7px;
    }
    .name-wrap {
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  .detailcard {
    .title {
      color: #333;
      font-weight: 700;
    }
  }
  .detailcard-delivery {
    margin-bottom: 10px;
  }
  .listitem {
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background-color: #fff;
  }
  .record-wrapper {
    display: inline;
  }
}
</style>
