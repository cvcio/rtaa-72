import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'fa'
	},
	theme: {
		themes: {
			light: {
				accent: '#1524D9',
				primary: '#0F0F18',
				secondary: '#ED2038',
				error: '#FF5252',
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FFC107'
			},
			dark: {
				accent: '#1524D9',
				primary: '#0F0F18',
				secondary: '#ED2038',
				error: '#FF5252',
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FFC107'
			}
		},
		options: {
			minifyTheme: function (css) {
				return process.env.NODE_ENV === 'production'
					? css.replace(/[\r\n|\r|\n]/g, '')
					: css;
			}
		}
	}
});
