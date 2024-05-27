// bucketsService.js
const generateUniqueId = require('../utils/uniqueId')
class BucketsService {
    constructor() {
      this.buckets = [];
    }
  
    getAllBuckets() {
      return this.buckets;
    }
  
    createBucket(bucketName) {
      const newBucket = {
        id: generateUniqueId(),
        name: bucketName,
        objects: [],
      };
      this.buckets.push(newBucket);
      return newBucket;
    }
    
    getBucketById(bucketId) {
        return this.buckets.find(bucket => bucket.id === bucketId);
      }


      deleteBucket(bucketId) {
        const bucketIndex = this.buckets.findIndex(bucket => bucket.id === bucketId);
        if (bucketIndex === -1) {
          return false; // Bucket not found
        }
        this.buckets.splice(bucketIndex, 1);
        return true; // Bucket deleted
      }
     
  }


  
  module.exports = new BucketsService();
  