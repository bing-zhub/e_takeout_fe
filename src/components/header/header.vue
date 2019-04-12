<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img height="64" width="64" :src="seller.avatar"/>
      </div>
    </div>
    <div class="buletin-wrapper">

    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  }
}
</script>

<style>

</style>
