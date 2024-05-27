const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const  generateUniqueId = require('../utils/uniqueId')

const { getObjectById, uploadObject, getAllObjectsInBucket, deleteObjectById } = require('../controller/objectsController');
// router.get('/getuser',getUser);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const { bucketId } = req.params;
      const uploadPath = path.join(__dirname, '../../uploads', bucketId);
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${generateUniqueId()}-${file.originalname}`);
    },
  });

const upload = multer({ storage });


router.get('/objects/:objectId',getObjectById);
router.post('/objects/:bucketId', upload.single('file'), uploadObject);
router.get('/bucket/:bucketId', getAllObjectsInBucket);

router.delete('/delete/:objectId', deleteObjectById);
module.exports = router;