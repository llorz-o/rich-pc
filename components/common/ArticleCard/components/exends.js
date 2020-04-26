import Vue from 'vue'
export const articleCardExtend = Vue.extend({
  props: {
    info: {
      type: Object,
      default: () => ({
        title: 'title',
        desc: '描述',
        auth: "作者",
        date: new Date(),
        messageCount: 0,
        likeCount: 0,
        viewCount: 0,
      })
    }
  },
})
