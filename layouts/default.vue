<template>
  <el-container id="__dft">
    <el-header class="top">
      <Header />
    </el-header>
    <el-container class="bottom">
      <LeftAside class="leftAside" :dft-active="localRoute" />
      <el-container class="rightMain">
        <el-container>
          <el-main class="Main">
            <nuxt />
          </el-main>
          <el-footer></el-footer>
        </el-container>
        <RightAside class="rightAside" />
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Vue from "vue";
import LeftAside from "components/common/LeftAside.vue";
import RightAside from "components/common/RightAside.vue";
import Header from "components/common/Header";
import { layoutExtends } from "~/utils/vue-extends";
export default {
  middleware: "init",
  components: {
    LeftAside,
    RightAside,
    Header
  },
  extends: layoutExtends
};
</script>

<style lang="scss">
#__dft {
  position: relative;
  padding-top: 40px;
  .top {
    height: 40px !important;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    height: 40px !important;
    z-index: 20;
    padding: 0;
  }
  .bottom {
    position: relative;
    padding-left: 300px;
    .leftAside {
      position: fixed;
      left: 0;
      top: 40px;
      bottom: 0;
    }
    .rightMain {
      background-color: #f0f3f4;
      .Main {
        max-width: 800px;
        min-width: 800px;
        margin: 0 auto;
      }
      .el-footer {
        background-color: #f0f3f4;
        box-shadow: 0 -2px 1px rgba(200, 200, 200, 0.12);
      }
      .rightAside {
        background-color: $light;
      }
    }
  }
}
</style>
