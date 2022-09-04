import { storageSVC } from '@/services/storage.service';
import { authSVC } from '@/services/auth.service';

export default {
	namespaced: true,
	state: {
		isAuthenticated: false
	},
	getters: {
		isAuthenticated: state => state.isAuthenticated
	},
	mutations: {
		SET_IS_AUTHENTICATED (state, data) {
			state.isAuthenticated = data;
		}
	},
	actions: {
		setIsAuthenticated ({ commit }, data) {
			commit('SET_IS_AUTHENTICATED', data);
		},

		async obb ({ commit }, data) {
			try {
				const res = await authSVC.obb(data);
				return res;
			} catch (error) {
				commit('errors/REQUEST_ERROR', { error: true, message: error.message }, { root: true });
				return false;
			}
		},

		async verify ({ commit }, data) {
			try {
				const res = await authSVC.verify(data);
				return res;
			} catch (error) {
				console.log(error);
				commit('errors/REQUEST_ERROR', { error: true, message: error.message }, { root: true });
				return false;
			}
		},

		async logout ({ commit }) {
			try {
				storageSVC.clear();
				commit('SET_IS_AUTHENTICATED', false);
				commit('profile/SET_PROFILE', false, { root: true });
			} catch (error) {
				commit('errors/REQUEST_ERROR', error, { root: true });
				return false;
			}
		},

		async loginWithToken ({ commit }, data) {
			try {
				console.log(data);
				storageSVC.setIntro('local');
				storageSVC.setToken(data);

				commit('SET_IS_AUTHENTICATED', true);
				commit('profile/SET_PROFILE', data, { root: true });
				return true;
			} catch (error) {
				console.log(error);
				commit('errors/REQUEST_ERROR', error, { root: true });
				return false;
			}
		}
	}
};
