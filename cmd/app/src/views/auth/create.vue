<template>
	<v-container class="pa-0">
		<v-row class="my-2">
			<v-col align="start" class="text-start">
				<logo-cvcio :light="true" :W="48" :H="48"></logo-cvcio>
			</v-col>
		</v-row>
		<v-row class="my-2">
			<v-col align="start" class="text-start">
				<h2 class="text-h4 font-weight-bold white--text">Welcome @<span class="font-weight-bold">{{ $route.query.screenName }}</span></h2>
				<p class="my-2 body-2 grey--text">Create your profile to continue with <span class="font-weight-bold">Infoflow</span>. Don't worry, you can change these settings later.</p>
			</v-col>
		</v-row>
		<v-form
			ref="create"
			v-model="valid"
			class="form-dark"
		>
			<v-row>
				<v-col align="end" class="text-end">
					<v-row>
						<v-col cols="12" xs="12" md="6" class="pt-0">
							<v-text-field
								outlined
								rounded
								dark
								color="white"
								label="First Name"
								v-model="form.firstName"
								:rules="[rules.required]"></v-text-field>
						</v-col>
						<v-col cols="12" xs="12" md="6" class="pt-0">
							<v-text-field
								outlined
								rounded
								dark
								color="white"
								label="Last Name"
								v-model="form.lastName"
								:rules="[rules.required]"></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col class="pt-0">
							<v-text-field
								outlined
								rounded
								dark
								color="white"
								autocomplete="email"
								label="Email"
								v-model="form.email"
								:rules="[rules.required, rules.email]"></v-text-field>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
			<v-row class="my-0">
				<v-col align="end" class="text-end">
					<v-btn class="text-inherit mb-4" block outlined rounded color="secondary" @click="cancel">Cancel</v-btn>
					<v-btn class="text-inherit mb-4" block rounded color="accent" @click="create">Create your Profile</v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'create',
	props: ['access_token', 'refresh_token'],
	components: {
		'logo-cvcio': require('@/components/logos/logo-cvcio').default
	},
	computed: {
		...mapGetters([
			'loading'
		]),
		uuid () {
			return this.$route.query.uuid || null;
		},
		screenName () {
			return this.$route.query.screenName || null;
		},
		nonce () {
			return this.$route.query.nonce || null;
		}
	},
	data () {
		return {
			form: {},
			rules: require('@/utils/rules').default,
			valid: false
		};
	},
	methods: {
		cancel () {
			this.$store.dispatch('auth/delete', {
				uuid: this.uuid,
				screenName: this.screenName,
				nonce: this.nonce
			}).then(() => {
				this.$router.push('/');
			});
		},
		create () {
			if (this.$refs.create.validate()) {
				this.$store.dispatch('auth/create', {
					uuid: this.uuid,
					firstName: this.form.firstName,
					lastName: this.form.lastName,
					email: this.form.email,
					status: 'verify'
				}).then(() => {
					this.$refs.create.reset();
					this.$router.push({ path: '/auth/verify', query: Object.assign(this.$route.query, { method: 'verify' }) })
						.catch(err => console.log(err));
				});
			}
		}
	}
};
</script>
