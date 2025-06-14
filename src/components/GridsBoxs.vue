<template>
  <!-- 通用网格组件容器 -->
  <div class="box-container">
    <!-- 显示合并后的字符 -->
    <div class="box_css" :style="boxStyle">
      <!-- 水平中心线 -->
      <div v-if="showHorizontalLine" class="grid-line horizontal" :class="{ 'dashed-line': isDashedLine }" :style="{ borderTopColor: boxColor }"></div>
      <!-- 垂直中心线 -->
      <div v-if="showVerticalLine" class="grid-line vertical" :class="{ 'dashed-line': isDashedLine }" :style="{ borderRightColor: boxColor }"></div>
      <!-- 左上到右下对角线 -->
      <div v-if="showDiagonal1Line" class="grid-line diagonal-1" :class="{ 'dashed-line': isDashedLine }" :style="{ borderTopColor: boxColor }"></div>
      <!-- 右上到左下对角线 -->
      <div v-if="showDiagonal2Line" class="grid-line diagonal-2" :class="{ 'dashed-line': isDashedLine }" :style="{ borderTopColor: boxColor }"></div>
      <!-- 显示字符的区域 -->
      <div class="writecss" :style="{ fontFamily: fontFamily, color: textColor }">{{ combinedChars }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, computed } from 'vue';

// 定义组件的属性
const props = defineProps({
  // 要显示的字符数组
  dataChars: {
    type: Array,
    default: () => []
  },
  // 网格的大小
  boxSizeSet: {
    type: Number,
    default: 40, // 增大默认值以便更好地显示
    validator: (value) => value > 0
  },
  // 字体族
  fontFamily: {
    type: String,
    default: ''
  },
  // 网格的边框颜色
  boxColor: {
    type: String,
    default: '' // 使用半透明黑色
  },
  // 文本的颜色
  textColor: {
    type: String,
    default: ''
  },
  // 网格类型，可选值: 'FZG'（方字格）, 'TZG'（田字格）, 'MZG'（米字格）
  gridType: {
    type: String,
    default: 'FZG',
    validator: (value) => ['FZG', 'TZG', 'MZG'].includes(value)
  }
});

// 将 props 转换为响应式引用
const { boxSizeSet, boxColor, gridType, dataChars, fontFamily, textColor } = toRefs(props);
const unit = ref('mm');

// 动态计算网格的样式
const boxStyle = computed(() => {
  return {
    width: `${boxSizeSet.value}${unit.value}`,
    height: `${boxSizeSet.value}${unit.value}`,
    lineHeight: `${boxSizeSet.value}${unit.value}`,
    fontSize: `${boxSizeSet.value * 0.8}${unit.value}`,
    position: 'relative', // 确保内部绝对定位元素相对于此容器
    border: `0.6${unit.value} solid ${boxColor.value}`
  };
});

// 判断是否显示水平中心线
const showHorizontalLine = computed(() => ['TZG', 'MZG'].includes(gridType.value));
// 判断是否显示垂直中心线
const showVerticalLine = computed(() => ['TZG', 'MZG'].includes(gridType.value));
// 判断是否显示左上到右下对角线
const showDiagonal1Line = computed(() => gridType.value === 'MZG');
// 判断是否显示右上到左下对角线
const showDiagonal2Line = computed(() => gridType.value === 'MZG');

// 判断是否使用虚线样式
const isDashedLine = computed(() => gridType.value === 'MZG');

// 合并字符数组为一个字符串
const combinedChars = computed(() => dataChars.value.join(''));
</script>

<style scoped>
.box-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.box_css {
  margin: 0.5mm;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* 确保内部绝对定位元素相对于此容器 */
}

/* 网格线样式 */
.grid-line {
  position: absolute;
  background-color: rgba(0, 0, 0, 0); /* 半透明线 */
}

.horizontal {
  width: 100%;
  height: 0.5px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 0.5mm dashed;
}

.vertical {
  width: 0.5px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-right: 0.5mm dashed;
}

.diagonal-1 {
  width: 141.4%; /* 对角线长度: √(100²+100²) */
  height: 0.5px;
  top: 50%;
  left: -20.7%; /* (100% - 141.4%) / 2 */
  transform: rotate(45deg);
  transform-origin: center;
  border-top: 0.5mm dashed;
}

.diagonal-2 {
  width: 141.4%;
  height: 0.5px;
  top: 50%;
  left: -20.7%;
  transform: rotate(-45deg);
  transform-origin: center;
  border-top: 0.5mm dashed;
}

.writecss {
  position: relative;
  text-align: center;
  z-index: 1;
  pointer-events: none; /* 避免干扰网格线的点击 */
}
</style>