<template>
	<v-container fluid fill-height class="max-width-1204">
		<v-row justify="center" align="center">
			<v-col cols="12" sm="12" md="3">
				<v-row align="center">
					<v-col class="grow">
						<h3 class="text-h3 my-4">Welcome to <span class="font-weight-bold">RTAA-72</span></h3>
						<p class="body-1">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</v-col>
				</v-row>
			</v-col>
			<v-col cols="12" sm="12" md="6" class="mb-4">
				<v-card color="grey">
					<v-responsive :aspect-ratio="16/9">
						<v-container fill-height>
							<v-row justify="center" align="center">
								<v-col align="center">
									<v-icon color="white">mdi-play</v-icon>
								</v-col>
							</v-row>
						</v-container>
					</v-responsive>
				</v-card>
			</v-col>
			<v-col cols="12" sm="9" :align="$vuetify.breakpoint.smAndDown ? 'center' : 'end'">
				<v-spacer/>
				<template v-if="!profile">
					<v-btn rounded class="text-inherit mr-4 mb-4" :block="$vuetify.breakpoint.smAndDown" large depressed color="accent" to="/auth/authenticate">
						Getting Started
						<v-icon right class="ml-4">mdi-arrow-right</v-icon>
					</v-btn>
				</template>
				<template v-else>
					<v-btn rounded class="text-inherit mr-4 mb-4" :block="$vuetify.breakpoint.smAndDown" outlined text color="" href="https://github.com/cvcio/rtaa-72" target="_blank">Read the Docs</v-btn>
					<v-btn rounded class="text-inherit mr-4 mb-4" :block="$vuetify.breakpoint.smAndDown" text disabled>OR</v-btn>
					<v-btn rounded class="text-inherit mr-4 mb-4" :block="$vuetify.breakpoint.smAndDown" large depressed color="accent" @click="$store.dispatch('app/setOpenNewDashboard', true)">
						Create your first Dashboard
						<v-icon right class="ml-4">mdi-plus</v-icon>
					</v-btn>
				</template>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'introduction',
	computed: {
		...mapGetters('profile', [
			'profile'
		])
	},
	methods: {
		setIsIntro () {
			this.$store.dispatch('app/setIsIntro', 'session');
		}
	}
};
</script>

<style lang="less">
// .max-width-1204 {
// 	max-width: 1204px;
// }
</style>
