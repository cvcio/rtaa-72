/**
 * @fileoverview gRPC-Web generated client stub for classification
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

var proto_cvcio_classification_meta_pb = require('../../../proto/cvcio/classification/meta_pb.js')

var proto_cvcio_classification_predictions_pb = require('../../../proto/cvcio/classification/predictions_pb.js')
const proto = {};
proto.classification = require('./accounts_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.classification.AccountServiceClient =
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
proto.classification.AccountServicePromiseClient =
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
 *   !proto.classification.TwitterAccount,
 *   !proto.classification.ResponseAccount>}
 */
const methodDescriptor_AccountService_ClassifyTwitterAccount = new grpc.web.MethodDescriptor(
  '/classification.AccountService/ClassifyTwitterAccount',
  grpc.web.MethodType.UNARY,
  proto.classification.TwitterAccount,
  proto.classification.ResponseAccount,
  /**
   * @param {!proto.classification.TwitterAccount} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.classification.ResponseAccount.deserializeBinary
);


/**
 * @param {!proto.classification.TwitterAccount} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.classification.ResponseAccount)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.classification.ResponseAccount>|undefined}
 *     The XHR Node Readable Stream
 */
proto.classification.AccountServiceClient.prototype.classifyTwitterAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/classification.AccountService/ClassifyTwitterAccount',
      request,
      metadata || {},
      methodDescriptor_AccountService_ClassifyTwitterAccount,
      callback);
};


/**
 * @param {!proto.classification.TwitterAccount} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.classification.ResponseAccount>}
 *     Promise that resolves to the response
 */
proto.classification.AccountServicePromiseClient.prototype.classifyTwitterAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/classification.AccountService/ClassifyTwitterAccount',
      request,
      metadata || {},
      methodDescriptor_AccountService_ClassifyTwitterAccount);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.classification.TwitterAccountList,
 *   !proto.classification.ResponseAccountList>}
 */
const methodDescriptor_AccountService_ClassifyTwitterAccounts = new grpc.web.MethodDescriptor(
  '/classification.AccountService/ClassifyTwitterAccounts',
  grpc.web.MethodType.UNARY,
  proto.classification.TwitterAccountList,
  proto.classification.ResponseAccountList,
  /**
   * @param {!proto.classification.TwitterAccountList} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.classification.ResponseAccountList.deserializeBinary
);


/**
 * @param {!proto.classification.TwitterAccountList} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.classification.ResponseAccountList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.classification.ResponseAccountList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.classification.AccountServiceClient.prototype.classifyTwitterAccounts =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/classification.AccountService/ClassifyTwitterAccounts',
      request,
      metadata || {},
      methodDescriptor_AccountService_ClassifyTwitterAccounts,
      callback);
};


/**
 * @param {!proto.classification.TwitterAccountList} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.classification.ResponseAccountList>}
 *     Promise that resolves to the response
 */
proto.classification.AccountServicePromiseClient.prototype.classifyTwitterAccounts =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/classification.AccountService/ClassifyTwitterAccounts',
      request,
      metadata || {},
      methodDescriptor_AccountService_ClassifyTwitterAccounts);
};


module.exports = proto.classification;

