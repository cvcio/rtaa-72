<template>
	<v-main app>
		<navigation></navigation>
		<new-dashboard></new-dashboard>
		<v-fade-transition mode="out-in">
			<router-view></router-view>
		</v-fade-transition>
	</v-main>
</template>

<script>
export default {
	name: 'layout-application',
	components: {
		navigation: require('@/components/app/navigation').default,
		'new-dashboard': require('@/components/app/new-dashboard').default
	}
};
</script>

<style lang="less">
</style>
