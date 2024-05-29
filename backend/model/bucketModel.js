// BucketModel.js
const mongoose = require('mongoose');

const bucketSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true },

  userId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true },
  createdAt: { type: Date, default: Date.now }
});

const BucketModel = mongoose.model('Bucket', bucketSchema);

module.exports = BucketModel;
