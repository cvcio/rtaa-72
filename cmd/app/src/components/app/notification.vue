<template>
	<v-snackbar v-model="$store.state.notifications.notification" multi-line bottom :color="color" :timeout="timeout">
		{{ message }}
		<v-btn text @click="$store.state.notifications.notification = false">Close</v-btn>
	</v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'notification',
	computed: {
		...mapGetters('notifications', ['message', 'color', 'timeout'])
	}
};
</script>
