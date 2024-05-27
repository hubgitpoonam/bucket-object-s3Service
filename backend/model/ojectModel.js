// ObjectModel.js
const mongoose = require('mongoose');

const objectSchema = new mongoose.Schema({
  filename: {
     type: String, 
     required: true },
  path: { 
    type: String,
     required: true },
  bucketId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bucket',
     required: true },
  createdAt: {
     type: Date, 
     default: Date.now }
});

const ObjectModel = mongoose.model('Object', objectSchema);

module.exports = ObjectModel;
