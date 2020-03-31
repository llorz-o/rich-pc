<template>
  <nuxt-link
    v-if="article._id"
    :to="`/article/${article._id}`"
    class="articleCard"
  >
    <div class="articleCardTop">
      <el-row class="articleCardTitle">
        {{ article.title }}
      </el-row>
      <el-row class="articleCardDesc">
        {{ article.desc }}
      </el-row>
    </div>
    <div class="articleCardBottom">
      <ArticleBaseInfo
        :article="{
          auth: article.auth,
          date: article.date,
          messageCount: article.messageCount,
          tags: article.tags
        }"
      />
    </div>
  </nuxt-link>
</template>

<script>
import ArticleBaseInfo from "components/common/ArticleBaseInfo.vue";
export default {
  components: { ArticleBaseInfo },
  props: {
    article: Object
  }
};
</script>

<style lang="scss">
.articleCard {
  text-decoration: none;
  color: $text;
  font-size: $base;
  display: block;
  margin-top: 15px;
  background-color: $light;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 2px rgba($color: #000000, $alpha: 0.04);
  .articleCardTop {
    border-bottom: 1px solid $bg-light;
  }
  .articleCardBottom {
    padding-top: 10px;
  }
  .articleCardTitle {
    font-size: $title;
    color: $text-dark;
    font-weight: $w600;
  }
  .articleCardDesc {
    color: $text-light;
    padding: 10px 0;
  }
}
</style>
