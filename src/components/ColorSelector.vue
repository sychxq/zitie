<!--字帖颜色设置-->
<template>
  <div class="color-selector">
    <el-form-item label="边框颜色" label-for="border-color">
      <el-color-picker id="border-color" v-model="borderColor" show-alpha @change="handleBorderColorChange" />
    </el-form-item>
    <el-form-item label="字体颜色" label-for="font-color">
      <el-color-picker id="font-color" v-model="fontColor" show-alpha @change="handleFontColorChange" />
    </el-form-item>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emits = defineEmits(['borderColorChanged', 'fontColorChanged']);

const borderColor = ref('rgba(85, 187, 138,1)');
const fontColor = ref('rgba(116, 120, 122,1)');

const handleBorderColorChange = (color) => {
  emits('borderColorChanged', color);
};

const handleFontColorChange = (color) => {
  emits('fontColorChanged', color);
};
</script>

<style scoped>
.color-selector {
  display: flex;
  gap: 20px;
  /* 两个表单项之间的间距 */
}
</style>