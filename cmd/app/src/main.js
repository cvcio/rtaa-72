import Vue from 'vue';
import { sync } from 'vuex-router-sync';

// Components
import { grpc } from '@/api';
import router from '@/router';
import store from '@/store';

import vuetify from '@/plugins/vuetify';
import App from '@/App.vue';

// Global Packages
import moment from 'moment';

Vue.config.productionTip = process.env.NODE_ENV === 'development';
Vue.config.performance = process.env.NODE_ENV === 'development';

// Set Global Packages
Vue.prototype.$moment = moment;

// Enviroment Variables
Vue.prototype.$APP_VERSION = require('../package.json').version;
Vue.prototype.$APP_GRPC = process.env.VUE_APP_GRPC || 'http://localhost:8000';
Vue.prototype.$APP_TITLE = process.env.VUE_APP_TITLE;

// Init Base
// api.init(Vue.prototype.$APP_GRPC);
grpc.init(Vue.prototype.$APP_GRPC);

sync(store, router);

// Create Application
new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
	created () {
		this.$router.push('/');
	}
}).$mount('#app');
