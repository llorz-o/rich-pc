<template>
  <div class="CommentInjectBar">
    <slot></slot>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  provide() {
    this._state = Vue.observable({
      messageId: "", // 消息 id
      isMaster: true, // 当前回复的是否是楼主
      nick: "" // 目标人nick
    });

    return {
      _d: this._state,
      _refresh: this.refresh,
      _clear: this.clear
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
    }
  }
};
</script>
