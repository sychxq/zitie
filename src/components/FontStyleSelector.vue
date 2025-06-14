<!--字帖字体样式-->
<template>
  <el-form-item label="字体样式">
    <el-select v-model="selectedFontStyle" placeholder="选择字体样式" @change="handleFontChange">
      <el-option v-for="item in fontStyleOptions" :key="item.value" :label="item.label" :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right">{{ item.value }}</span>
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script setup>
import { ref } from 'vue';
// 引入 font-mapping.json 文件
import fontMapping from '../assets/fonts/font-mapping.json';

// 使用 font-mapping.json 中的数据作为字体选项
const fontStyleOptions = fontMapping;

// 初始化选中的字体样式，这里可以根据需要修改默认值
const selectedFontStyle = ref(fontStyleOptions[0].value);

// 定义自定义事件
const emits = defineEmits(['fontChanged']);

// 处理字体选择变化
const handleFontChange = (font) => {
  emits('fontChanged', font);
};
</script>