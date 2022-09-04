<template>
	<v-app id="app" light toolbar footer>
		<error/>
		<template v-if="!authView">
			<application/>
		</template>
		<template v-else-if="authView">
			<authentication :class="$vuetify.breakpoint.smAndDown ? 'primary' : 'mixed-bg'"/>
		</template>
	</v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
	name: 'rtaa-dashboard',
	components: {
		application: require('@/layout/application').default,
		authentication: require('@/layout/authentication').default,
		// intro: require('@/layout/intro').default,
		error: require('@/components/app/error').default
	},
	computed: {
		authView () {
			return !!this.$route.path.includes('/auth/');
		},
		introView () {
			return !this.isAuthenticated && !this.isIntro;
		},
		...mapGetters('auth', ['isAuthenticated']),
		...mapState('app', ['isIntro']),
		...mapState('profile', ['profile'])
	}
};
</script>

<style lang="less">
html, body {
	overflow: auto !important;
}
html, body, #app {
	background-color: #fff;
}

.form-dark {
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active  {
		-webkit-box-shadow: 0 0 0 30px #0F0F18 inset !important;
	}
	input:-webkit-autofill {
		-webkit-text-fill-color: grey !important;
	}
}

.form-light {
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active  {
		-webkit-box-shadow: 0 0 0 30px white inset !important;
	}
	input:-webkit-autofill {
		-webkit-text-fill-color: black !important;
	}
}

a, a:hover, a:focus {
	// border: none;
	// outline: none;
	text-decoration: none;
	&.link {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		background-image: linear-gradient(currentColor, currentColor);
		background-position: 0% 100%;
		background-repeat: no-repeat;
		background-size: 0% 1px;
		font-weight: normal;
		&:hover, a:focus{
			background-size: 100% 1px;
		}
	}
}
.mono {
    font-family: 'Roboto Mono' !important;
	font-weight: 400;
	strong {
		font-weight: 700;
	}
}
.short-divider.v-divider {
	width: 48px;
}
.v-text-field__slot, .v-select__slot, .v-select__selections {
	input, .v-select__selection {
		font-size: 0.9em !important;
	}
}
.text-inherit {
	text-transform: none !important;
}

main {
	&.light-bg {
		background-color: #fdfdfa;
	}
	&.dark-bg {
		background-color: #0F0F18;
	}
	&.mixed-bg {
		background-image:
   		linear-gradient(
			to left,
			#0F0F18,
			#0F0F18 50%,
			#ebeeee 50%,
			#ebeeee 100%
		);
	}
}

.v-input {
	font-size: 14px !important;
	.v-label {
		font-size: 14px !important;
	}
}
</style>
