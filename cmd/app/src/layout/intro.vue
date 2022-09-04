<template>
	<v-main app>
		<v-fade-transition mode="out-in">
			<introduction/>
		</v-fade-transition>
	</v-main>
</template>

<script>
export default {
	name: 'layout-intro',
	components: {
		introduction: require('@/views/static/introduction').default
	}
};
</script>
