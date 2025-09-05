<template>
  <el-form ref="formRef" :model="formData">
    <el-form-item prop="propA">
      <el-select v-model="formData.propA" filterable clearable>
        <el-option
          v-for="item in [
            { value: 1, label: '合格' },
            { value: 2, label: '基本合格' },
            { value: 3, label: '不合格' },
          ]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item prop="propB">
      <el-date-picker v-model="formData.propB" type="daterange" value-format="YYYY-MM-DD" />
    </el-form-item>

    <el-form-item>
      <a @click="emit('searchTheForm', JSON.parse(JSON.stringify(toRaw(formData))))">查询</a>
      <a
        @click="
          () => {
            formRef?.resetFields()
            emit('searchTheForm', JSON.parse(JSON.stringify(toRaw(formData))))
          }
        "
        >重置</a
      >
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, toRaw } from 'vue'
const emit = defineEmits(['searchTheForm'])
const formRef = ref(null)
const formData = ref({
  propA: '',
  propB: [],
})
</script>
