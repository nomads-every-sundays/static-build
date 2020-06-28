import '../sass/main.scss';

// Create our app
import Vue from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

// Add font-awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons/faUserSecret';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserSecret);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component(Header.name , Header);
Vue.component(Footer.name, Footer);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
});
