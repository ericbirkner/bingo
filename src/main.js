import { createApp } from "vue";
import App from "./App.vue";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createStore } from "vuex" ;


const store = createStore({
    state: {
        cantados:[]
    },
    mutations: {
        addNumero (state, numero) {
            state.cantados.push(numero);
        }
    }
})

createApp(App).use(store).mount("#app");
