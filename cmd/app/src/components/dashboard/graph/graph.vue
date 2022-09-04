<template>
	<v-container class="network-container">
		<div id="graph" class="pa-0"></div>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { getColor, capitalizeText } from '@/utils/helper';

import Graph from 'graphology';
import Sigma from 'sigma';
import ForceSupervisor from 'graphology-layout-force/worker';
import pagerank from 'graphology-metrics/centrality/pagerank';

import { scaleLinear } from 'd3-scale';

export default {
	name: 'graph',
	props: ['data'],
	computed: {
		...mapGetters('app', [
			'graph'
		])
	},
	watch: {
		graph (g, o) {
			if (g.id) {
				this.draw();
			}
		}
	},
	beforeDestroy () {
		this.destroy();
	},
	methods: {
		draw () {
			this.destroy();

			const container = document.getElementById('graph');
			while (container.firstChild) {
				container.removeChild(container.firstChild);
			}
			const scale = scaleLinear().domain([0, 100]).range([4, 64]);
			this.network = new Graph({
				allowSelfLoops: true,
				multi: true
			});
			this.graph.nodes.forEach(m => {
				this.network.mergeNode(m.id, {
					label: m.userName || m.account.userName,
					color: this.graph.id === m.id ? 'blue' : 'grey'
				});
			});
			this.graph.edges.forEach(e => {
				this.network.mergeEdge(e.source, e.target, { size: 5, type: 'arrow', label: this.capitalizeText(e.label.replace('_', ' ')) });
			});

			pagerank(this.network, { alpha: 0.9 });

			this.network.nodes().forEach((node, i) => {
				const angle = (i * 2 * Math.PI) / this.network.order;
				const size = scale(this.network.degree(node) * (this.graph.id === node ? 4 : 1)) || 4;
				this.network.setNodeAttribute(node, 'size', size);
				this.network.setNodeAttribute(node, 'x', 100 * Math.cos(angle));
				this.network.setNodeAttribute(node, 'y', 100 * Math.sin(angle));
			});

			this.layout = new ForceSupervisor(this.network);
			this.layout.start();
			this.renderer = new Sigma(this.network, container, {
				allowInvalidContainer: false,
				renderEdgeLabels: true,
				minCameraRatio: 0.1,
      			maxCameraRatio: 10,
				stagePadding: 24,
				labelSize: 16,
				labelFont: 'Roboto'
			});
		},
		destroy () {
			if (this.layout && this.layout.isRunning()) {
				this.layout.kill();
			}
			if (this.network) {
				this.network.clear();
			}
		},
		getColor,
		capitalizeText
	}
};
</script>

<style lang="less">
.network-container {
	position: relative;
	width: calc(100% - 72px);
	height: calc(100% - 144px);
	display: block;
	overflow: hidden;
	content: ' ';
	#graph {
		position: absolute;
		width: 100%;
		height: 100%;
		display: block;
		overflow: hidden;
		top: 0;
		left: 0;
	}
}
</style>
