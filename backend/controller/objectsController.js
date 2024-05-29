// src/controllers/objectsController.js
const fs = require('fs');

const path = require('path');
const ObjectModel = require('../model/ojectModel');
const BucketModel = require('../model/bucketModel');
const mime = require('mime-types')




exports.streamObjectById = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await ObjectModel.findById(fileId);

    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    const filePath = path.join(__dirname, '../uploads', file.url.split('/uploads/')[1]);

    // Determine the MIME type of the file
    const mimeType = mime.contentType(path.extname(filePath));

    if (!mimeType) {
      return res.status(400).json({ success: false, message: 'Unknown file type' });
    }

    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': mimeType, // Set the correct MIME type
      'Content-Length': stat.size
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (error) {
    console.error('Error streaming file:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
  //upload File
  exports.putFile = async (req, res) => {
    try {
      const { bucketId } = req.params;
      const file = req.file;
  
      if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }
  
      //check if the bucket exits

      const bucketExits = await BucketModel.findById(bucketId)

      if(!bucketExits){
        return res.status(404).json({success : false , message : "Bucket not found"})
      }
      // Construct file URL
      const fileUrl = file.path.replace(/\\/g, "/");
      const fileName = fileUrl.split("/").pop();
      const url = `http://${req.headers.host}/uploads/${bucketId}/${fileName}`;
  
      const newFile = new ObjectModel({
        filename: file.originalname,
        url: url,
        bucketId,
      });
  
      await newFile.save();
  
      res.status(201).json({ success: true, file: newFile });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };


  // exports.getObjectById = async(req, res) => {
  //   try {
  //     const  fileId  = req.params.id;
      
  //     // Find the file by either ID or name
  //     const file = await ObjectModel.findById(fileId);
  
  //     if (!file) {
  //       return res.status(404).json({ success: false, message: 'File not found' });
  //     }
  
  //     // Return the file details
  //     res.status(200).json({ success: true, file });
  //   } catch (error) {
  //     console.error('Error fetching file:', error);
  //     res.status(500).json({ success: false, message: 'Internal Server Error' });
  //   }
  //   };
  

    exports.listObjectsInBucket = async (req, res) => {
      try {
        const { bucketId } = req.params;
        console.log(bucketId)
        const objects = await ObjectModel.find({ bucketId });
        console.log(objects)
        res.status(200).json({ success: true, objects });
      } catch (error) {
        console.error('Error listing objects in bucket:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    };


    // Update File by ID
    exports.updateFileById = async (req, res) => {
      try {
        const fileId = req.params.id; //  the file ID is passed as a route parameter
        const file = req.file; // New file data received in the request
    
        if (!file) {
          return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
    
        const bucketId = req.params.bucketId; // Assuming the bucket ID is passed as a route parameter
    
        // Construct file URL
        const fileUrl = file.path.replace(/\\/g, "/");
        const fileName = fileUrl.split("/").pop();
        const url = `http://${req.headers.host}/uploads/${bucketId}/${fileName}`;
    
        // Find the file by ID
        const existingFile = await ObjectModel.findById(fileId);
    
        if (!existingFile) {
          return res.status(404).json({ success: false, message: 'File not found' });
        }
    
        // Update the file's metadata
        existingFile.filename = file.originalname;
        existingFile.url = url;
    
        // Save the updated file object
        const updatedFile = await existingFile.save();
    
        res.status(200).json({ success: true, file: updatedFile });
      } catch (error) {
        console.error('Error updating file:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    };
    
    

   
//delete file
exports.deleteObjectById = async (req, res) => {
  try {
    const objectId = req.params.id;
 
    // Find the object by ID
    const object = await ObjectModel.findById(objectId);
    if (!object) {
      return res.status(404).json({ message: 'Object not found' });
    }

    // Extract file path from the URL
    const urlPath = new URL(object.url).pathname; // Get the pathname from the URL
    const filename = path.basename(urlPath); // Extract the filename from the URL path
    // Construct the full path with the bucket ID
    const bucketId = object.bucketId.toString(); // Convert the bucket ID to a string
    const fullPath = path.join(__dirname, '../uploads', bucketId, filename);

    
    // Check if the file exists before attempting deletion
    const fileExists = fs.existsSync(fullPath);
    console.log("fileexist",fileExists)
    if (!fileExists) {
      return res.status(404).json({ message: 'File not found on disk' });
    }

    // Delete the file from the disk
    fs.unlinkSync(fullPath);

    // Delete the object from the database
    await ObjectModel.findByIdAndDelete(objectId);

    res.status(204).json({ message: 'Object deleted successfully' });
  } catch (error) {
    console.error('Error deleting object:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};