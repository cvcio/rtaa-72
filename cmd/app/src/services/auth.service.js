import { grpc } from '@/api';

const authSVC = {
	async obb (data) {
		return grpc.client.obb(data);
	},

	async verify (data) {
		return grpc.client.verify(data);
	}
};

export { authSVC };
