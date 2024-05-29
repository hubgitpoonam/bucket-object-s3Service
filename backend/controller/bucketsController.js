// controllers/bucketController.js
const BucketModel = require('../model/bucketModel');


// Create a new bucket
exports.createBucket = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name)
    
    console.log('Request User:', req.user._id);
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User ID not provided' });
    }

    // Check if userId is available in the request object
    const  userId  = req.user._id;
    console.log('User ID:', userId)
    

    const bucket = new BucketModel({ name, userId });
    const savedBucket = await bucket.save();
  

    res.status(201).json({ message: 'Bucket created successfully', bucket: savedBucket });
  } catch (error) {
    console.error('Error creating bucket:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all buckets for a user
exports.getAllBuckets = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming userId is available in the request (after authentication)
    const buckets = await BucketModel.find({ userId });
    res.status(200).json({success:true, message: 'Buckets fetched successfully',
     buckets });
  } catch (error) {
    console.error('Error fetching buckets:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getBucketById = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming userId is available in the request (after authentication)
    const bucketId = req.params.id;

    const bucket = await BucketModel.findOne({ _id: bucketId, userId });

    if (!bucket) {
      return res.status(404).json({ message: 'Bucket not found or unauthorized' });
    }

    res.status(200).json({ message: 'Bucket fetched successfully', bucket });
  } catch (error) {
    console.error('Error fetching bucket:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.getBucket= async (req, res) => {
  try {

    const bucket = await BucketModel.find();

    if (!bucket) {
      return res.status(404).json({ message: 'Bucket not found' });
    }

    res.status(200).json({ message: 'Bucket fetched successfully', bucket });
  } catch (error) {
    console.error('Error fetching bucket:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.updateBucketById = async (req, res) => {
  try {
    const userId = req.user._id; 
    const bucketId = req.params.id;
    const { name } = req.body;

    // Find the bucket to update
    const bucket = await BucketModel.findOne({ _id: bucketId, userId });

    // Check if the bucket exists and belongs to the authenticated user
    if (!bucket) {
      return res.status(404).json({ success: false, message: 'Bucket not found or unauthorized' });
    }

    // Update the bucket's name
    bucket.name = name || bucket.name;
    const updatedBucket = await bucket.save();

    // Send the updated bucket in the response
    res.status(200).json({ success: true, message: 'Bucket updated successfully', bucket: updatedBucket });
  } catch (error) {
    console.error('Error updating bucket:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};




// Delete a bucket by ID
exports.deleteBucketById = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming userId is available in the request (after authentication)
    const bucketId = req.params.id;

    // Log the userId and bucketId to verify the values
    console.log('User ID:', userId);
    console.log('Bucket ID:', bucketId);

    if (!bucketId) {
      return res.status(400).json({ message: 'Bucket ID is required' });
    }

    // Find and delete the bucket associated with the authenticated user
    const bucket = await BucketModel.findOneAndDelete({ _id: bucketId, userId });

    // Log the found bucket
    console.log('Bucket:', bucket);

    if (!bucket) {
      return res.status(404).json({ message: 'Bucket not found or unauthorized' });
    }

    res.status(200).json({ message: 'Bucket deleted successfully' });
  } catch (error) {
    console.error('Error deleting bucket:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
