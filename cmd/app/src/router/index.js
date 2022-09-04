import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import { storageSVC } from '@/services/storage.service';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		query: {},
		component: () => import(/* webpackChunkName: "home" */ '@/views/app/home.vue'),
		meta: {
			authorize: []
		}
	},
	{
		path: '/dashboard/:id',
		name: 'dashboard',
		query: { method: null, id: null, nonce: null, screenName: '', firstName: '' },
		component: () => import(/* webpackChunkName: "dashboard" */ '@/views/app/dashboard.vue'),
		meta: {
			authorize: []
		}
	},
	{
		path: '/bookmarks',
		name: 'bookmarks',
		query: { method: null, id: null, nonce: null, screenName: '', firstName: '' },
		component: () => import(/* webpackChunkName: "bookmarks" */ '@/views/app/bookmarks.vue'),
		meta: {
			authorize: []
		}
	},
	{
		path: '/about',
		name: 'about',
		component: () => import(/* webpackChunkName: "static" */ '@/views/static/about.vue'),
		meta: {
			authorize: []
		}
	},
	{
		path: '/settings',
		name: 'settings',
		component: () => import(/* webpackChunkName: "settings" */ '@/views/settings/settings.vue'),
		meta: {
			authorize: []
		}
	},
	{
		path: '/auth/authenticate',
		name: 'authenticate',
		component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/authenticate'),
		meta: {
			requiresEmptyToken: true
		}
	},
	{
		path: '/auth/verify',
		name: 'verify',
		component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/verify'),
		meta: {
			requiresEmptyToken: true
		}
	},
	{ path: '*', redirect: '/' }
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach(async (to, from, next) => {
	// restore vuex-persist state
	// await store.restored;

	if (store.state.app.openNewDashboard) {
		store.dispatch('app/setOpenNewDashboard', false);
	}

	const { authorize, requiresEmptyToken } = to.meta;
	const currentUser = !!storageSVC.getToken();

	if (authorize) {
		if (!currentUser) {
			return next({
				path: '/auth/authenticate',
				query: {
					redirect: to.fullPath
				}
			});
		}
	}
	// Restrict User to visit auth pages while loggedin
	if (currentUser && requiresEmptyToken) {
		return next({
			path: '/'
		});
	}

	next();
});

export default router;
