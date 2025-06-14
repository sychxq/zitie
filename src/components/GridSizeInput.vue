<!--字帖格子尺寸-->
<template>
  <el-form-item label="格子尺寸">
    <el-input v-model="gridSize" min="5" max="150" style="width: 50mm;margin-right: 1mm;" type="number"
      placeholder="请输入格子尺寸" @input="handleInputChange" />
    <span>mm</span>
  </el-form-item>
</template>

<script setup>
import { ref } from 'vue';

const emits = defineEmits(['sizeChanged']);
const gridSize = ref(10);// 默认值为12mm

const handleInputChange = () => {
  emits('sizeChanged', gridSize.value);
};
</script>