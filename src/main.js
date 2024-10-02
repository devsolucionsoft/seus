import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import axios from './plugins/axios'

/* const api = axios.create({
    baseURL: 'http://3.233.173.228:5003/',
    headers: {
        "Content-Type": "application/json",
    },
});
app.config.globalProperties.$axios = api; */

const app = createApp(App)

app.use(axios)
app.use(ElementPlus)
app.use(router)
app.mount('#app')