<template>
  <a href="javascript:;">
    <el-button v-bind="$attrs" v-on="$listeners" :title="title"></el-button>
  </a>
</template>

<script>
export default {
  name: 'HintButton',
  props: {
    title: {
      typeof: String,
      default: ''
    }
  }
}
</script>

<style>
a {
  margin-right: 10px;
}
</style>
