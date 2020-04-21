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
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const count = ref(0);
    const increment = () => count.value++;
    const decrement = () => count.value--;

    return { count, increment, decrement };
  }
});
</script>
