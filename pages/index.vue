<template>
  <div class="container">
    <ArticleCard
      v-for="(item, index) in articles"
      :article="item"
      :key="index"
    />
    <!-- <nuxt-link
      v-for="(item, index) in articles"
      :key="index"
      :to="`/article/${item._id}`"
      class="articleCard"
    >
      <div class="articleCardTop">
        <el-row class="articleCardTitle">
          {{ item.title }}
        </el-row>
        <el-row class="articleCardDesc">
          {{ item.desc }}
        </el-row>
      </div>
      <div class="articleCardBottom">
        <ArticleBaseInfo
          :article="{
            auth: item.auth,
            date: item.date,
            messageCount: item.messageCount,
            tags: item.tags
          }"
        />
      </div>
    </nuxt-link> -->
  </div>
</template>

<script>
import ArticleCard from "components/common/ArticleCard";
export default {
  components: { ArticleCard },
  async asyncData({ $axios }) {
    let { data } = await $axios.get("/getArtivle");
    return {
      articles: data
    };
  }
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
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
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
