<template>
  <div class="articleCard1" :style="info.style.coverDft">
    <div class="articleCardTop">
      <nuxt-link :to="`/article/${info._id}`" class="articleCardTitle">
        {{ info.title }}
      </nuxt-link>
      <div class="articleCardDesc">
        {{ info.desc }}
      </div>
    </div>
  </div>
</template>

<script>
import { articleCardExtend } from "./exends";
export default {
  name: "article-card1",
  extends: articleCardExtend
};
</script>

<style lang="scss">
.articleCard1 {
  user-select: none;
  text-decoration: none;
  color: white;
  font-size: 18px;
  font-weight: 600;
  display: block;
  margin-top: 15px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  position: relative;
  border-bottom-color: #ebeef5;
  padding-left: 0 !important;
  padding-right: 0 !important;
  height: 260px;
  .articleCardTop {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    padding: 20px;
    padding-top: 50px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 0, 0, 0.1) 20%,
      rgba(0, 0, 0, 0.7)
    );
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    .articleCardTitle {
      font-size: inherit;
      color: white;
      font-weight: inherit;
    }
    .articleCardDesc {
      color: inherit;
      font-size: 14px;
      padding: 10px 0 0;
      font-weight: 500;
    }
  }
  //   .articleCardBottom {
  //     padding-top: 5px;
  //     font-weight: 500;
  //     .articleBaseInfo {
  //       font-size: 13px;
  //       color: inherit;
  //       display: flex;
  //       .infoItem {
  //         padding: 2px 6px;
  //         &:first-child {
  //           padding-left: 0;
  //         }
  //       }
  //     }
  //   }
}
</style>
