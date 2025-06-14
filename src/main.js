import { createApp } from "vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Vue3Print from 'vue3-print-nb';
import App from "./App.vue";
import './assets/fonts/font.css';
// 注册 ElementPlus 图标
function registerElementPlusIcons(app) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
    }
}


const app = createApp(App);
registerElementPlusIcons(app);
app.use(Vue3Print);
app.mount('#app');