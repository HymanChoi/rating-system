import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import naive from "naive-ui";
import "vfonts/Lato.css"; // 通用字体
import "vfonts/FiraCode.css"; // 等宽字体

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(naive);

app.mount("#app");
