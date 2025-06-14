<template>
  <div class="container">
    <el-affix :offset="0">
      <el-card :style="{ width: cardWidth, height: cardHeight }">
        <template #header>
          <div class="card-header">字帖设置</div>
        </template>
        <el-form>
          <PageSizeSelector @sizeChanged="handleSizeChange" />
          <GridTypeSelector @typeChanged="handleGridTypeChange" />
          <GridSizeInput @sizeChanged="handleGridSizeChange" />
          <FontStyleSelector @fontChanged="handleFontChange" />
          <ColorSelector @borderColorChanged="handleBorderColorChange" @fontColorChanged="handleFontColorChange" />
          <!-- 添加 :model-value 和 @update:model-value -->
          <TextInput 
            :model-value="textContentStr" 
            @update:model-value="textContentStr = $event"
            @textChanged="handleTextChange" 
          />
          <PrintAndClearButtons @clear="handleClear" />
        </el-form>
      </el-card>
    </el-affix>

    <!-- 添加 id="printBox" -->
    <GridsContent
      id="printBox"
      :selectedSize="selectedSize"
      :documentWidth="documentWidth"
      :textContent="textContent"
      :boxSize="Number(boxSize)"
      :fontFamily="fontFamily"
      :boxColor="boxColor"
      :textColor="textColor"
      :gridType="gridType"
    />
  </div>
</template>

<script setup>
import PageSizeSelector from './PageSizeSelector.vue';
import GridTypeSelector from './GridTypeSelector.vue';
import GridSizeInput from './GridSizeInput.vue';
import FontStyleSelector from './FontStyleSelector.vue';
import ColorSelector from './ColorSelector.vue';
import TextInput from './TextInput.vue';
import PrintAndClearButtons from './PrintAndClearButtons.vue';
import GridsContent from './GridsContent.vue';

import { ref, onMounted } from 'vue';

const selectedSize = ref({
  width: 210,
  height: 297,
  unit: 'mm'
});

const cardWidth = ref('360px');
const cardHeight = ref('600px');

const textContent = ref([]);
const textContentStr = ref('');
const boxSize = ref(10);
const fontFamily = ref('ZKZT');
const boxColor = ref('rgba(85, 187, 138,1)');
const textColor = ref('rgba(116, 120, 122,1)');
const gridType = ref('MZG');

const documentWidth = ref(0);

const handleSizeChange = (size) => {
  selectedSize.value = size;
  console.log('Selected size:', selectedSize.value);
};

const handleGridSizeChange = (size) => {
  boxSize.value = size;
  console.log('Grid size:', boxSize.value);
};

const handleTextChange = (text) => {
  textContent.value = text.split('');
};

const handleClear = () => {
  textContent.value = [];
  textContentStr.value = '';
};

const handleGridTypeChange = (type) => {
  gridType.value = type;
  console.log('Selected grid type:', gridType.value);
};

const handleFontChange = (font) => {
  fontFamily.value = font;
  console.log('Selected font family:', fontFamily.value);
};

const handleBorderColorChange = (color) => {
  boxColor.value = color;
  console.log('Selected border color:', boxColor.value);
};

const handleFontColorChange = (color) => {
  textColor.value = color;
  console.log('Selected font color:', textColor.value);
};

onMounted(() => {
  documentWidth.value = document.documentElement.clientWidth;
});
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
</style>

<style>
/* 全局打印样式 */
@media print {
  body {
    margin: 0; /* 设置页面边距，避免内容铺满整页 */
    
  }
}
</style>