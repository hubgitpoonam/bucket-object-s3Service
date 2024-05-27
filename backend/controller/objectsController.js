// src/controllers/objectsController.js
const fs = require('fs');
const objectsService = require('../services/objectsService');
const bucketsService = require('../services/bucketsService');

exports.getObjectById = (req, res) => {
    try {
      const { objectId } = req.params;
      console.log("fetch id", objectId);
      const filePath = objectsService.getFilePath(objectId);
      console.log("file path", filePath);
  
      if (!filePath) {
        return res.status(404).json({ message: 'Object not found' });
      }
  
      // Streaming the file
      const readStream = fs.createReadStream(filePath);
      
      readStream.on('error', () => res.status(404).json({ message: 'Object not found' }));
      readStream.pipe(res);
    } catch (error) {
      console.error('Error fetching object:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.uploadObject = (req, res) => {
    try {
      const { bucketId } = req.params;
      const bucket = bucketsService.getBucketById(bucketId);
  
      if (!bucket) {
        return res.status(404).json({ message: 'Bucket not found' });
      }
  
      const uploadedObject = objectsService.uploadObject(req.file, bucketId);
      console.log('Uploaded object:', uploadedObject);
      res.status(201).json({ message: 'Object uploaded successfully', data: uploadedObject });
    } catch (error) {
      console.error('Error uploading object:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  exports.getAllObjectsInBucket = (req, res) => {
    try {
      const { bucketId } = req.params;
      const objects = objectsService.getAllObjectsInBucket(bucketId);
      res.status(200).json({ message: 'Objects fetched successfully', data: objects });
    } catch (error) {
      console.error('Error fetching objects:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  exports.deleteObjectById = (req, res) => {
    try {
      const { objectId } = req.params;
  
      // Check if the object exists
      const object = objectsService.getObjectById(objectId);
      if (!object) {
        return res.status(404).json({ message: 'Object not found' });
      }
  
      // Delete the object from the objects array
      objectsService.deleteObject(objectId);
  
      // Delete the file from the disk
      fs.unlink(object.data, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        console.log('File deleted successfully');
        res.status(204).json({ message: 'Object deleted successfully' });
      });
    } catch (error) {
      console.error('Error deleting object:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };