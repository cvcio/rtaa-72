<template>
	<v-snackbar v-model="error" multi-line bottom :color="'error'">
		{{ message.message }}
		<v-btn text @click="$store.state.errors.error = false">Close</v-btn>
	</v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'error',
	computed: {
		...mapGetters('errors', ['message']),
		error: {
			get () {
				return this.$store.state.errors.error;
			},
			set (value) {
				this.$store.state.errors.error = value;
			}
		}
	}
};
</script>
