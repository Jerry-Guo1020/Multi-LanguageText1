import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n' // 引入已经配置好的 i18n 实例
import './style.css'

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
