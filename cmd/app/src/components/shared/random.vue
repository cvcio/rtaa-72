<template>
	<canvas id="random" class="canvas"></canvas>
</template>

<script>
export default {
	name: 'random',
	data () {
		return {
			id: undefined,
			canvas: null,
			ctx: null,
			maxWidth: 0,
			maxHeight: 0,
			fontSize: 36,
			offset: 0,
			ratio: 0.56,
			dimOffset: 4,
			then: Date.now(),
			interval: 180
		};
	},
	destroyed () {
		this.destroy();
	},
	mounted () {
		this.draw();
	},
	methods: {
		destroy () {
			this.canvas = null;
			this.ctx = null;

			window.removeEventListener('resize', this.draw, false);
			window.cancelAnimationFrame(this.id);
			this.id = undefined;
		},
		draw () {
			if (this.canvas) {
				this.destroy();
			}

			this.canvas = document.querySelector('canvas');
			this.ctx = this.canvas.getContext('2d');

			this.canvas.width = this.canvas.offsetWidth;
			this.canvas.height = this.canvas.offsetHeight;

			this.maxWidth = Math.ceil(this.canvas.width / (this.fontSize * this.ratio));
			this.maxHeight = Math.ceil(this.canvas.height / this.fontSize) + 1;
			this.fontSize = Math.floor(this.canvas.height / this.maxHeight);

			this.ctx.font = `normal ${this.fontSize}px Roboto Mono`;
			this.ctx.fillStyle = 'rgba(21, 36, 217, 0.1)';
			this.ctx.textBaseline = 'top';

			window.addEventListener('resize', this.draw, false);

			this.update();
		},
		render () {
			if (!this.ctx) return;
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			for (let i = 0; i <= this.maxHeight; i++) {
				this.ctx.fillText(this.randomString(this.maxWidth), 0, i * (this.fontSize + this.offset));
			}
		},
		randomString (length) {
			let str = '';
			const chars = 'abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';

			for (var i = length; i > 0; --i) {
				str += chars[Math.floor(Math.random() * chars.length)];
			}
			return str;
		},
		update () {
			if (!this.ctx) return;

			const now = Date.now();
			const delta = now - this.then;

			if (delta >= this.interval) {
				this.then = now - (delta % this.interval);
				this.render();
			}

			this.id = window.requestAnimationFrame(this.update);
		}
	}
};
</script>

<style lang="less" scoped>
.canvas {
	position: fixed;
	width: 50%;
	height: 100%;
	top: 0;
	left: 0;
}
</style>
