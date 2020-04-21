<template>
  <div>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <p>Count: {{ count }}</p>
  </div>
</template>

<style lang="scss" scoped>
button {
  background-color: blueviolet;
  color: white;
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  }
});
</script>
