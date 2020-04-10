<template>
  <div class="HeaderComponent">
    <div class="headerLogoContaienr">
      <template>
        <img
          class="headerLogo"
          src="http://localhost:3100/images/1.jpg"
          alt="logo"
          v-if="showLogo"
        />
        <div class="headerNetName"></div>
      </template>
    </div>
    <div class="headerCenterContainer">
      <!-- 文章标题 -->
      <transition
        enter-active-class="fadeInUp animated faster"
        leave-active-class="fadeOutDown animated faster"
      >
        <div class="articleTitle" v-if="articleTitle && root.mixinHeader">
          {{ articleTitle }}
        </div>
      </transition>
    </div>
    <div class="headerRightContainer"></div>
  </div>
</template>

<script>
export default {
  inject: ["layout", "root"],
  data() {
    return {
      showLogo: false,
      $rightMainRef: null
    };
  },
  watch: {
    "root.rightMainRef"(news) {
      if (news && news.$el) {
        news.$el.addEventListener("scroll", this.onRightMainScroll);
        this.$rightMainRef = news.$el;
      }
    }
  },
  computed: {
    articleTitle() {
      if (this.root.articleInfo) {
        let articleInfo = this.root.articleInfo;
        if (articleInfo.title) return articleInfo.title;
      }
      return false;
    }
  },
  methods: {
    onRightMainScroll(e) {
      let scrollTop = e.target.scrollTop;
      if (scrollTop > 130) {
        this.root.mixinHeader = true;
      } else {
        this.root.mixinHeader = false;
      }
    }
  },
  mounted() {},
  destroyed() {
    if (this.$rightMainRef)
      this.$rightMainRef.removeEventListener("scroll", this.onRightMainScroll);
  }
};
</script>

<style lang="scss">
.HeaderComponent {
  display: flex;
  height: 40px;
  .headerLogoContaienr {
    width: 300px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    .headerLogo {
      height: 100%;
      object-fit: cover;
    }
    .headerNetName {
      padding: 0 5px;
      font-size: $master-title;
      font-weight: $w600;
    }
  }
  .headerCenterContainer {
    flex: 1;
    overflow: hidden;
    .articleTitle {
      margin: 0 auto;
      width: 800px;
      @include etched;
      font-size: $master-title;
      color: $text-dark;
      line-height: 40px;
    }
  }
  .headerRightContainer {
    width: 300px;
  }
}
</style>
