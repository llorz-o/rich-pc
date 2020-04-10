<template>
  <div id="__Providor">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    p: Object,
  },
  provide() {
    return {};
  },
};
</script>
