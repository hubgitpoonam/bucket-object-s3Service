const multer = require('multer');
const path = require('path');

const fs = require('fs')

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination folder dynamically based on the bucket ID
    const bucketId = req.params.bucketId; // Assuming bucketId is obtained from route parameters
    const uploadPath = path.join(__dirname, '../uploads', bucketId);

    // Create the folder if it doesn't exist
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating upload folder:', err);
        return cb(err);
      }
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original filename
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

module.exports = upload;
