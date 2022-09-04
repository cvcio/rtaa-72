import { storageSVC } from '@/services/storage.service';
import { db } from '@/db';

export default {
	namespaced: true,
	state: {
		openNavigationDrawer: false,
		openNewDashboard: false,
		isIntro: storageSVC.getIntro(),
		showTour: false,
		dashboards: [],
		dashboard: null,
		accounts: [],
		tweets: [],
		media: [],
		articles: [],
		relationships: [],
		graph: {},
		settings: storageSVC.getSettings()
	},
	getters: {
		openNavigationDrawer: state => state.openNavigationDrawer,
		openNewDashboard: state => state.openNewDashboard,
		isIntro: () => storageSVC.getIntro(),
		showTour: state => state.showTour,
		dashboards: state => state.dashboards,
		dashboard: state => state.dashboard,
		accounts: state => state.accounts,
		tweets: state => state.tweets,
		media: state => state.media,
		articles: state => state.articles,
		relationships: state => state.relationships,
		graph: state => state.graph,
		settings: state => storageSVC.getSettings()
	},
	mutations: {
		SET_OPEN_NAVIGATION_DRAWER (state, data) {
			state.openNavigationDrawer = data;
		},
		SET_OPEN_NEW_DASHBOARD (state, data) {
			state.openNewDashboard = data;
		},
		SET_IS_INTRO (state, data) {
			state.isIntro = data;
		},
		SET_DASHBOARDS (state, data) {
			state.dashboards = data;
		},
		SET_DASHBOARD (state, data) {
			state.dashboard = data;
		},
		SET_SETTINGS (state, data) {
			state.settings = data;
		},
		SET_GRAPH (state, data) {
			state.graph = data;
		}
	},
	actions: {
		setOpenNewDashboard ({ commit }, data) {
			commit('SET_OPEN_NEW_DASHBOARD', data);
		},
		setOpenNavigationDrawer ({ commit }, data) {
			commit('SET_OPEN_NAVIGATION_DRAWER', data);
		},
		setIsIntro ({ commit }, data) {
			storageSVC.setIntro(data);
			commit('SET_IS_INTRO', true);
		},
		async getDashboards ({ commit }) {
			try {
				const dashboards = await db.dashboards.toArray();
				console.log(dashboards);
				commit('SET_DASHBOARDS', dashboards);
				return dashboards;
			} catch (error) {
				console.debug('getDashboards error: ', error);
				return error;
			}
		},
		async addDashboard ({ commit }, data) {
			try {
				const id = await db.dashboards.add(data);
				const dashboards = await db.dashboards.toArray();
				commit('SET_DASHBOARDS', dashboards);
				return id;
			} catch (error) {
				console.debug('addDashboard error:', error);
				return error;
			}
		},
		async getDashboard ({ commit }, id) {
			try {
				const dashboard = await db.dashboards.get({ id: id });
				commit('SET_DASHBOARD', dashboard);
				return dashboard;
			} catch (error) {
				console.debug('getDashboard error: ', error);
				return error;
			}
		},
		async removeDashboard ({ commit }, id) {
			try {
				await db.dashboards.delete(id);
				const dashboards = await db.dashboards.toArray();
				commit('SET_DASHBOARDS', dashboards);
				return dashboards;
			} catch (error) {
				console.debug('deleteDashboard error: ', error);
				return error;
			}
		},
		async setSettings ({ commit }, data) {
			try {
				storageSVC.setSettings(data);
				commit('SET_SETTINGS', data);
				return data;
			} catch (error) {
				console.debug('setSettings error:', error);
				return error;
			}
		}
	}
};
