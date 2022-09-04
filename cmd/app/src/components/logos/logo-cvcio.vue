<template>
	<div id="logo-cvcio" :class="'s-' + W">
		<div class="l l1" :class="colors.primary"></div>
		<div class="l l2" :class="colors.primary"></div>
		<div class="l l3" :class="colors.secondary"></div>
		<div class="l l4" :class="colors.primary"></div>
	</div>
</template>

<script>
export default {
	name: 'logo-cvcio',
	props: {
		W: {
			type: Number,
			default: 192
		},
		H: {
			type: Number,
			default: 192
		},
		light: {
			type: Boolean,
			default: false
		},
		mono: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		colors () {
			if (this.light) {
				return {
					primary: 'white',
					secondary: this.mono ? 'white' : 'accent'
				};
			}

			return {
				primary: 'black',
				secondary: this.mono ? 'black' : 'accent'
			};
		}
	}
};
</script>

<style lang="less">
#logo-cvcio {
	position: relative;
	.l {
		width: 0;
		height: 0;
		display: block;
		background: white;

		-webkit-animation: increase;
		-moz-animation:    increase;
		-o-animation:      increase;
		animation:         increase;
		animation-fill-mode: forwards;
		animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1.000);
		&:last-child {
			margin-bottom: 0;
		}
	}
	&.s-32 {
		width: 32px;
		height: 18px;

		.l {
			margin-bottom: 1px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.l1 {
			width: 9px;
			height: 2px;
		}
		.l2 {
			width: 32px;
			height: 4px;
		}
		.l3 {
			width: 17px;
			height: 4px;
		}
		.l4 {
			width: 4px;
			height: 2px;
		}
	}
	&.s-40 {
		width: 40px;
		height: 24px;

		.l {
			margin-bottom: 2px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.l1 {
			width: 12px;
			height: 2px;
		}
		.l2 {
			width: 40px;
			height: 6px;
		}
		.l3 {
			width: 19px;
			height: 6px;
		}
		.l4 {
			width: 5px;
			height: 2px;
		}
	}
	&.s-48 {
		width: 48px;
		height: 38px;

		.l {
			margin-bottom: 3px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.l1 {
			width: 13px;
			height: 4px;
		}
		.l2 {
			width: 48px;
			height: 9px;
		}
		.l3 {
			width: 22px;
			height: 9px;
		}
		.l4 {
			width: 6px;
			height: 3px;
		}
	}
	&.s-64 {
		width: 64px;
		height: 46px;

		.l {
			margin-bottom: 4px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.l1 {
			width: 18px;
			height: 4px;
		}
		.l2 {
			width: 64px;
			height: 12px;
		}
		.l3 {
			width: 30px;
			height: 12px;
		}
		.l4 {
			width: 8px;
			height: 2px;
		}
	}
	&.s-96 {
		width: 96px;
		height: 58px;

		.l {
			margin-bottom: 3px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.l1 {
			width: 27px;
			height: 6px;
		}
		.l2 {
			width: 96px;
			height: 18px;
		}
		.l3 {
			width: 45px;
			height: 18px;
		}
		.l4 {
			width: 12px;
			height: 3px;
		}
	}
	&.s-192 {
		width: 192px;
		height: 124px;

		.l {
			margin-bottom: 8px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.l1 {
			width: 54px;
			height: 14px;
		}
		.l2 {
			width: 192px;
			height: 36px;
		}
		.l3 {
			width: 90px;
			height: 36px;
		}
		.l4 {
			width: 24px;
			height: 6px;
		}
	}
	.l1 {
		animation-duration: 2s;
	}
	.l2 {
		animation-duration: 2s;
	}
	.l3 {
		animation-duration: 1s;
	}
	.l4 {
		animation-duration: 1.5s;
		animation: blink-animation 1s cubic-bezier(0.645, 0.045, 0.355, 1.000) infinite;
	}
}

@keyframes blink-animation {
	to {
		opacity: 0;
	}
}

@keyframes increase {
    0% {
        width: 0
    }
}
</style>
