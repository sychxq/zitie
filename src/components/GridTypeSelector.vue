<!--字帖格子类型选择-->
<template>
    <el-form-item label="格子类型">
        <el-select v-model="selectedType" placeholder="选择格子类型" @change="handleTypeChange">
            <el-option v-for="item in gridTypeOptions" :key="item.value" :label="item.label" :value="item">
                <!-- 左侧显示格子类型名称 -->
                <span style="float: left">{{ item.label }}</span>
                <!-- 右侧显示格子图示 -->
                <span style="float: right">
                    <el-image :src="item.value" fit="fill" />
                </span>
            </el-option>
        </el-select>
    </el-form-item>
</template>

<script setup>
import { ref } from 'vue';

import FZG from "../assets/gridsType/FZG.svg";
import MZG from "../assets/gridsType/MZG.svg";
import TZG from "../assets/gridsType/TZG.svg";

// 定义格子类型选项数组
const gridTypeOptions = [
    {
        value: FZG,
        label: '方字格',
        gridType: 'FZG'
    },
    {
        value: TZG,
        label: '田字格',
        gridType: 'TZG'
    },
    {
        value: MZG,
        label: '米字格',
        gridType: 'MZG'
    }
];

// 初始化选中的格子类型为方字格
const selectedType = ref(gridTypeOptions[2]);

const emits = defineEmits(['typeChanged']);

const handleTypeChange = () => {
    emits('typeChanged', selectedType.value.gridType);
};
</script>