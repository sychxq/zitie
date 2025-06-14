<!--字帖页面尺寸选择-->
<!--字帖页面尺寸选择-->
<template>
  <el-form :label-position="labelPosition">
    <el-form-item label="页面尺寸">
      <el-select v-model="selectedSize" placeholder="选择页面尺寸" @change="onSizeChange">
        <el-option v-for="item in pageSizeOptions" :key="item.value" :label="item.label" :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right">{{ item.value }}</span>
        </el-option>
      </el-select>
      <!-- 新增 el-form-item 用于显示尺寸 label -->
    </el-form-item>
    <el-form-item style="color:deeppink;margin-top:20px;margin-bottom:20px" v-if="showCustomInput">
      <template #label>
        <span style="color:deeppink;">定义尺寸</span>
      </template>
      <el-space>
        <el-input-number style="width: 60px;" :min=0 :controls="false" v-model="customWidth" @change="onCustomSizeChange" />
        <span>*</span>
        <el-input-number style="width: 60px;" :min=0 :controls="false" v-model="customHeight" @change="onCustomSizeChange" />
        <span>mm</span>
      </el-space>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';

const emits = defineEmits(['sizeChanged']);

const pageSizeOptions = [
  { value: '210*297 mm', label: 'A4' },
  { value: '195*270 mm', label: '16K' },
  { value: '自定义', label: '自定义' }
];

const selectedSize = ref('210*297 mm');
const showCustomInput = ref(false);
const customWidth = ref(210);
const customHeight = ref(297);
const labelPosition = ref('right'); // 设置标签位置为右侧

const onSizeChange = (value) => {
  if (value === '自定义') {
    showCustomInput.value = true;
  } else {
    showCustomInput.value = false;
    const [width, height] = value.split('*');
    customWidth.value = parseInt(width);
    customHeight.value = parseInt(height.split(' ')[0]);
    emits('sizeChanged', {
      width: customWidth.value,
      height: customHeight.value,
      unit: 'mm'
    });
  }
};

const onCustomSizeChange = () => {
  emits('sizeChanged', {
    width: customWidth.value,
    height: customHeight.value,
    unit: 'mm'
  });
};
</script>

<style scoped>
/* 修正：同时覆盖 focus 和 active 状态的边框颜色 */
:v-deep .el-input__wrapper.is-focus,
:v-deep .el-input-number.is-focus .el-input__inner,
:v-deep .el-input-number.is-active .el-input__inner {
  border-color: deeppink !important;
  box-shadow: 0 0 0 1px rgba(255, 20, 147, 1) !important;
}

/* 输入框文本颜色 */
:v-deep .el-input-number .el-input__inner {
  color: deeppink;
}
</style>