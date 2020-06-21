import '../sass/main.scss';

// Create our app
import Vue from 'vue';
import Header from "./components/Header.vue";
import Testing from "./components/Testing.vue";

Vue.component('Header', Header);
Vue.component('Testing', Testing);
// createApp(App).mount("#app");

new Vue({
    el: '#app',
});
