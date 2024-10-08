import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import 'vue-multiselect/dist/vue-multiselect.min.css';

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.mount("#app");
