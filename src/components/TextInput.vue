<!--字帖内容-->
<template>
  <el-form-item label="字帖内容">
    <!-- 绑定 modelValue -->
    <el-input 
      v-model="localTextContent" 
      style="width: 180mm;"  
      :autosize="{ minRows: 2, maxRows: 5 }"  
      type="textarea"
      placeholder="请输入字帖内容" 
      @input="onTextChange" 
    />
  </el-form-item>
</template>

<script setup>
import { ref, watch } from 'vue';
// 接收 modelValue
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emits = defineEmits(['textChanged', 'update:model-value']);

// 使用一个本地变量来绑定输入框的值
const localTextContent = ref(props.modelValue);

// 监听 modelValue 的变化
watch(() => props.modelValue, (newValue) => {
  localTextContent.value = newValue;
});

const onTextChange = () => {
  emits('textChanged', localTextContent.value);
  emits('update:model-value', localTextContent.value);
};
</script>

<style scoped>
/* 自定义输入框内部样式 */
.el-textarea__inner {
  overflow-y: auto;         /* 超过高度时显示垂直滚动条 */
  resize: none;             /* 禁止用户手动调整大小 */
  line-height: 6mm;         /* 假设每行高度为6mm */
  max-height: 120mm;        /* 20行 * 6mm = 120mm */
}
</style>