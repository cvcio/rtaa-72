import { grpc } from '@/api';

const streamSVC = {
	async connect (data) {
		return grpc.client.connect(data);
	},

	async disconnect (data) {
		return grpc.client.disconnect(data);
	},

	async stream (data) {
		return grpc.streamer.stream(data);
	}
};
export { streamSVC };
