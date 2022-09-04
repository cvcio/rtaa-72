import Vue from 'vue';
import Vuex from 'vuex';
// import VuexPersistence from 'vuex-persist';
// import localForage from 'localforage';
import modules from '@/store/modules';

// const vuexLocal = new VuexPersistence({
// 	storage: localForage,
// 	asyncStorage: true
// });

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules
	// plugins: [vuexLocal.plugin]
});
