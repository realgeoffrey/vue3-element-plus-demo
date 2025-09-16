<template>
  <div>
    <div>JsxSon</div>
    <div style="border: 1px solid #000;" @click="console.log($attrs)">
      $attrs:
      <p v-for="[key, value] in Object.entries($attrs)" :key="key">
        {{ `${key}: ${value}` }}
      </p>
    </div>

    <p>$props:{{ $props }}</p>
  </div>
</template>

<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()
console.log('$attrs', attrs)
const props = defineProps({
  // cc: {
  //   type: Number,
  //   required: true,
  // },
  // cC: {
  //   type: Number,
  //   required: true,
  // },
  // id: {},
  // props2: {}
})
console.log('$props', props)
</script>
<style scoped>
p {
  margin: 0;
}
</style>
