// ObjectModel.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: {
     type: String, 
     required: true },

  url: { 
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

const ObjectModel = mongoose.model('File', fileSchema);

module.exports = ObjectModel;
