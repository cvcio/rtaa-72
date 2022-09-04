<template>
	<v-main app>
		<v-container class="fill-height" fluid>
			<v-row class="" justify="center" align="center">
				<v-col cols="12" md="6">
					<random v-if="!$vuetify.breakpoint.smAndDown"/>
				</v-col>
				<v-col cols="12" md="5" xl="3" align="center">
					<v-card max-width="600" class="pa-4 d-flex transparent" flat>
						<v-fade-transition mode="out-in">
							<router-view></router-view>
						</v-fade-transition>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>

<script>
export default {
	name: 'layout-authentication',
	components: {
		random: require('@/components/shared/random').default
	}
};
</script>
