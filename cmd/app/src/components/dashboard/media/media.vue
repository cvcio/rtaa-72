<template>
	<v-container class="lighten-5" v-ripple>
		<v-row align="start">
			<v-col cols="12" class="pa-0 ma-0">
				<img :src="data.mediaUrlHttps" width="100%" height="auto" class="pa-0 ma-0"/>
			</v-col>
			<v-col cols="12" class="pt-0">
				<v-list-item class="px-0">
					<v-list-item-content>
					</v-list-item-content>
					<v-list-item-action class="my-0">
						<v-row align="center" class="px-2">
							<v-tooltip bottom color="transparent" transition="slide-y-reverse-transition">
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon small :href="'https://' + data.displayUrl" target="_blank" v-bind="attrs" v-on="on">
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
import { getColor } from '@/utils/helper';
export default {
	name: 'media',
	props: ['data'],
	components: {},
	computed: {},
	data () {
		return {};
	},
	beforeDestroy () {
		this.destroy();
	},
	methods: {
		destroy () {},
		getColor
	}
};
</script>
