import './assets/main.css'
import './assets/style.scss';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Primevue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Primevue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '',
        }
    }
})
app.use(ConfirmationService)
app.use(ToastService)

app.mount('#app')
