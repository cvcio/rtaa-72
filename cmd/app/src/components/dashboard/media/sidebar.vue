<template>
	<v-navigation-drawer width="380" fixed disable-resize-watcher
		mini-variant-width="60" :mini-variant="!open"
		id="sidebar-media" class="panel">
		<template v-if="open && dashboard">
			<v-list-item class="header" two-line>
				<v-list-item-content>
					<v-list-item-title class="subtitle-2 text-truncate">
						Media
					</v-list-item-title>
					<v-list-item-subtitle>
						{{ dashboard.name }}
					</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
					<v-row align="center" class="px-2">
						<v-btn icon small>
							<v-icon small color="grey lighten-1">fa-solid fa-image</v-icon>
						</v-btn>
						<v-btn icon small @click="open = false">
							<v-icon x-small color="grey darken-2">fa-solid fa-chevron-left</v-icon>
						</v-btn>
					</v-row>
				</v-list-item-action>
			</v-list-item>
			<v-divider></v-divider>
			<vue-custom-scrollbar id="media-scroll-area" class="scroll-area">
				<template>
					<div v-for="(data, i) in media.slice(0, 48)"  v-bind:key="'m-'+i">
						<media :data="data" />
						<v-divider></v-divider>
					</div>
				</template>
			</vue-custom-scrollbar>
		</template>
		<template v-else>
			<v-list-item class="header grey lighten-5" two-line>
				<v-list-item-action>
					<v-row align="center" class="px-2">
						<v-btn icon small @click="open = true">
							<v-icon x-small color="grey darken-2">fa-solid fa-chevron-right</v-icon>
						</v-btn>
					</v-row>
				</v-list-item-action>
			</v-list-item>
			<v-divider></v-divider>
			<v-icon small class="text-center pa-5" color="grey darken-2">fa-solid fa-photo-film</v-icon>
			<h4 class="vertical mono text-uppercase caption py-4 grey--text">Open Media Streamer</h4>
		</template>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'sidebar-media',
	components: {
		'vue-custom-scrollbar': require('vue-custom-scrollbar'),
		media: require('@/components/dashboard/media/media').default
	},
	computed: {
		...mapGetters('app', ['dashboard', 'media'])
	},
	data () {
		return {
			open: true
		};
	},
	beforeDestroy () {
		this.destroy();
	},
	methods: {
		destroy () {}
	}
};
</script>
