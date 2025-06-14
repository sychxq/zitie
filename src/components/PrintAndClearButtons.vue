<!--打印和清空按钮-->
<template>
  <el-form-item>
    <!-- 使用 v-print 指令 -->
    <el-button class="print_css" type="primary" v-print="print">打印</el-button>
    <el-button class="print_css" type="danger" @click="clearText">清空</el-button>
  </el-form-item>
</template>

<script setup>
import { ref } from 'vue';

const emits = defineEmits(['clear']);

const print = ref({
  id: 'printBox'
});

const clearText = () => {
  emits('clear');
};
</script>