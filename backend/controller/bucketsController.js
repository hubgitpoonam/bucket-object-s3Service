// bucketsController.js

const bucketsService = require('../services/bucketsService');
const objectsService = require('../services/objectsService');
const fs = require('fs')

exports.getAllBuckets = (req, res) => {
    try {
        const buckets = bucketsService.getAllBuckets();
        res.status(200).json(
            {message:"fetched all buckets", getBucket:buckets},
           
        );
      } catch (error) {
        console.error('Error fetching buckets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

exports.createBucket = (req, res) => {
    try {
        const { bucketName } = req.body;
        
        if (!bucketName) {
          return res.status(400).json({ error: 'Bucket name is required' });
        }
        
        const newBucket = bucketsService.createBucket(bucketName);
        res.status(201).json(
            
          {message:"Bucket created successsfully " ,bucket: newBucket});
      } catch (error) {
        console.error('Error creating bucket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

exports.deleteBucketById = (req, res) => {
    const { bucketId } = req.params;
  
    try {
      const bucket = bucketsService.getBucketById(bucketId);
      if (!bucket) {
        return res.status(404).json({ message: 'Bucket not found' });
      }
  
      // Delete all objects in the bucket
      const objectsInBucket = objectsService.getAllObjectsInBucket(bucketId);
      objectsInBucket.forEach(object => {
        objectsService.deleteObject(object.id);
        fs.unlink(object.data, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('File deleted successfully');
          }
        });
      });
  
      // Delete the bucket
      const deleted = bucketsService.deleteBucket(bucketId);
      if (!deleted) {
        return res.status(404).json({ message: 'Bucket not found' });
      }
  
      res.status(204).json({ message: 'Bucket deleted successfully' });
    } catch (error) {
      console.error('Error deleting bucket:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };