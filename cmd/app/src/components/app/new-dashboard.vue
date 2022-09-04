<template>
	<v-dialog
		:value="openNewDashboard"
		@click:outside="$store.dispatch('app/setOpenNewDashboard', false)"
		light
		width="560"
		class="new-dashboard"
		persistent transition="slide-y-transition" :model-value="openNewDashboard"
		:class="!openNavigationDrawer ? '' : 'expand'"
	>
		<v-card>
			<v-list-item two-line to="/">
				<v-list-item-avatar>
					<v-icon small>fa-solid fa-table-columns</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title class="">New</v-list-item-title>
					<v-list-item-subtitle>Create a New Dashboard</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider />
			<v-form class="pa-6" @submit="submit" ref="form" v-model="valid">
				<v-row class="my-0">
					<v-col class="py-0">
						<v-text-field
							color="accent" v-model="form.name" label="Dashboard Name" outlined class=""/>
					</v-col>
				</v-row>
				<!-- <v-row class="my-0">
					<v-col class="py-0">
						<v-textarea
							color="accent" v-model="form.follow" label="Follow Accounts"
							hint="Comma Separeted List of Screen Names" placeholder="realDonaldTrump, Bernie"
							persistent-hint outlined class=""/>
					</v-col>
				</v-row> -->
				<v-row class="my-0">
					<v-col class="py-0">
						<v-textarea
							color="accent" v-model="form.track" label="Track Hashtags or Keywords"
							placeholder="#MAGA, Bernie" outlined class=""/>
					</v-col>
				</v-row>
				<v-row class="" align="baseline">
					<v-col cols="12">
						<v-row>
							<v-col class="py-1">
								<h4 class="subtitle-2">Classification Service</h4>
							</v-col>
							<v-col class="shrink py-1">
								<v-switch v-model="form.classification_service_active" label="Enable" dense hide-details
									class="pt-0 mt-0"></v-switch>
							</v-col>
						</v-row>
						<v-row>
							<v-col class="py-1">
								<h4 class="subtitle-2">Gephi WebSocket Service</h4>
							</v-col>
							<v-col class="shrink py-1">
								<v-switch v-model="form.gephi_service_active" label="Enable" dense hide-details
									class="pt-0 mt-0"></v-switch>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" xs="12">
								<v-text-field v-model="form.gephi_service_workspace" outlined color="accent"
									label="Gephi Workspace"
									placeholder="workspace1" hint="The name of the Gephi project"></v-text-field>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
				<v-row class="mb-2">
					<v-col>
						<v-btn color="secondary" block rounded class="text-inherit mb-4" @click="$store.dispatch('app/setOpenNewDashboard', false)">Cancel</v-btn>
						<v-btn color="accent" block rounded class="text-inherit" @click="submit">Create</v-btn>
					</v-col>
				</v-row>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { shorten } from '@/utils/helper';
export default {
	name: 'new-dashboard',
	components: {},
	computed: {
		...mapGetters('auth', ['isAuthenticated']),
		...mapGetters('app', ['openNavigationDrawer', 'openNewDashboard']),
		drawer () {
			return this.openNewDashboard;
		},
		utilDate () {
			return this.form.period ? this.$moment(this.form.period).format('YYYY-MM-DD HH:mm:ss ZZ') : '';
		}
	},
	data () {
		return {
			loading: false,
			datePicker: false,
			valid: false,
			form: {}
		};
	},
	methods: {
		submit () {
			if (this.$refs.form.validate()) {
				this.loading = true;
				this.form.short = shorten(this.form.name, 4).toUpperCase();
				this.$store.dispatch('app/addDashboard', this.form)
					.then(res => {
						this.$store.dispatch('app/setOpenNewDashboard', false);
						// this.$router.push(`/dashboard/${res}`);
					})
					.catch(error => console.debug('new dashboard error:', error));
			}
		},
		reset () {
			this.$refs.form.reset();
		},
		resetValidation () {
			this.$refs.form.resetValidation();
		}
	}
};
</script>

<style lang="less">
.new-dashboard {
	z-index: 10;
	left: 72px;
	transition: left .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.no-border {
	border-radius: 0;
}
</style>
