<template>
	<v-container class="" @click="network" v-ripple>
		<v-row align="baseline">
			<v-col class="shrink">
				<v-avatar size="36" color="transparent">
					 <img
						:src="data.profileImageUrl"
						:alt="data.userName"
					>
				</v-avatar>
			</v-col>
			<v-col class="grow py-0 pr-6">
				<v-list-item class="px-0">
					<v-list-item-content class="pb-0">
						<v-list-item-title class="subtitle-2 text-truncate">
							<span class="my-0">{{ ellipsis(data.name, 20) }}</span>
							<v-icon small class="mt-n1 mx-2" v-if="data.verified" color="#1d9bf0">mdi-check-decagram</v-icon>
						</v-list-item-title>
						<v-list-item-subtitle>
							<span class="caption grey--text">@{{ data.userName }}</span>
							<span class="caption mx-1">&bullet;</span>
							<span class="caption grey--text">Joined {{ $moment(data.createdAt).fromNow() }}</span>
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item class="px-0">
					<v-list-item-content class="py-0">
						<v-list-item-title class="caption text-truncate">
							<!-- <v-tooltip bottom color="transparent" transition="slide-y-reverse-transition"> -->
								<!-- <template v-slot:activator="{ on, attrs }">
									<v-icon x-small :color="getColor(label)" v-bind="attrs" v-on="on">mdi-circle</v-icon>
								</template>
								<v-chip small class="" :color="getColor(label)">
									<span class="mr-2" style="">{{ label }}</span>
									<v-divider light vertical/>
									<span class="ml-2" style="">
										{{
											new Intl.NumberFormat('el-GR', { notation: 'compact', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data.prediction.score)
										}}
									</span>
								</v-chip> -->
								<v-chip v-if="prediction" class="mr-2 font-weight-medium" small
									light :color="getColor(prediction.label)">
									<span class="">
										{{
										new Intl.NumberFormat('el-GR', { notation: 'compact', minimumFractionDigits: 2,
										maximumFractionDigits: 2 }).format(prediction.score)
										}}
									</span>
									<v-divider class="mx-2" vertical />
									<span class="">{{ prediction.label }}</span>
								</v-chip>
							<!-- </v-tooltip> -->
						</v-list-item-title>
					</v-list-item-content>
					<v-list-item-action class="my-0">
						<v-row align="center" class="px-2">
							<v-tooltip bottom color="transparent" transition="slide-y-reverse-transition">
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon small :href="'https://twitter.com/'+data.userName" target="_blank" v-bind="attrs" v-on="on">
										<v-icon x-small color="grey darken-2">fa-brands fa-twitter</v-icon>
									</v-btn>
								</template>
								<v-chip small class="">
									Visit Profile on Twitter
								</v-chip>
							</v-tooltip>

							<v-tooltip bottom color="transparent" transition="slide-y-reverse-transition">
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon small v-bind="attrs" v-on="on">
										<v-icon x-small color="grey darken-2">fa-solid fa-bookmark</v-icon>
									</v-btn>
								</template>
								<v-chip small class="">
									Bookmark
								</v-chip>
							</v-tooltip>

							<v-tooltip bottom color="transparent" transition="slide-y-reverse-transition">
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon small v-bind="attrs" v-on="on">
										<v-icon x-small color="grey darken-2">fa-solid fa-star</v-icon>
									</v-btn>
								</template>
								<v-chip small class="">
									Mark as Trusted
								</v-chip>
							</v-tooltip>

							<v-tooltip bottom color="transparent" transition="slide-y-reverse-transition">
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon small v-bind="attrs" v-on="on">
										<v-icon x-small color="grey darken-2">fa-solid fa-robot</v-icon>
									</v-btn>
								</template>
								<v-chip small class="">
									Mark as Known Actor
								</v-chip>
							</v-tooltip>
						</v-row>
					</v-list-item-action>
				</v-list-item>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { getColor, ellipsis } from '@/utils/helper';

export default {
	name: 'account',
	props: ['data'],
	computed: {
		...mapGetters('app', [
			'accounts', 'tweets', 'relationships'
		]),
		color () {
			if (this.label === 'AMPLIFIER') return 'red';
			if (this.label === 'NEW') return 'yellow';
			return '';
		},
		days () {
			const now = this.$moment();
			const duration = this.$moment.duration(now.diff(this.$moment.unix(this.data.createdAt.seconds)));
			return duration.asDays();
		},
		prediction () {
			return this.data.prediction ? this.data.prediction : null;
		},
		label () {
			if (this.days < 120) return 'NEW';
			return this.data.prediction.label;
		}
	},
	beforeDestroy () {
		this.destroy();
	},
	methods: {
		network () {
			const edges = this.relationships.filter(
				x => x.source === this.data.id || x.target === this.data.id
			);
			const nodes = edges.map(m => {
				const accounts = this.accounts.filter(
					y => m.source === y.id || m.target === y.id
				);
				const tweets = this.tweets.filter(
					y => m.source === y.id || m.target === y.id
				);
				return [...accounts, ...tweets];
			}).flat().filter((v, index, list) => list.indexOf(v) === index);
			const graph = {
				id: this.data.id,
				nodes,
				edges
			};
			this.$store.commit('app/SET_GRAPH', graph, { root: true });
		},
		destroy () {},
		getColor,
		ellipsis
	}
};
</script>
