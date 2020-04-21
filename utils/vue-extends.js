import Vue from "vue";
export const layoutExtends = {
  data() {
    return {
      localRoute: undefined,
    }
  },
  provide() {
    let state = Vue.observable({
      root: this
    });
    return state;
  },
  methods: {
    setLocalRoute(route) {
      this.localRoute = route;
    }
  }
}
