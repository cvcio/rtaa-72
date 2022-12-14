// source: proto/cvcio/classification/accounts.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

//var google_api_annotations_pb = require('../../../google/api/annotations_pb.js');
//goog.object.extend(proto, google_api_annotations_pb);
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
goog.object.extend(proto, google_protobuf_timestamp_pb);
var proto_cvcio_classification_meta_pb = require('../../../proto/cvcio/classification/meta_pb.js');
goog.object.extend(proto, proto_cvcio_classification_meta_pb);
var proto_cvcio_classification_predictions_pb = require('../../../proto/cvcio/classification/predictions_pb.js');
goog.object.extend(proto, proto_cvcio_classification_predictions_pb);
goog.exportSymbol('proto.classification.ResponseAccount', null, global);
goog.exportSymbol('proto.classification.ResponseAccountList', null, global);
goog.exportSymbol('proto.classification.TwitterAccount', null, global);
goog.exportSymbol('proto.classification.TwitterAccountList', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.classification.TwitterAccount = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.classification.TwitterAccount, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.classification.TwitterAccount.displayName = 'proto.classification.TwitterAccount';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.classification.TwitterAccountList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.classification.TwitterAccountList.repeatedFields_, null);
};
goog.inherits(proto.classification.TwitterAccountList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.classification.TwitterAccountList.displayName = 'proto.classification.TwitterAccountList';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.classification.ResponseAccount = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.classification.ResponseAccount.repeatedFields_, null);
};
goog.inherits(proto.classification.ResponseAccount, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.classification.ResponseAccount.displayName = 'proto.classification.ResponseAccount';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.classification.ResponseAccountList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.classification.ResponseAccountList.repeatedFields_, null);
};
goog.inherits(proto.classification.ResponseAccountList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.classification.ResponseAccountList.displayName = 'proto.classification.ResponseAccountList';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.classification.TwitterAccount.prototype.toObject = function(opt_includeInstance) {
  return proto.classification.TwitterAccount.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.classification.TwitterAccount} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.classification.TwitterAccount.toObject = function(includeInstance, msg) {
  var f, obj = {
    followers: jspb.Message.getFieldWithDefault(msg, 1, 0),
    following: jspb.Message.getFieldWithDefault(msg, 2, 0),
    tweets: jspb.Message.getFieldWithDefault(msg, 3, 0),
    favorites: jspb.Message.getFieldWithDefault(msg, 4, 0),
    listed: jspb.Message.getFieldWithDefault(msg, 5, 0),
    defaultProfile: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
    verified: jspb.Message.getBooleanFieldWithDefault(msg, 7, false),
    createdAt: (f = msg.getCreatedAt()) && google_protobuf_timestamp_pb.Timestamp.toObject(includeInstance, f),
    meta: (f = msg.getMeta()) && proto_cvcio_classification_meta_pb.Meta.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.classification.TwitterAccount}
 */
proto.classification.TwitterAccount.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.classification.TwitterAccount;
  return proto.classification.TwitterAccount.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.classification.TwitterAccount} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.classification.TwitterAccount}
 */
proto.classification.TwitterAccount.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFollowers(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFollowing(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTweets(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFavorites(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setListed(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDefaultProfile(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setVerified(value);
      break;
    case 8:
      var value = new google_protobuf_timestamp_pb.Timestamp;
      reader.readMessage(value,google_protobuf_timestamp_pb.Timestamp.deserializeBinaryFromReader);
      msg.setCreatedAt(value);
      break;
    case 9:
      var value = new proto_cvcio_classification_meta_pb.Meta;
      reader.readMessage(value,proto_cvcio_classification_meta_pb.Meta.deserializeBinaryFromReader);
      msg.setMeta(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.classification.TwitterAccount.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.classification.TwitterAccount.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.classification.TwitterAccount} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.classification.TwitterAccount.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFollowers();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getFollowing();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getTweets();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getFavorites();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getListed();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getDefaultProfile();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getVerified();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getCreatedAt();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      google_protobuf_timestamp_pb.Timestamp.serializeBinaryToWriter
    );
  }
  f = message.getMeta();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto_cvcio_classification_meta_pb.Meta.serializeBinaryToWriter
    );
  }
};


/**
 * optional int64 followers = 1;
 * @return {number}
 */
proto.classification.TwitterAccount.prototype.getFollowers = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.classification.TwitterAccount} returns this
 */
proto.classification.TwitterAccount.prototype.setFollowers = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 following = 2;
 * @return {number}
 */
proto.classification.TwitterAccount.prototype.getFollowing = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.classification.TwitterAccount} returns this
 */
proto.classification.TwitterAccount.prototype.setFollowing = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int64 tweets = 3;
 * @return {number}
 */
proto.classification.TwitterAccount.prototype.getTweets = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.classification.TwitterAccount} returns this
 */
proto.classification.TwitterAccount.prototype.setTweets = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 favorites = 4;
 * @return {number}
 */
proto.classification.TwitterAccount.prototype.getFavorites = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.classification.TwitterAccount} returns this
 */
proto.classification.TwitterAccount.prototype.setFavorites = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int64 listed = 5;
 * @return {number}
 */
proto.classification.TwitterAccount.prototype.getListed = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.classification.TwitterAccount} returns this
 */
proto.classification.TwitterAccount.prototype.setListed = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional bool default_profile = 6;
 * @return {boolean}
 */
proto.classification.TwitterAccount.prototype.getDefaultProfile = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.classification.TwitterAccount} returns this
 */
proto.classification.TwitterAccount.prototype.setDefaultProfile = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional bool verified = 7;
 * @return {boolean}
 */
proto.classification.TwitterAccount.prototype.getVerified = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.classification.TwitterAccount} returns this
 */
proto.classification.TwitterAccount.prototype.setVerified = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * optional google.protobuf.Timestamp created_at = 8;
 * @return {?proto.google.protobuf.Timestamp}
 */
proto.classification.TwitterAccount.prototype.getCreatedAt = function() {
  return /** @type{?proto.google.protobuf.Timestamp} */ (
    jspb.Message.getWrapperField(this, google_protobuf_timestamp_pb.Timestamp, 8));
};


/**
 * @param {?proto.google.protobuf.Timestamp|undefined} value
 * @return {!proto.classification.TwitterAccount} returns this
*/
proto.classification.TwitterAccount.prototype.setCreatedAt = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.classification.TwitterAccount} returns this
 */
proto.classification.TwitterAccount.prototype.clearCreatedAt = function() {
  return this.setCreatedAt(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.classification.TwitterAccount.prototype.hasCreatedAt = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional Meta meta = 9;
 * @return {?proto.classification.Meta}
 */
proto.classification.TwitterAccount.prototype.getMeta = function() {
  return /** @type{?proto.classification.Meta} */ (
    jspb.Message.getWrapperField(this, proto_cvcio_classification_meta_pb.Meta, 9));
};


/**
 * @param {?proto.classification.Meta|undefined} value
 * @return {!proto.classification.TwitterAccount} returns this
*/
proto.classification.TwitterAccount.prototype.setMeta = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.classification.TwitterAccount} returns this
 */
proto.classification.TwitterAccount.prototype.clearMeta = function() {
  return this.setMeta(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.classification.TwitterAccount.prototype.hasMeta = function() {
  return jspb.Message.getField(this, 9) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.classification.TwitterAccountList.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.classification.TwitterAccountList.prototype.toObject = function(opt_includeInstance) {
  return proto.classification.TwitterAccountList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.classification.TwitterAccountList} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.classification.TwitterAccountList.toObject = function(includeInstance, msg) {
  var f, obj = {
    accountsList: jspb.Message.toObjectList(msg.getAccountsList(),
    proto.classification.TwitterAccount.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.classification.TwitterAccountList}
 */
proto.classification.TwitterAccountList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.classification.TwitterAccountList;
  return proto.classification.TwitterAccountList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.classification.TwitterAccountList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.classification.TwitterAccountList}
 */
proto.classification.TwitterAccountList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.classification.TwitterAccount;
      reader.readMessage(value,proto.classification.TwitterAccount.deserializeBinaryFromReader);
      msg.addAccounts(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.classification.TwitterAccountList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.classification.TwitterAccountList.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.classification.TwitterAccountList} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.classification.TwitterAccountList.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAccountsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.classification.TwitterAccount.serializeBinaryToWriter
    );
  }
};


/**
 * repeated TwitterAccount accounts = 1;
 * @return {!Array<!proto.classification.TwitterAccount>}
 */
proto.classification.TwitterAccountList.prototype.getAccountsList = function() {
  return /** @type{!Array<!proto.classification.TwitterAccount>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.classification.TwitterAccount, 1));
};


/**
 * @param {!Array<!proto.classification.TwitterAccount>} value
 * @return {!proto.classification.TwitterAccountList} returns this
*/
proto.classification.TwitterAccountList.prototype.setAccountsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.classification.TwitterAccount=} opt_value
 * @param {number=} opt_index
 * @return {!proto.classification.TwitterAccount}
 */
proto.classification.TwitterAccountList.prototype.addAccounts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.classification.TwitterAccount, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.classification.TwitterAccountList} returns this
 */
proto.classification.TwitterAccountList.prototype.clearAccountsList = function() {
  return this.setAccountsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.classification.ResponseAccount.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.classification.ResponseAccount.prototype.toObject = function(opt_includeInstance) {
  return proto.classification.ResponseAccount.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.classification.ResponseAccount} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.classification.ResponseAccount.toObject = function(includeInstance, msg) {
  var f, obj = {
    predictionsList: jspb.Message.toObjectList(msg.getPredictionsList(),
    proto_cvcio_classification_predictions_pb.Prediction.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.classification.ResponseAccount}
 */
proto.classification.ResponseAccount.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.classification.ResponseAccount;
  return proto.classification.ResponseAccount.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.classification.ResponseAccount} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.classification.ResponseAccount}
 */
proto.classification.ResponseAccount.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto_cvcio_classification_predictions_pb.Prediction;
      reader.readMessage(value,proto_cvcio_classification_predictions_pb.Prediction.deserializeBinaryFromReader);
      msg.addPredictions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.classification.ResponseAccount.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.classification.ResponseAccount.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.classification.ResponseAccount} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.classification.ResponseAccount.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPredictionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto_cvcio_classification_predictions_pb.Prediction.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Prediction predictions = 1;
 * @return {!Array<!proto.classification.Prediction>}
 */
proto.classification.ResponseAccount.prototype.getPredictionsList = function() {
  return /** @type{!Array<!proto.classification.Prediction>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto_cvcio_classification_predictions_pb.Prediction, 1));
};


/**
 * @param {!Array<!proto.classification.Prediction>} value
 * @return {!proto.classification.ResponseAccount} returns this
*/
proto.classification.ResponseAccount.prototype.setPredictionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.classification.Prediction=} opt_value
 * @param {number=} opt_index
 * @return {!proto.classification.Prediction}
 */
proto.classification.ResponseAccount.prototype.addPredictions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.classification.Prediction, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.classification.ResponseAccount} returns this
 */
proto.classification.ResponseAccount.prototype.clearPredictionsList = function() {
  return this.setPredictionsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.classification.ResponseAccountList.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.classification.ResponseAccountList.prototype.toObject = function(opt_includeInstance) {
  return proto.classification.ResponseAccountList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.classification.ResponseAccountList} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.classification.ResponseAccountList.toObject = function(includeInstance, msg) {
  var f, obj = {
    accountsList: jspb.Message.toObjectList(msg.getAccountsList(),
    proto.classification.ResponseAccount.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.classification.ResponseAccountList}
 */
proto.classification.ResponseAccountList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.classification.ResponseAccountList;
  return proto.classification.ResponseAccountList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.classification.ResponseAccountList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.classification.ResponseAccountList}
 */
proto.classification.ResponseAccountList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.classification.ResponseAccount;
      reader.readMessage(value,proto.classification.ResponseAccount.deserializeBinaryFromReader);
      msg.addAccounts(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.classification.ResponseAccountList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.classification.ResponseAccountList.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.classification.ResponseAccountList} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.classification.ResponseAccountList.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAccountsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.classification.ResponseAccount.serializeBinaryToWriter
    );
  }
};


/**
 * repeated ResponseAccount accounts = 1;
 * @return {!Array<!proto.classification.ResponseAccount>}
 */
proto.classification.ResponseAccountList.prototype.getAccountsList = function() {
  return /** @type{!Array<!proto.classification.ResponseAccount>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.classification.ResponseAccount, 1));
};


/**
 * @param {!Array<!proto.classification.ResponseAccount>} value
 * @return {!proto.classification.ResponseAccountList} returns this
*/
proto.classification.ResponseAccountList.prototype.setAccountsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.classification.ResponseAccount=} opt_value
 * @param {number=} opt_index
 * @return {!proto.classification.ResponseAccount}
 */
proto.classification.ResponseAccountList.prototype.addAccounts = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.classification.ResponseAccount, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.classification.ResponseAccountList} returns this
 */
proto.classification.ResponseAccountList.prototype.clearAccountsList = function() {
  return this.setAccountsList([]);
};


goog.object.extend(exports, proto.classification);
