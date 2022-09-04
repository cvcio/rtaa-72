<template>
	<v-container class="static ma-0 pa-12 white">
		<v-form @submit="submit" ref="form" v-model="valid">
			<v-row>
				<v-col>
					<v-row class="" align="baseline">
						<v-col cols="12" md="3">
							<h2 class="subtitle-1"><span class="mono text-uppercase">Twitter API Settings</span></h2>
							<v-divider class="short-divider my-3" color=""></v-divider>
							<h4 class="body-2 grey--text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
								do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h4>
						</v-col>
						<v-col cols="12" md="6">
							<v-row>
								<v-col class="py-1">
									<h4 class="subtitle-2">Twitter Data Fields</h4>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" xs="12" md="6">
									<v-radio-group v-model="form.twitter.version" dense class="my-0" hide-details row
										value="v1">
										<v-radio label="API v1" value="v1" />
										<v-radio disabled label="API v2" value="v2" />
									</v-radio-group>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12">
									<v-text-field readonly :value="profile.userName" outlined color="accent"
										label="Twitter ScreenName"></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field readonly :value="profile.oauthToken" outlined color="accent"
										label="OAuth Token" :type="show_oauthToken ? 'text' : 'password'"
										@click:append="show_oauthToken = !show_oauthToken"
										:append-icon="show_oauthToken ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'">
									</v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field readonly :value="profile.oauthTokenSecret" outlined color="accent"
										label="OAuth Token Secret" :type="show_oauthTokenSecret ? 'text' : 'password'"
										@click:append="show_oauthTokenSecret = !show_oauthTokenSecret"
										:append-icon="show_oauthTokenSecret ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'">
									</v-text-field>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
					<v-row class="mt-12" align="baseline">
						<v-col cols="12" md="3">
							<h2 class="subtitle-1"><span class="mono text-uppercase">Streamer</span></h2>
							<v-divider class="short-divider my-3" color=""></v-divider>
							<h4 class="body-2 grey--text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
								do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h4>
						</v-col>
						<v-col cols="12" md="6">
							<v-row>
								<v-col class="py-1">
									<h4 class="subtitle-2">Streaming Service</h4>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" xs="12">
									<v-text-field v-model="form.streaming.url" outlined color="accent"
										label="Streaming Service URL" placeholder="http://localhost:8000/"
										persistent-hint></v-text-field>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
					<v-row class="mt-12" align="baseline">
						<v-col cols="12" md="3">
							<h2 class="subtitle-1"><span class="mono text-uppercase">Plugins</span></h2>
							<v-divider class="short-divider my-3" color=""></v-divider>
							<h4 class="body-2 grey--text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
								do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h4>
						</v-col>
						<v-col cols="12" md="6">
							<v-row>
								<v-col class="py-1">
									<h4 class="subtitle-2">Classification Service</h4>
								</v-col>
								<v-col class="shrink py-1">
									<v-switch v-model="form.classification.enabled" label="Enable" dense hide-details
										class="pt-0 mt-0"></v-switch>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" xs="12">
									<v-text-field v-model="form.classification.host" outlined color="accent"
										label="Classification Service Host:" placeholder="localhost:50052"
										persistent-hint></v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col class="py-1">
									<h4 class="subtitle-2">Gephi WebSocket Service</h4>
								</v-col>
								<v-col class="shrink py-1">
									<v-switch v-model="form.gephi.enabled" label="Enable" dense hide-details
										class="pt-0 mt-0"></v-switch>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="12" xs="12">
									<v-text-field v-model="form.gephi.host" outlined color="accent"
										label="Gephi WebSocket Service Host"
										placeholder="http://localhost:8001/dashboard" persistent-hint></v-text-field>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
			<v-btn fixed bottom right text :loading="loading" @click="submit">Save</v-btn>
		</v-form>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'settings',
	computed: {
		...mapGetters('profile', ['profile']),
		...mapGetters('app', ['settings'])
	},
	data () {
		return {
			source: '',
			valid: false,
			loading: false,
			show_oauthToken: false,
			show_oauthTokenSecret: false,
			form: {
				streaming: {
					url: this.$APP_GRPC
				},
				twitter: {
					version: 'v1'
				},
				classification: {
					enabled: false,
					host: 'localhost:50052'
				},
				gephi: {
					enabled: false,
					host: 'localhost:9000'
				}
			},
			masks: require('@/utils/masks').default,
			rules: require('@/utils/rules').default
		};
	},
	mounted () {
		Object.assign(this.form, this.settings);
	},
	methods: {
		submit () {
			if (this.$refs.form.validate()) {
				this.loading = true;
				this.$store.dispatch('app/setSettings', this.form)
					.then(res => {
						this.loading = false;
						console.debug('settings saved:', res);
					});
			}
		},
		authorize () {
			this.$store.dispatch('app/setSettings', this.form)
				.then(res => {
					this.loading = false;
					console.debug('settings saved:', res);
				});
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

<style lang="less" scoped>
.static {
	min-height: 100%;
	max-width: 1204px;
}
</style>
