<template>
	<v-container class="pa-0">
		<v-row class="my-2">
			<v-col align="start" class="text-start">
				<logo-cvcio :light="true" :W="48" :H="48"></logo-cvcio>
			</v-col>
		</v-row>
		<v-row class="my-2">
			<v-col align="start" class="text-start">
				<h2 class="text-h4 font-weight-bold white--text">One more step to go!</h2>
				<p class="my-2 body-2 grey--text">To continue, visit the following <a :href="url" target="_blank" class="secondary--text link">url</a> and authorize the application, to obtain the 7 digit Pin</p>
			</v-col>
		</v-row>
		<v-row class="my-2">
			<v-col align="start" class="text-start grow">
				<h3 class="title font-weight-bold white--text"><a :href="url" target="_blank" class="accent--text link">{{ url }}</a></h3>
			</v-col>
		</v-row>
		<v-form
			ref="verify"
			v-model="valid"
			class="form-dark"
		>
			<v-row class="my-0">
				<v-col align="end" class="text-end">
					<v-row>
						<v-col class="pt-0">
							<v-text-field
								outlined
								rounded
								dark
								color="white"
								label="7-Digit Pin"
								v-model="form.oAuthVerifier"
								:rules="[rules.required, rules.pin]"></v-text-field>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
			<v-row class="my-0">
				<v-col align="end" class="text-end">
					<v-btn class="text-inherit mb-4" block outlined rounded color="secondary" dark :disabled="loading" @click="cancel">Cancel</v-btn>
					<!-- <v-btn class="text-inherit mb-4" dark block rounded>Resend Verification Code</v-btn> -->
					<v-btn class="text-inherit mb-4" block rounded color="accent" dark :disabled="loading" :loading="loading" @click="verify">Verify your Account</v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script>
import { VerifyRequest } from '@/gen/proto/rtaa/streamer/twitter/v1/twitterwatch_pb';
export default {
	name: 'verify',
	props: ['access_token', 'refresh_token'],
	components: {
		'logo-cvcio': require('@/components/logos/logo-cvcio').default
	},
	computed: {
		requestToken () {
			return this.$route.query.requestToken || null;
		},
		url () {
			return this.$route.query.url || 'empty';
		}
	},
	data () {
		return {
			valid: true,
			form: {
				oAuthVerifier: ''
			},
			loading: false,
			rules: require('@/utils/rules').default
		};
	},
	methods: {
		cancel () {
			this.$router.push('/auth/authenticate');
		},
		verify () {
			if (this.$refs.verify.validate()) {
				this.loading = true;

				const req = new VerifyRequest({
					oauthVerifier: this.form.oAuthVerifier,
					requestToken: this.requestToken
				});

				console.log(req);

				this.$store.dispatch('auth/verify', req).then(res => {
					if (res) {
						const o = res.toJson();
						this.$store.dispatch('auth/loginWithToken', o)
							.then((r) => {
								setTimeout(() => {
									this.$router.push('/');
								}, 2000);
							}).catch(err => console.error(err));
					}
					this.loading = false;
				}).catch(err => console.error(err));
			}
		}
	}
};
</script>

<style>
</style>
