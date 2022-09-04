<template>
	<v-navigation-drawer :permanent="$vuetify.breakpoint.smAndUp" app dark :fixed="$vuetify.breakpoint.smAndUp"
		class="navigation accent lighten-1" width="360" :mini-variant="!openNavigationDrawer" mini-variant-width="72">
		<v-list-item two-line to="/">
			<v-list-item-avatar>
				<logo-cvcio :light="true" mono :W="32" :H="32"></logo-cvcio>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title class="white--text">RTAA&mdash;72</v-list-item-title>
				<v-list-item-subtitle>Intelligence Dashboard</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>
		<v-divider />
		<template v-if="profile">
		<v-list dense light class="py-0">
			<v-list-item v-for="(dashboard, i) in dashboards" :key="'dashboard-'+i" :to="'/dashboard/'+dashboard.id">
				<v-list-item-avatar>
					<v-list-item-title class="white--text text-uppercase">{{ dashboard.short }}</v-list-item-title>
				</v-list-item-avatar>
				<v-list-item-content class="white--text">
					<v-list-item-title>{{ dashboard.name }}</v-list-item-title>
					<v-list-item-subtitle class="grey--text text--lighten-2">{{ dashboard.subtitle || ''}}
					</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
					<v-row align="center" class="px-2">
						<v-btn icon small dark>
							<v-icon x-small color="" @click.prevent="removeDashboard(dashboard.id)">fa-solid fa-trash</v-icon>
						</v-btn>
						<v-btn icon small dark>
							<v-icon x-small color="" @click.prevent="editDashboard(dashboard.id)">fa-solid fa-ellipsis</v-icon>
						</v-btn>
					</v-row>
				</v-list-item-action>
			</v-list-item>
		</v-list>
		</template>
		<template v-slot:append>
			<template v-if="profile">
				<v-divider />
				<v-list-item two-line @click="$store.dispatch('app/setOpenNewDashboard', true)" style="position:relative;"
					class="start-here">
					<v-list-item-avatar>
						<v-icon small color="white">fa-solid fa-plus</v-icon>
					</v-list-item-avatar>
					<v-list-item-content class="white--text">
						<v-list-item-title>New</v-list-item-title>
						<v-list-item-subtitle>Create a new Dashboard</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-divider />
				<v-list-item two-line to="/bookmarks">
					<v-list-item-avatar>
						<v-icon small color="white">fa-solid fa-bookmark</v-icon>
					</v-list-item-avatar>
					<v-list-item-content class="white--text">
						<v-list-item-title>Bookmarks</v-list-item-title>
						<v-list-item-subtitle>View your saved Items</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</template>
			<v-divider />
			<v-list dense dark class="py-0 primary no-border">
				<v-list-item to="/about" class="grey">
					<v-list-item-avatar>
						<v-icon small>fa-solid fa-circle-question</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>About RTAA-72</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-divider />
				<v-list-item @click="$store.dispatch('app/setOpenNavigationDrawer', !openNavigationDrawer)">
					<v-list-item-avatar>
						<v-icon x-small>fa-solid {{ !openNavigationDrawer ? 'fa-chevron-right' : 'fa-chevron-left' }}
						</v-icon>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>{{ !openNavigationDrawer ? 'Expand' : 'Collapse' }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-divider />
				<template v-if="profile">
					<v-list-item to="/settings">
						<v-list-item-avatar>
							<v-icon x-small>fa-solid fa-ellipsis</v-icon>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title>Settings</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</template>
				<template v-else>
					<v-list-item to="/auth/authenticate">
						<v-list-item-avatar>
							<v-icon x-small>fa-brands fa-twitter</v-icon>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title>Authorize Twitter</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</template>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'navigation',
	components: {
		'logo-cvcio': require('@/components/logos/logo-cvcio').default
	},
	computed: {
		...mapGetters('auth', ['isAuthenticated']),
		...mapGetters('app', ['openNavigationDrawer', 'dashboards']),
		...mapGetters('profile', ['profile'])
	},
	data () {
		return {};
	},
	mounted () {
		this.$store.dispatch('app/getDashboards')
			.then((res) => {
				if (this.dashboards.length === 0) {
					setTimeout(() => {
						this.$store.state.app.showTour = true;
					}, 1500);
				}
			});
	},
	methods: {
		removeDashboard (id) {
			this.$store.dispatch('app/removeDashboard', id)
				.then((res) => {
					if (this.dashboards.length === 0) {
						setTimeout(() => {
							this.$store.state.app.showTour = true;
						}, 1500);
					}
				});
		},
		editDashboard (id) {
			this.$store.dispatch('app/setOpenNewDashboard', true);
		},
		logout () {
			this.$store.dispatch('auth/logout').then(() => this.$router.push('/'));
		}
	}
};
</script>

<style lang="less">
.navigation {
	z-index: 11;
	box-sizing: content-box;
}

.no-border {
	border-radius: 0;
}
</style>
