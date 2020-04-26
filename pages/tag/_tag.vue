<template>
  <Layout modifier="tag">
    <template slot="header">
      <el-button
        class="articleTag"
        v-for="(item, index) in tags"
        :key="index"
        @click="$router.replace(`/tag/${item._id}`)"
      >
        <span>{{ item._id }}</span>
        <span class="tagCount" v-if="item.count !== undefined">{{
          item.count
        }}</span>
      </el-button>
    </template>
    <ArticleCard
      v-for="(item, index) in tagData.tagArticleList"
      :article="item.article"
      :key="index"
    />
  </Layout>
</template>

<script>
import { CheckboxButton } from "element-ui";
import ArticleCard from "components/common/ArticleCard/ArticleCard";
import Layout from "components/common/Layout";

export default {
  components: { ArticleCard, Layout },
  async asyncData(ctx) {
    let tag = ctx.params.tag;
    if (!tag) {
      ctx.redirect("/404");
      return;
    }
    let { data } = await ctx.$axios.get(`/tags/${tag}`);
    if (data) {
      return {
        tagData: data.data
      };
    } else {
      ctx.redirect("/404");
    }
  },
  computed: {
    tags() {
      return this.$store.state.init.tags;
    }
  }
};
</script>

<style lang="scss">
.page-tag-root {
  .LayoutHeader {
    padding: 0 20px;
  }
  .articleTag {
    background-color: $light;
    color: $text-light;
    border: none;
    box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.04);
    padding: 5px 10px;
    > span {
      display: flex;
      align-items: center;
    }
  }
  .tagCount {
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-radius: 50%;
    overflow: hidden;
    background-color: $root;
    color: $light;
    font-weight: $w600;
    font-size: $small-base;
    display: inline-block;
    margin: 0 3px;
  }
}
</style>
