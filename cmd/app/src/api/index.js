// import store from '@/store';
// import { storageSVC } from '@/services/storage.service';
import { createPromiseClient, createCallbackClient, createConnectTransport } from '@bufbuild/connect-web';
import { TwitterWatchService } from '@/gen/proto/rtaa/streamer/twitter/v1/twitterwatch_connectweb.js';

const grpc = {
	init (baseURL) {
		this.client = createPromiseClient(
			TwitterWatchService,
			createConnectTransport({
				baseUrl: baseURL
			})
		);
		this.streamer = createCallbackClient(
			TwitterWatchService,
			createConnectTransport({
				baseUrl: baseURL
			})
		);
	}
};

export { grpc };
