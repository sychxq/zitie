<template>
  <div ref="gridsContentRef" class="gridsContent" :style="{ width: gridsContentWidth }">
    <el-card
      v-for="(cardChars, index) in splitTextIntoCards"
      :key="index"
      class="gridsCard"
      :style="cardStyle"
    >
      <div class="grids-container">
        <GridsBoxs
          v-for="(char, charIndex) in cardChars"
          :key="`${index}-${charIndex}`"
          :dataChars="[char]"
          :boxSizeSet="boxSize"
          :fontFamily="fontFamily"
          :boxColor="boxColor"
          :textColor="textColor"
          :gridType="gridType"
        />
      </div>
      <!-- 动态显示页码 -->
      <div class="footerCss">-第{{ index + 1 }}页-</div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import GridsBoxs from './GridsBoxs.vue';

const props = defineProps({
  selectedSize: {
    type: Object,
    required: true
  },
  documentWidth: {
    type: Number,
    required: true
  },
  textContent: {
    type: Array,
    required: true
  },
  boxSize: {
    type: Number,
    required: true
  },
  fontFamily: {
    type: String,
    required: true
  },
  boxColor: {
    type: String,
    required: true
  },
  textColor: {
    type: String,
    required: true
  },
  gridType: {
    type: String,
    required: true
  },
});

const gridsContentRef = ref(null);

const gridsContentPadding = ref(10);
const gridsContentMargin = ref(5);
// 计算卡片样式
const cardStyle = computed(() => {
  const width = props.selectedSize.width;
  const height = props.selectedSize.height;
  const ratio = (width / height).toFixed(2);
  const padding = gridsContentPadding.value;
  const margin = gridsContentMargin.value;
  return {
    '--aspect-ratio': `${ratio}`,
    width: `${width}mm`,
    height: `${height}mm`,
    overflow: 'hidden', // 防止内容溢出
    padding: `${padding}mm`,
    marginBottom: `${margin}mm`,
    position: 'relative' // 为 footer 定位做准备
  };
});

const gridsContentWidth = computed(() => {
  const minWidth = props.selectedSize.height * 0.05;
  const baseWidth = props.selectedSize.width * 0.05;
  const availableWidth = props.documentWidth - 400;
  const finalWidth = Math.max(minWidth, Math.min(baseWidth, availableWidth));
  return `${finalWidth}px`;
});

// 计算每个卡片能容纳的格子数量
const capacityPerCard = computed(() => {
  const cardWidth = props.selectedSize.width - 2 * gridsContentPadding.value;
  const cardHeight = props.selectedSize.height - 2 * gridsContentPadding.value;
  const boxSize = props.boxSize;
  const boxSizeWithMargin = boxSize + 0.6 * 2; // 左右和上下都有 margin

  // 计算每行和每列能容纳的格子数
  const cols = Math.floor(cardWidth / boxSizeWithMargin);
  console.log(cardWidth / boxSizeWithMargin);
  const rows = Math.floor(cardHeight / boxSizeWithMargin);

  // 计算总容量
  const totalCapacity = cols * rows;

  console.log(`卡片尺寸: ${cardWidth}mm x ${cardHeight}mm`);
  console.log(`格子尺寸: ${boxSize}mm + 1mm margin`);
  console.log(`每行格子数: ${cols}, 每列格子数: ${rows}`);
  console.log(`总容量: ${totalCapacity}`);

  return totalCapacity;
});

// 将文本内容按卡片容量分割
const splitTextIntoCards = computed(() => {
  const result = [];
  const { textContent } = props;

  if (textContent.length === 0) {
    result.push([]); // 如果文本内容为空，添加一个空数组作为默认卡片内容
  } else {
    for (let i = 0; i < textContent.length; i += capacityPerCard.value) {
      result.push(textContent.slice(i, i + capacityPerCard.value));
    }
  }

  console.log(`分割结果: ${result.length} 页`);
  return result;
});

const handleResize = () => {
  // 触发 cardStyle 重新计算
  cardStyle.value;
  console.log('Window resized, recalculating card style');
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.gridsContent {
  margin-left: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.gridsCard {
  /* 使用 CSS 变量设置长宽比 */
  aspect-ratio: var(--aspect-ratio);
  /* 移除可能的边框和阴影样式 */
}

.grids-container {
  display: flex;
  flex-wrap: wrap;
}

.footerCss {
  position: absolute;
  bottom: 5mm; /* 距离底部的距离 */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
/* 打印样式 */
@media print {
  .grids-container {
    page-break-after: always; /* 每个 grids-container 后强制分页 */
  }
  /* 确保打印时也没有边框和阴影 */
  .gridsCard {
    border: none;
    box-shadow: none;
  }
}
</style>