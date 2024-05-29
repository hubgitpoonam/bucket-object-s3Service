const express = require('express')
const router = express.Router();
const upload = require('../middleware/multer');
const path = require('path');
const fs = require('fs')


const { getObjectById,  deleteObjectById, putFile, listObjectsInBucket, streamObjectById, updateFileById } = require('../controller/objectsController');
const { isAuthenticatedUser } = require('../middleware/auth');
const { updateBucketById } = require('../controller/bucketsController');




router.put('/buckets/:bucketId/files/:id', upload.single('file'), updateFileById);
router.get('/objects/:id',streamObjectById);
router.post('/buckets/:bucketId/file',upload.single('file'), putFile,isAuthenticatedUser);

router.get('/bucket/ojbects/:bucketId', listObjectsInBucket,isAuthenticatedUser);

router.delete('/delete/:id', deleteObjectById);
module.exports = router;