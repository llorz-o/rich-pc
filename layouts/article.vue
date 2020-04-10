<template>
  <el-container id="articleLayout">
    <el-header class="Header">
      <Header />
    </el-header>
    <el-container class="Body">
      <LeftAside />
      <el-container class="RightMain" ref="right_main">
        <el-container>
          <el-main class="Main">
            <Providor>
              <nuxt />
            </Providor>
          </el-main>
          <el-footer class="Footer"> </el-footer>
        </el-container>
        <RightAside />
      </el-container>
    </el-container>
    <el-backtop class="reset-el-top" target=".RightMain">
      <div class="backUp">
        backUp
      </div>
    </el-backtop>
  </el-container>
</template>

<script>
import Vue from "vue";
import LeftAside from "components/common/LeftAside.vue";
import RightAside from "components/common/RightAside.vue";
import Providor from "components/common/Providor";
import Header from "components/common/Header";
export default {
  middleware: "init",
  components: {
    LeftAside,
    RightAside,
    Providor,
    Header
  },
  data() {
    return {
      articleInfo: null,
      rightMainRef: null,
      mixinHeader: false
    };
  },
  provide() {
    return Vue.observable({
      layout: "article",
      root: this
    });
  },
  methods: {
    syncRightMainRef() {
      if (this.$refs.right_main) {
        this.rightMainRef = this.$refs.right_main;
      }
    }
  },
  mounted() {
    this.syncRightMainRef();
  },
  updated() {
    this.syncRightMainRef();
  }
};
</script>

<style lang="scss">
#articleLayout {
  .Header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    height: 40px !important;
    padding: 0;
  }
  .Body {
    height: calc(100% - 60px);
  }
  .RightMain {
    height: unset;
    @include scroll;
    @include beauty-scroll--unset;
    padding-right: 0;
    > * {
      flex-shrink: 0;
      height: fit-content;
    }
    .el-container {
      height: fit-content;
      > * {
        flex-shrink: 0;
      }
    }
    .Main {
      background-color: #f0f3f4;
      min-width: 800px;
      padding: 10px 20px;
      display: flex;
      justify-content: center;
      > * {
        max-width: 800px;
        min-width: 800px;
      }
      .LayoutContainer {
        all: unset;
        height: unset;
        display: unset;
        .boundary {
          position: unset;
          height: unset;
          flex-shrink: 0;
          &::after,
          &::before {
            display: none;
          }
          .LayoutMain {
            position: relative;
            overflow-x: hidden;
            overflow-y: unset;
            flex-shrink: 0;
            padding-right: 20px;
          }
        }
      }
    }
    .Footer {
      background-color: #f0f3f4;
      box-shadow: 0 -2px 1px rgba(200, 200, 200, 0.12);
    }
    .rightAside {
      .tabContentBox {
        padding-right: 0;
      }
      .tabContentBox {
        height: initial;
        max-height: unset;
      }
    }
  }
  .reset-el-top {
    // all: unset;
    width: initial;
    height: initial;
    border-radius: initial;
    box-shadow: unset;
    .backUp {
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.15);
      color: $root;
    }
  }
}
</style>
