const express = require('express');
const { getAllBuckets, createBucket, deleteBucketById } = require('../controller/bucketsController');
const router = express.Router();

// router.get('/getuser',getUser);

/**
 * @swagger
 * /api/buckets:
 *   get:
 *     summary: Get all buckets
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

router.get('/buckets', getAllBuckets);
/**
 * @swagger
 * /api/create/buckets:
 *   post:
 *     summary: Create a new bucket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bucketName:
 *                 type: string
 *                 example: "MyBucket"
 *     responses:
 *       201:
 *         description: Bucket created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal Server Error
 */
router.post('/create/buckets', createBucket);

/**
 * @swagger
 * /api/buckets/{bucketId}:
 *   delete:
 *     summary: Delete bucket by ID
 *     parameters:
 *       - in: path
 *         name: bucketId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the bucket
 *     responses:
 *       204:
 *         description: Bucket deleted successfully
 *       404:
 *         description: Bucket not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/buckets/:bucketId',deleteBucketById);

module.exports = router;