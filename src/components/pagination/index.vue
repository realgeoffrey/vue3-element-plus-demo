<template>
  <div v-loading="isLoading">
    <SearchForm
      @searchTheForm="
        (data) => {
          formData = data
          resetPaginationCurrentAndSearch()
        }
      "
    />
    <TheTable :table-data="apiData.list" />
    <ThePagination
      v-model:current-page="apiData.pagination.current"
      v-model:page-size="apiData.pagination.pageSize"
      v-model:total="apiData.pagination.total"
    />
  </div>
</template>

<script setup>
import { ref, watch, reactive, nextTick } from 'vue'
import SearchForm from './SearchForm.vue'
import TheTable from './TheTable.vue'
import ThePagination from './ThePagination.vue'
import { fetch } from '@/utils'

const isLoading = ref(false)

// 保存搜索条件
const formData = ref({
  propA: '',
  propB: [],
})
// 数据信息（翻页+table数据）
const apiData = reactive({
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  list: [],
})

// 手动翻页 或 页数变化导致翻页
watch(
  () => apiData.pagination.current,
  (newCurrent) => {
    if (newCurrent > 0) {
      search(newCurrent)
    }
  },
)
// 页数变化
watch(
  () => apiData.pagination.pageSize,
  () => {
    resetPaginationCurrentAndSearch()
  },
)
// 搜索
const search = async (current = 1) => {
  try {
    isLoading.value = true
    const res = await fetch({
      ...formData.value,
      current,
      pageSize: apiData.pagination.pageSize,
    })
    if (res?.pagination && res?.list) {
      Object.assign(apiData.pagination, res.pagination)
      apiData.list = res.list
    } else {
      apiData.list = []
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const resetPaginationCurrentAndSearch = () => {
  apiData.pagination.current = 0
  nextTick(() => {
    apiData.pagination.current = 1
  })
}

resetPaginationCurrentAndSearch()
</script>
