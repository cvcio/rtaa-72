<template>
	<v-container class="pa-0">
		<v-row class="my-2">
			<v-col align="start" class="text-start">
				<logo-cvcio :light="true" :W="48" :H="48"></logo-cvcio>
			</v-col>
		</v-row>
		<v-row>
			<v-col align="start" class="text-start">
				<h2 class="text-h4 font-weight-bold white--text">RTAA&mdash;72</h2>
				<p class="subtitle-1 grey--text">Go through information channels</p>
			</v-col>
		</v-row>
		<v-row class="my-0">
			<v-col align="end" class="text-end">
				<v-btn class="text-inherit mb-4" block outlined rounded color="secondary" dark :disabled="loading" to="/">Cancel</v-btn>
				<v-btn class="text-inherit mb-4" block rounded color="accent" dark :disabled="loading" :loading="loading" @click="obb">
					<v-icon color="white" small left class="">mdi-twitter</v-icon>Authenticate with Twitter
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'authenticate',
	components: {
		'logo-cvcio': require('@/components/logos/logo-cvcio').default
	},
	computed: {},
	data () {
		return {
			loading: false
		};
	},
	methods: {
		obb () {
			this.loading = true;
			this.$store.dispatch('auth/obb', {})
				.then(res => {
					if (res) {
						const o = res.toJson();
						if (o.requestToken !== '' && o.url !== '') {
							this.$router.push({ path: '/auth/verify', query: { requestToken: o.requestToken, url: o.url } });
						}
					}
					this.loading = false;
				})
				.catch(err => console.log(err));
		}
	}
};
</script>

<style>
</style>
