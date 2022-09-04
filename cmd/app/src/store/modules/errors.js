export default {
	namespaced: true,
	state: {
		error: false,
		message: ''
	},
	getters: {
		error: state => state.error,
		message: state => state.message
	},
	mutations: {
		REQUEST_ERROR (state, data) {
			state.error = true;
			state.message = data;
		}
	}
};
