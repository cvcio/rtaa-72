<template>
	<v-container fluid fill-height class="pa-0" style="overflow: hidden !important;">
		<div class="sidebars fill-height d-inline-flex">
			<draggable v-model="panels" @start="drag=true" @end="drag=false" class="row fill-height align-center ma-0">
				<component v-for="panel in panels" :key="panel.component" class="sidebar fill-height d-inline-flex"
					:delay="50" v-bind:is="panel.component" />
			</draggable>
		</div>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { ConnectRequest, StreamRequest } from '@/gen/proto/rtaa/streamer/twitter/v1/twitterwatch_pb'; //
import { grpc } from '@/api';

import 'vue-custom-scrollbar/dist/vueScrollbar.css';

export default {
	name: 'dashboard',
	components: {
		accounts: require('@/components/dashboard/account/sidebar').default,
		tweets: require('@/components/dashboard/tweet/sidebar').default,
		media: require('@/components/dashboard/media/sidebar').default,
		graph: require('@/components/dashboard/graph/sidebar').default,
		draggable: require('vuedraggable')
	},
	computed: {
		...mapGetters('profile', [
			'profile'
		]),
		...mapGetters('app', [
			'dashboard', 'settings'
		])
	},
	watch: {
		'$route.params.id' (id, old) {
			if (id) {
				this.loadDashboard();
			}
		}
	},
	data () {
		return {
			streamer: null,
			retries: 5,
			panels: [
				{ component: 'tweets' },
				{ component: 'graph' },
				{ component: 'accounts' },
				{ component: 'media' }
			],
			accounts: [],
			tweets: [],
			media: []
		};
	},
	mounted () {
		this.loadDashboard();
	},
	beforeDestroy () {
		this.destroy();
	},
	methods: {
		loadDashboard () {
			this.$store.dispatch('app/getDashboard', parseInt(this.$route.params.id))
				.then(res => {
					this.connect();
				});
		},
		destroy () {
			const req = new ConnectRequest({
				id: this.profile.id
			});

			this.$store.dispatch('stream/disconnect', req);
			if (this.streamer) this.streamer.cancel();
			this.streamer = null;
		},
		connect () {
			const req = new ConnectRequest({
				id: this.profile.id,
				version: 'v1',
				oauthToken: this.profile.oauthToken,
				oauthTokenSecret: this.profile.oauthTokenSecret,
				track: this.dashboard.track,
				classificationServiceActive: this.dashboard.classification_service_active || false,
				classificationServiceHost: this.settings.classification.host || 'localhost:50052',
				gephiServiceActive: this.dashboard.gephi_service_active || false,
				gephiServiceHost: this.settings.gephi.host || 'localhost:9000',
				gephiServiceWorkspace: this.dashboard.gephi_service_workspace || 'workspace1'
			});
			this.$store.dispatch('stream/connect', req)
				.then((res) => {
					const o = res.toJson();
					if (o.status === 'created') {
						this.stream();
					}
				});
		},
		cleanUp (nAccounts, nTweets, nMedia) {
			if (this.$store.state.app.accounts.length > 100) this.$store.state.app.tweets.pop();
			if (this.$store.state.app.tweets.length > 100) this.$store.state.app.tweets.pop();
			if (this.$store.state.app.media.length > 100) this.$store.state.app.tweets.pop();
		},
		async stream () {
			const req = new StreamRequest({
				id: this.profile.id
			});

			grpc.streamer.stream(
				req,
				this.onData,
				this.onError
			);
		},
		onData (res) {
			const o = res.toJson();
			console.debug('streamer data:', o);

			if (o.accounts && o.accounts.length > 0) this.$store.state.app.accounts.unshift(...o.accounts);
			if (o.media && o.media.length > 0) this.$store.state.app.media.unshift(...o.media);
			if (o.relationships && o.relationships.length > 0) this.$store.state.app.relationships.unshift(...o.relationships);
			if (o.tweets && o.tweets.length > 0) {
				this.$store.state.app.tweets.unshift(...o.tweets.map(tweet => {
					tweet.account = this.$store.state.app.accounts.find(x => x.userName === tweet.author);
					return tweet;
				}));
			}
		},
		onError (error) {
			console.error('streamer error:', error);
			// this.destroy();
			// if (this.$route.path === `/dashboard/${this.dashboard.id}`) this.$router.push('/');
		},
		toggleTabAccount () {
			this.tabAccount = this.tabAccount === 'accounts' ? 'account-details' : 'accounts';
		}
	}
};
</script>

<style lang="less">
#streamer {
	z-index: 0;
	position: fixed;
	height: ~'calc(100%)';
	top: 0;
	left: 72px;
	width: ~'calc(100% - 72px)';
	background: #fafafa;
	background: -moz-linear-gradient(#fafafa 0%, #fafafa 60%, #d0d0d0 100%);
	background: -webkit-linear-gradient(#fafafa 0%, #fafafa 60%, #d0d0d0 100%);
	background: linear-gradient(#fafafa 0%, #fafafa 60%, #d0d0d0 100%);

	overflow: hidden !important;
}

.sidebars {
	position: relative;
	// height: ~'calc(100%)';
	height: 100vh;
	overflow: hidden !important;

	.sidebar {
		position: relative;
		margin: 0 0;
		align-self: auto;

		// display: flex;
		// flex-grow: 1;
		height: 100%;

		transition: none !important;
		overflow: hidden !important;

		.header {
			height: 72px;
		}

		.vertical {
			writing-mode: vertical-rl;
			text-orientation: mixed;
			white-space: nowrap;
			margin-left: 18px;
		}

		.scroll-area {
			position: relative;
			margin: 0;
			height: ~'calc(100% - 74px)';
			overflow: hidden !important;
		}
	}
}

.hasAlert+.scroll-area {
	height: ~'calc(100% - 118px)';
}

.max-width-1204 {
	max-width: 1204px;
}
</style>
