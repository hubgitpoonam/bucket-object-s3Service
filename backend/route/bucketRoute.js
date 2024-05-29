const express = require('express');

const { getAllBuckets, createBucket, deleteBucketById, getBucketById, updateBucketById, getBucket } = require('../controller/bucketsController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.get('/buckets', isAuthenticatedUser,getAllBuckets);
router.get('/all/buckets', getBucket);

router.get('/buckets/:id', isAuthenticatedUser, getBucketById);

router.post('/create/buckets', isAuthenticatedUser,createBucket);

router.put('/update/bucket/:id', isAuthenticatedUser,updateBucketById);

router.delete('/buckets/:id',isAuthenticatedUser,deleteBucketById);

module.exports = router;