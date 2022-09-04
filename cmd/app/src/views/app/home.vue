<template>
	<v-container fluid fill-height class="grey lighten-4 ma-0 pa-0">
		<!-- <v-slide-y-reverse-transition hide-on-leave>
			<div v-if="(dashboards.length === 0) && !openNewDashboard" class="tour pa-4 mx-6" :style="'top: ' + (startHereEL.getBoundingClientRect().y - 148) + 'px;'">
				<h3 class="title">Start Here</h3>
				<h4 class="subtitle-1">Create your first Dashboard</h4>
				<div class="arrow mt-4" >
					<div class="curve"></div>
					<div class="point"></div>
				</div>
			</div>
		</v-slide-y-reverse-transition> -->
	</v-container>
</template>
<script>
export default {
	name: 'home',
	computed: {
		startHereEL () {
			return document.querySelector('.start-here') || 0;
		}
	},
	data () {
		return {};
	}
};
</script>

<style lang="less">
.tour {
	box-sizing: content-box;
	position: fixed;
	max-width: 240px;
	height: auto;
	z-index: 12;
}

.arrow {
	position: relative;
	margin: 0 auto;
	width: 120px;
}

.arrow .curve {
	border: 2px solid red;
	border-color: transparent red transparent transparent;
	height: 60px;
	width: 60px;
	border-radius: 240px 0 240px 0;
}

.arrow .point {
	position: absolute;
	left: 0;
	top: 60px;
}

.arrow .point:before, .arrow .point:after {
	border: 1px solid red;
	height: 13px;
	content: "";
	position: absolute;
}

.arrow .point:before {
	top: -10px;
	left: 3px;
	transform:rotate(-160deg);
}

.arrow .point:after {
	top: -1px;
	left: 7px;
	transform:rotate(115deg);
}
</style>
