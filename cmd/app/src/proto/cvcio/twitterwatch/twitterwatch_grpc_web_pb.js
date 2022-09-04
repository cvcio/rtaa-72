/**
 * @fileoverview gRPC-Web generated client stub for streamer
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


//var google_api_annotations_pb = require('../../../google/api/annotations_pb.js')

var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var proto_cvcio_classification_predictions_pb = require('../../../proto/cvcio/classification/predictions_pb.js')
const proto = {};
proto.streamer = require('./twitterwatch_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.streamer.TwitterWatchServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.streamer.TwitterWatchServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.streamer.AuthorizeRequest,
 *   !proto.streamer.AuthResponse>}
 */
const methodDescriptor_TwitterWatchService_Autorize = new grpc.web.MethodDescriptor(
  '/streamer.TwitterWatchService/Autorize',
  grpc.web.MethodType.UNARY,
  proto.streamer.AuthorizeRequest,
  proto.streamer.AuthResponse,
  /**
   * @param {!proto.streamer.AuthorizeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.streamer.AuthResponse.deserializeBinary
);


/**
 * @param {!proto.streamer.AuthorizeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.streamer.AuthResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.streamer.AuthResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.streamer.TwitterWatchServiceClient.prototype.autorize =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/streamer.TwitterWatchService/Autorize',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_Autorize,
      callback);
};


/**
 * @param {!proto.streamer.AuthorizeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.streamer.AuthResponse>}
 *     Promise that resolves to the response
 */
proto.streamer.TwitterWatchServicePromiseClient.prototype.autorize =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/streamer.TwitterWatchService/Autorize',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_Autorize);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.streamer.Empty,
 *   !proto.streamer.ObbResponse>}
 */
const methodDescriptor_TwitterWatchService_Obb = new grpc.web.MethodDescriptor(
  '/streamer.TwitterWatchService/Obb',
  grpc.web.MethodType.UNARY,
  proto.streamer.Empty,
  proto.streamer.ObbResponse,
  /**
   * @param {!proto.streamer.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.streamer.ObbResponse.deserializeBinary
);


/**
 * @param {!proto.streamer.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.streamer.ObbResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.streamer.ObbResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.streamer.TwitterWatchServiceClient.prototype.obb =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/streamer.TwitterWatchService/Obb',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_Obb,
      callback);
};


/**
 * @param {!proto.streamer.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.streamer.ObbResponse>}
 *     Promise that resolves to the response
 */
proto.streamer.TwitterWatchServicePromiseClient.prototype.obb =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/streamer.TwitterWatchService/Obb',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_Obb);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.streamer.VerifyRequest,
 *   !proto.streamer.AuthResponse>}
 */
const methodDescriptor_TwitterWatchService_Verify = new grpc.web.MethodDescriptor(
  '/streamer.TwitterWatchService/Verify',
  grpc.web.MethodType.UNARY,
  proto.streamer.VerifyRequest,
  proto.streamer.AuthResponse,
  /**
   * @param {!proto.streamer.VerifyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.streamer.AuthResponse.deserializeBinary
);


/**
 * @param {!proto.streamer.VerifyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.streamer.AuthResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.streamer.AuthResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.streamer.TwitterWatchServiceClient.prototype.verify =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/streamer.TwitterWatchService/Verify',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_Verify,
      callback);
};


/**
 * @param {!proto.streamer.VerifyRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.streamer.AuthResponse>}
 *     Promise that resolves to the response
 */
proto.streamer.TwitterWatchServicePromiseClient.prototype.verify =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/streamer.TwitterWatchService/Verify',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_Verify);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.streamer.RulesRequest,
 *   !proto.streamer.RulesResponse>}
 */
const methodDescriptor_TwitterWatchService_AddRules = new grpc.web.MethodDescriptor(
  '/streamer.TwitterWatchService/AddRules',
  grpc.web.MethodType.UNARY,
  proto.streamer.RulesRequest,
  proto.streamer.RulesResponse,
  /**
   * @param {!proto.streamer.RulesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.streamer.RulesResponse.deserializeBinary
);


/**
 * @param {!proto.streamer.RulesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.streamer.RulesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.streamer.RulesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.streamer.TwitterWatchServiceClient.prototype.addRules =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/streamer.TwitterWatchService/AddRules',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_AddRules,
      callback);
};


/**
 * @param {!proto.streamer.RulesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.streamer.RulesResponse>}
 *     Promise that resolves to the response
 */
proto.streamer.TwitterWatchServicePromiseClient.prototype.addRules =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/streamer.TwitterWatchService/AddRules',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_AddRules);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.streamer.RulesRequest,
 *   !proto.streamer.RulesResponse>}
 */
const methodDescriptor_TwitterWatchService_GetRules = new grpc.web.MethodDescriptor(
  '/streamer.TwitterWatchService/GetRules',
  grpc.web.MethodType.UNARY,
  proto.streamer.RulesRequest,
  proto.streamer.RulesResponse,
  /**
   * @param {!proto.streamer.RulesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.streamer.RulesResponse.deserializeBinary
);


/**
 * @param {!proto.streamer.RulesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.streamer.RulesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.streamer.RulesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.streamer.TwitterWatchServiceClient.prototype.getRules =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/streamer.TwitterWatchService/GetRules',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_GetRules,
      callback);
};


/**
 * @param {!proto.streamer.RulesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.streamer.RulesResponse>}
 *     Promise that resolves to the response
 */
proto.streamer.TwitterWatchServicePromiseClient.prototype.getRules =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/streamer.TwitterWatchService/GetRules',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_GetRules);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.streamer.RulesRequest,
 *   !proto.streamer.RulesResponse>}
 */
const methodDescriptor_TwitterWatchService_GetRule = new grpc.web.MethodDescriptor(
  '/streamer.TwitterWatchService/GetRule',
  grpc.web.MethodType.UNARY,
  proto.streamer.RulesRequest,
  proto.streamer.RulesResponse,
  /**
   * @param {!proto.streamer.RulesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.streamer.RulesResponse.deserializeBinary
);


/**
 * @param {!proto.streamer.RulesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.streamer.RulesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.streamer.RulesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.streamer.TwitterWatchServiceClient.prototype.getRule =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/streamer.TwitterWatchService/GetRule',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_GetRule,
      callback);
};


/**
 * @param {!proto.streamer.RulesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.streamer.RulesResponse>}
 *     Promise that resolves to the response
 */
proto.streamer.TwitterWatchServicePromiseClient.prototype.getRule =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/streamer.TwitterWatchService/GetRule',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_GetRule);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.streamer.RulesRequest,
 *   !proto.streamer.RulesResponse>}
 */
const methodDescriptor_TwitterWatchService_DeleteRules = new grpc.web.MethodDescriptor(
  '/streamer.TwitterWatchService/DeleteRules',
  grpc.web.MethodType.UNARY,
  proto.streamer.RulesRequest,
  proto.streamer.RulesResponse,
  /**
   * @param {!proto.streamer.RulesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.streamer.RulesResponse.deserializeBinary
);


/**
 * @param {!proto.streamer.RulesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.streamer.RulesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.streamer.RulesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.streamer.TwitterWatchServiceClient.prototype.deleteRules =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/streamer.TwitterWatchService/DeleteRules',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_DeleteRules,
      callback);
};


/**
 * @param {!proto.streamer.RulesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.streamer.RulesResponse>}
 *     Promise that resolves to the response
 */
proto.streamer.TwitterWatchServicePromiseClient.prototype.deleteRules =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/streamer.TwitterWatchService/DeleteRules',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_DeleteRules);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.streamer.RulesRequest,
 *   !proto.streamer.RulesResponse>}
 */
const methodDescriptor_TwitterWatchService_DeleteRule = new grpc.web.MethodDescriptor(
  '/streamer.TwitterWatchService/DeleteRule',
  grpc.web.MethodType.UNARY,
  proto.streamer.RulesRequest,
  proto.streamer.RulesResponse,
  /**
   * @param {!proto.streamer.RulesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.streamer.RulesResponse.deserializeBinary
);


/**
 * @param {!proto.streamer.RulesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.streamer.RulesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.streamer.RulesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.streamer.TwitterWatchServiceClient.prototype.deleteRule =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/streamer.TwitterWatchService/DeleteRule',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_DeleteRule,
      callback);
};


/**
 * @param {!proto.streamer.RulesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.streamer.RulesResponse>}
 *     Promise that resolves to the response
 */
proto.streamer.TwitterWatchServicePromiseClient.prototype.deleteRule =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/streamer.TwitterWatchService/DeleteRule',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_DeleteRule);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.streamer.ConnectRequest,
 *   !proto.streamer.ConnectResponse>}
 */
const methodDescriptor_TwitterWatchService_Connect = new grpc.web.MethodDescriptor(
  '/streamer.TwitterWatchService/Connect',
  grpc.web.MethodType.UNARY,
  proto.streamer.ConnectRequest,
  proto.streamer.ConnectResponse,
  /**
   * @param {!proto.streamer.ConnectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.streamer.ConnectResponse.deserializeBinary
);


/**
 * @param {!proto.streamer.ConnectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.streamer.ConnectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.streamer.ConnectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.streamer.TwitterWatchServiceClient.prototype.connect =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/streamer.TwitterWatchService/Connect',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_Connect,
      callback);
};


/**
 * @param {!proto.streamer.ConnectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.streamer.ConnectResponse>}
 *     Promise that resolves to the response
 */
proto.streamer.TwitterWatchServicePromiseClient.prototype.connect =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/streamer.TwitterWatchService/Connect',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_Connect);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.streamer.ConnectRequest,
 *   !proto.streamer.ConnectResponse>}
 */
const methodDescriptor_TwitterWatchService_Disconnect = new grpc.web.MethodDescriptor(
  '/streamer.TwitterWatchService/Disconnect',
  grpc.web.MethodType.UNARY,
  proto.streamer.ConnectRequest,
  proto.streamer.ConnectResponse,
  /**
   * @param {!proto.streamer.ConnectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.streamer.ConnectResponse.deserializeBinary
);


/**
 * @param {!proto.streamer.ConnectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.streamer.ConnectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.streamer.ConnectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.streamer.TwitterWatchServiceClient.prototype.disconnect =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/streamer.TwitterWatchService/Disconnect',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_Disconnect,
      callback);
};


/**
 * @param {!proto.streamer.ConnectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.streamer.ConnectResponse>}
 *     Promise that resolves to the response
 */
proto.streamer.TwitterWatchServicePromiseClient.prototype.disconnect =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/streamer.TwitterWatchService/Disconnect',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_Disconnect);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.streamer.StreamRequest,
 *   !proto.streamer.StreamResponse>}
 */
const methodDescriptor_TwitterWatchService_Stream = new grpc.web.MethodDescriptor(
  '/streamer.TwitterWatchService/Stream',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.streamer.StreamRequest,
  proto.streamer.StreamResponse,
  /**
   * @param {!proto.streamer.StreamRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.streamer.StreamResponse.deserializeBinary
);


/**
 * @param {!proto.streamer.StreamRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.streamer.StreamResponse>}
 *     The XHR Node Readable Stream
 */
proto.streamer.TwitterWatchServiceClient.prototype.stream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/streamer.TwitterWatchService/Stream',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_Stream);
};


/**
 * @param {!proto.streamer.StreamRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.streamer.StreamResponse>}
 *     The XHR Node Readable Stream
 */
proto.streamer.TwitterWatchServicePromiseClient.prototype.stream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/streamer.TwitterWatchService/Stream',
      request,
      metadata || {},
      methodDescriptor_TwitterWatchService_Stream);
};


module.exports = proto.streamer;

