<template>
  <el-aside>
    <div class="userInfoBox"></div>
    <el-col>
      <el-menu
        :default-active="dftActive"
        router
        text-color="#909399"
        active-text-color="#5cdbd3"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- <el-menu-item index="/hub">
          <i class="el-icon-box"></i>
          <span slot="title">仓库</span>
        </el-menu-item> -->
        <el-menu-item index="/archives">
          <i class="el-icon-files"></i>
          <span slot="title">归档</span>
        </el-menu-item>
        <el-menu-item index="/message">
          <i class="el-icon-paperclip"></i>
          <span slot="title">留言</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-aside>
</template>

<script lang="ts">
export default {
  props: {
    dftActive: {
      type: String,
      default: "/"
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
.userInfoBox {
  height: 150px;
}
.el-menu-item:focus,
.el-menu-item:hover {
  box-shadow: inset 3px 2px 3px rgba($color: #000000, $alpha: 0.14);
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: $bg-root;
}
</style>
