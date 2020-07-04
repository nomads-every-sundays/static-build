import '../sass/main.scss';

// Create our app
import Vue from 'vue';

// Add components
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

// Font Awesome
import { FontAwesomeIcon } from './vendor/font-awesome-load';


// My Components
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component(Header.name , Header);
Vue.component(Footer.name, Footer);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
});
