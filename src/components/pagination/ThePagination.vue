<template>
    <el-pagination
      :current-page="currentPage"
      @update:current-page="emit('update:currentPage', $event)"
      :page-size="pageSize"
      @update:page-size="emit('update:pageSize', $event)"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
    />
</template>

<script setup>
const emit = defineEmits(['update:currentPage', 'update:pageSize'])

defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
})
</script>
