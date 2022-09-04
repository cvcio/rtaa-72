const storageSVC = {
	getToken () {
		return JSON.parse(localStorage.getItem('token')) || null;
	},

	setToken (token) {
		localStorage.setItem('token', JSON.stringify(token));
	},

	removeToken () {
		localStorage.removeItem('token');
	},

	getIntro () {
		return JSON.parse(localStorage.getItem('introduction')) || JSON.parse(sessionStorage.getItem('introduction'));
	},

	setIntro (store) {
		if (store === 'local') {
			localStorage.setItem('introduction', true);
		} else if (store === 'session') {
			sessionStorage.setItem('introduction', true);
		}
	},

	removeIntro () {
		localStorage.removeItem('introduction');
		sessionStorage.removeItem('introduction');
	},

	getSettings () {
		return JSON.parse(localStorage.getItem('settings')) || JSON.parse(sessionStorage.getItem('settings'));
	},

	setSettings (data) {
		localStorage.setItem('settings', JSON.stringify(data));
	},

	removeSettings () {
		localStorage.removeItem('settings');
	},

	clear () {
		localStorage.removeItem('token');
		localStorage.removeItem('introduction');
		sessionStorage.removeItem('introduction');
	}
};

export {
	storageSVC
};
