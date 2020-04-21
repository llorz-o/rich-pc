<template>
  <Layout modifier="archives">
    <template slot="header">
      <div class="archivesHeader">
        <BreadCrumb
          :paths="[
            {
              text: '归档'
            }
          ]"
        />
      </div>
    </template>

    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in localArchivesList"
          :key="index"
          :color="activity.color"
          :timestamp="activity.timestamp"
          placement="top"
        >
          <el-card>
            <h4 @click="onClickCard(activity.id)">{{ activity.title }}</h4>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </Layout>
</template>

<script>
import Layout from "components/common/Layout";
import BreadCrumb from "components/common/BreadCrumb.vue";
import { createTime } from "~/utils/dateFormat";
import { randomDartColor } from "~/utils/generate";
export default {
  components: {
    Layout,
    BreadCrumb
  },
  inject: ["root"],
  async asyncData(ctx) {
    let { data } = await ctx.$axios.get("/archives");
    if (data && data.ok) {
      return {
        archivesList: data.data
      };
    }
  },
  data() {
    return {
      activities: [
        {
          title: "支持使用图标",
          timestamp: "2018-04-12 20:46"
        },
        {
          title: "支持自定义颜色",
          timestamp: "2018-04-03 20:46"
        },
        {
          title: "支持自定义尺寸",
          timestamp: "2018-04-03 20:46"
        },
        {
          title: "默认样式的节点",
          timestamp: "2018-04-03 20:46"
        }
      ]
    };
  },
  computed: {
    localArchivesList() {
      if (this.archivesList) {
        let color, lastMonth;
        return this.archivesList.map(item => {
          let { year, month, day } = createTime(item.date);
          if (lastMonth === undefined || lastMonth !== month) {
            color = `rgb(${randomDartColor().join(",")})`;
            lastMonth = month;
          }
          return {
            title: item.title,
            id: item._id,
            timestamp: `${year}-${month}-${day}`,
            color
          };
        });
      }
      return [];
    }
  },
  methods: {
    onClickCard(id) {
      this.$router.replace(`/article/${id}`);
    }
  },
  created() {
    this.root.setLocalRoute("/archives");
  }
};
</script>

<style lang="scss">
#page-archives-root.page-archives-root {
  .LayoutMain {
    padding : {
      top: 15px;
      bottom: 15px;
    }
    .el-card {
      display: inline-block;
      cursor: pointer;
      .el-card__body {
        padding: 0;
        h4 {
          padding: 20px;
        }
      }
    }
  }
}
</style>
