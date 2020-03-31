<template>
  <el-row class="articleBreadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-home"></i>
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in paths"
        :to="item.path ? { path: item.path } : ''"
        :key="index"
      >
        {{ item.text }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
</template>

<script>
export default {
  props: {
    paths: Array
  }
};
</script>

<style lang="scss">
.articleBreadcrumb {
  margin-top: 15px;
  @include circleBlock;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
