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

var proto_cvcio_classification_meta_pb = require('../../../proto/cvcio/classification/meta_pb.js')

var proto_cvcio_classification_predictions_pb = require('../../../proto/cvcio/classification/predictions_pb.js')
const proto = {};
proto.classification = require('./comments_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.classification.CommentServiceClient =
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
proto.classification.CommentServicePromiseClient =
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
 *   !proto.classification.Comment,
 *   !proto.classification.ResponseToxic>}
 */
const methodDescriptor_CommentService_ClassifyToxic = new grpc.web.MethodDescriptor(
  '/classification.CommentService/ClassifyToxic',
  grpc.web.MethodType.UNARY,
  proto.classification.Comment,
  proto.classification.ResponseToxic,
  /**
   * @param {!proto.classification.Comment} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.classification.ResponseToxic.deserializeBinary
);


/**
 * @param {!proto.classification.Comment} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.classification.ResponseToxic)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.classification.ResponseToxic>|undefined}
 *     The XHR Node Readable Stream
 */
proto.classification.CommentServiceClient.prototype.classifyToxic =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/classification.CommentService/ClassifyToxic',
      request,
      metadata || {},
      methodDescriptor_CommentService_ClassifyToxic,
      callback);
};


/**
 * @param {!proto.classification.Comment} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.classification.ResponseToxic>}
 *     Promise that resolves to the response
 */
proto.classification.CommentServicePromiseClient.prototype.classifyToxic =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/classification.CommentService/ClassifyToxic',
      request,
      metadata || {},
      methodDescriptor_CommentService_ClassifyToxic);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.classification.CommentList,
 *   !proto.classification.ResponseToxicList>}
 */
const methodDescriptor_CommentService_ClassifyToxicList = new grpc.web.MethodDescriptor(
  '/classification.CommentService/ClassifyToxicList',
  grpc.web.MethodType.UNARY,
  proto.classification.CommentList,
  proto.classification.ResponseToxicList,
  /**
   * @param {!proto.classification.CommentList} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.classification.ResponseToxicList.deserializeBinary
);


/**
 * @param {!proto.classification.CommentList} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.classification.ResponseToxicList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.classification.ResponseToxicList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.classification.CommentServiceClient.prototype.classifyToxicList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/classification.CommentService/ClassifyToxicList',
      request,
      metadata || {},
      methodDescriptor_CommentService_ClassifyToxicList,
      callback);
};


/**
 * @param {!proto.classification.CommentList} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.classification.ResponseToxicList>}
 *     Promise that resolves to the response
 */
proto.classification.CommentServicePromiseClient.prototype.classifyToxicList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/classification.CommentService/ClassifyToxicList',
      request,
      metadata || {},
      methodDescriptor_CommentService_ClassifyToxicList);
};


module.exports = proto.classification;

