<template>
  <component
    v-if="article._id"
    :is="article.coverTheme"
    :info="article"
  ></component>
</template>

<script>
import ArticleBaseInfo from "components/common/ArticleBaseInfo.vue";
import ArticleCard0 from "./components/article-card0";
import ArticleCard1 from "./components/article-card1";
import ArticleCard2 from "./components/article-card2";
import ArticleCard3 from "./components/article-card3";
import ArticleCard4 from "./components/article-card4";
export default {
  components: {
    ArticleBaseInfo,
    ArticleCard0,
    ArticleCard1,
    ArticleCard2,
    ArticleCard3,
    ArticleCard4
  },
  props: {
    article: Object
  }
};
</script>

<style lang="scss">
// .articleCard {
//   text-decoration: none;
//   color: $text;
//   font-size: $base;
//   display: block;
//   margin-top: 15px;
//   background-color: $light;
//   border-radius: 5px;
//   padding: 20px;
//   box-shadow: 0 0 2px rgba($color: #000000, $alpha: 0.04);
//   .articleCardTop {
//     border-bottom: 1px solid $bg-light;
//   }
//   .articleCardBottom {
//     padding-top: 10px;
//   }
//   .articleCardTitle {
//     font-size: $title;
//     color: $text-dark;
//     font-weight: $w600;
//   }
//   .articleCardDesc {
//     color: $text-light;
//     padding: 10px 0;
//   }
// }
</style>
