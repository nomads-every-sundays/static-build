import '../sass/main.scss';

// Create our app
import Vue from 'vue';
import { createApp } from 'vue';
import App from './App.vue';

import Header from './components/Header.vue';
// createCommentVNode('Header');

Vue.component('Header');

createApp(App).mount("#app");
