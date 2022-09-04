import { storageSVC } from '@/services/storage.service';
import { streamSVC } from '@/services/stream.service';

export default {
	namespaced: true,
	state: {},
	getters: {},
	mutations: {},
	actions: {
		async connect ({ commit }, data) {
			try {
				const res = await streamSVC.connect(data);
				return res;
			} catch (error) {
				console.debug('stream/connect error:', error);
				commit('errors/REQUEST_ERROR', { error: true, message: error.message }, { root: true });
				return error;
			}
		},

		async disconnect ({ commit }, data) {
			try {
				const res = await streamSVC.disconnect(data);
				return res;
			} catch (error) {
				console.debug('stream/disconnect error:', error);
				commit('errors/REQUEST_ERROR', { error: true, message: error.message }, { root: true });
				return false;
			}
		},

		async stream ({ commit }, data) {
			try {
				const res = await streamSVC.stream(data);
				return res;
			} catch (error) {
				commit('errors/REQUEST_ERROR', { error: true, message: error.message }, { root: true });
				return false;
			}
		},

		async logout ({ commit }) {
			try {
				storageSVC.clear();
				commit('SET_IS_AUTHENTICATED', false);
			} catch (error) {
				commit('errors/REQUEST_ERROR', error, { root: true });
				return false;
			}
		}
	}
};
