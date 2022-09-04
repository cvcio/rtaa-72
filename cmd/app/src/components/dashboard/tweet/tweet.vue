<template>
	<v-container class="" @click="network" v-ripple>
		<v-row align="start">
			<v-col class="shrink">
				<v-avatar size="36" color="transparent">
					<img :src="data.account.profileImageUrl" :alt="data.account.userName">
				</v-avatar>
			</v-col>
			<v-col class="grow py-0 pr-6">
				<v-list-item class="px-0">
					<v-list-item-content class="pb-0">
						<template v-if="data.typeOf === 'RETWEET'">
							<v-list-item-subtitle>
								<v-icon x-small color="green">fa-solid fa-retweet</v-icon>
								<a class="caption ml-1 link accent--text" target="_blank"
									:href="'https://twitter.com/' + data.userName">@{{ data.userName }}</a>
								<span class="caption mx-1">Retweeted</span>
							</v-list-item-subtitle>
						</template>
						<template v-if="data.typeOf === 'QUOTE'"></template>
						<template v-if="data.typeOf === 'REPLY'"></template>
						<v-list-item-title class="subtitle-2 text-truncate">
							<span class="my-0">{{ ellipsis(data.account.name, 36) }}</span>
							<v-icon small class="mt-n1 mx-2" v-if="data.account.verified" color="#1d9bf0">
								mdi-check-decagram</v-icon>
						</v-list-item-title>
						<v-list-item-subtitle>
							<span class="caption grey--text">@{{ data.account.userName }}</span>
							<span class="caption mx-1">&bullet;</span>
							<span class="caption grey--text">Joined {{ $moment(data.account.createdAt).fromNow()
							}}</span>
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-list-item class="px-0">
					<v-list-item-content class="pb-0">
						<p class="body-1" v-html="text"></p>
						<p class="caption mt-2 mb-0">
							<span class="caption grey--text">{{ $moment(data.createdAt).format('lll') }}</span>
							<span class="caption mx-1">&bullet;</span>
							<span class="caption grey--text link" v-html="source"></span>
							<span class="caption mx-1">&bullet;</span>
							<span>
								<v-icon x-small color="green">fa-solid fa-retweet</v-icon>
								<span class="caption ml-1 mr-1 green--text">
									{{
									new Intl.NumberFormat('el-GR', { maximumFractionDigits: 0 }).format(data.retweets ||
									0)
									}}
								</span>
							</span>
							<span class="">
								<v-icon x-small color="red">fa-solid fa-heart</v-icon>
								<span class="caption ml-1 mr-2 red--text">
									{{
									new Intl.NumberFormat('el-GR', { maximumFractionDigits: 0 }).format(data.favorites
									|| 0)
									}}
								</span>
							</span>
						</p>
					</v-list-item-content>
				</v-list-item>
				<v-list-item class="px-0">
					<v-list-item-content class="py-0">
						<v-list-item-title class="caption text-truncate">
							<v-chip v-if="prediction && prediction.score > 0.5" class="mr-2 font-weight-medium" small
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
						</v-list-item-title>
					</v-list-item-content>
					<v-list-item-action class="my-0">
						<v-row align="center" class="px-2">
							<v-tooltip bottom color="transparent" transition="slide-y-reverse-transition">
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon small :href="'https://twitter.com/'+data.account.userName"
										target="_blank" v-bind="attrs" v-on="on">
										<v-icon x-small color="grey darken-2">fa-brands fa-twitter</v-icon>
									</v-btn>
								</template>
								<v-chip small class="">
									View on Twitter
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
	name: 'tweet',
	props: ['data'],
	computed: {
		...mapGetters('app', [
			'accounts', 'tweets', 'relationships'
		]),
		days () {
			const now = this.$moment();
			const duration = this.$moment.duration(now.diff(this.$moment.unix(this.data.createdAt.seconds)));
			return duration.asDays();
		},
		prediction () {
			return this.data.prediction ? this.data.prediction.reduce((max, n) => max.score > n.score ? max : n) : null;
		},
		text () {
			let text = this.data.text;
			text = text.replace(/(http\S+|bit.ly\S+|t.co\S+)/gm, '<a class="link accent--text" target="_blank" href="$1">$1</a>');
			text = text.replace(/(?:#)([\u0370-\u03ff\u1f00-\u1fffα-ωΑ-Ωa-zA-Z_\d]+)/gm, '<a class="link accent--text" target="_blank" href="http://twitter.com/search?q=%23$1">#$1</a>');
			// user_classification = user_classification.dates_since < 120 ? { label: 'NEW', score: 1, dates_since: user_classification.dates_since } : user_classification;
			const mentions = [...text.matchAll(/(@USER_\S*)/g)];
			for (let i = 0; i < mentions.length; i++) {
				const int = mentions[i][0].replace('@USER_', '');
				text = text.replace(mentions[i][0], `<span class="redact">${this.randomString(int)}</span>`);
			}
			text = text.replace(/(@[a-zA-Z_\d]+)/gm, '<a class="link accent--text" target="_blank" href="http://twitter.com/$1">$1</a>');
			const quotes = [...text.matchAll(/\[QUOTE\s([^()]+)]/g)];
			for (let i = 0; i < quotes.length; i++) {
				text = text.replace(quotes[i][0], `<q class="quote subtitle-2 pa-4 mt-2 rounded grey--text">${quotes[i][1]}</q>`);
			}
			return text;
		},
		source () {
			return this.data.source.replace('<a href', '<a class="link accent-text" target="_blank" href');
		}
	},
	beforeDestroy () {
		this.destroy();
	},
	methods: {
		network () {
			const edges = this.relationships.filter(
				x => x.source === this.data.account.id || x.target === this.data.account.id || x.source === this.data.id || x.target === this.data.id
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
				id: this.data.account.id,
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
