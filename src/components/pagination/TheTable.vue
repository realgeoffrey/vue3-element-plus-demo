<template>
  <el-table ref="tableRef" :data="tableData" max-height="500">
    <el-table-column prop="0" label="值1" />
    <el-table-column prop="1" label="值2" />
    <el-table-column prop="2" label="值3" />
    <el-table-column prop="3" label="巡查时间" />
  </el-table>
</template>

<script setup>
import { watch, ref } from 'vue'
const props = defineProps({
  tableData: {
    type: Array,
    default: () => [
      // {
      //   0: '',
      //   1: '',
      //   2: '',
      //   3: '',
      // },
    ],
  },
})
const tableRef = ref(null)
watch(
  () => props.tableData,
  () => {
    tableRef.value?.setScrollTop(0)
    tableRef.value?.setScrollLeft(0)
  },
)
</script>
