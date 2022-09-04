import { storageSVC } from '@/services/storage.service';

export default {
	namespaced: true,
	state: {
		profile: storageSVC.getToken()
	},
	getters: {
		profile: state => state.profile
	},
	mutations: {
		SET_PROFILE (state, data) {
			state.profile = data;
		}
	},
	actions: {
		setProfile () {}
	}
};
