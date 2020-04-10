<template>
  <div class="CommentInjectBar">
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";
const COMMENT_ACTIVE_CLASS = "comment--active";
export default {
  data() {
    return {
      currentCommentBlock: null
    };
  },
  provide() {
    this._state = Vue.observable({
      messageId: "", // 消息 id
      isMaster: true, // 当前回复的是否是楼主
      nick: "" // 目标人nick
    });

    return {
      _d: this._state,
      _refresh: this.refresh,
      _clear: this.clear,
      _parent: this // 当前组件
    };
  },
  methods: {
    refresh({ isMaster, messageId, nick }) {
      this._state.isMaster = isMaster;
      this._state.messageId = messageId;

      this._state.nick = nick;
    },
    clear() {
      this._state.isMaster = true;
      this._state.messageId = "";
      this._state.nick = "";
    },
    recordingCurrentCommentBlockHandle(handle) {
      if (handle instanceof Vue) {
        if (this.currentCommentBlock) {
          this.currentCommentBlock.classList.remove(COMMENT_ACTIVE_CLASS);
        }
        this.currentCommentBlock = handle.$el;
        this.currentCommentBlock.classList.add(COMMENT_ACTIVE_CLASS);
      }
    },
    clearRecordingBlockHandle() {
      this.currentCommentBlock.classList.remove(COMMENT_ACTIVE_CLASS);
      this.currentCommentBlock = null;
    }
  }
};
</script>
