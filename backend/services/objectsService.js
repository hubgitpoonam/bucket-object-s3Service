

// // objectsService.js

// const path = require('path')
// const generateUniqueId = require('../utils/uniqueId')
// class ObjectsService {
//     constructor() {
//       this.objects = [];
//     }
  
//     getObjectById(objectId) {
//      console.log('Looking for object with ID:', objectId);
//      console.log('Current objects:', this.objects); 
//      const object = this.objects.find(obj => obj.id === objectId);
//       console.log('Object found:', object);
//       return object 
//     }
  
//     uploadObject(file, bucketId) {
//       const newObject = {
//         id: generateUniqueId(),
//         data: file.path,
//         bucketId,
//       };
//       this.objects.push(newObject);
//       console.log('Uploaded object:', newObject);
//       console.log('Current objects after upload:', this.objects); 
//       return newObject;
//     }

    
    
//     getAllObjectsInBucket(bucketId) {
//         return this.objects.filter(obj => obj.bucketId === bucketId);
//       }

//       getFilePath(objectId) {
//         const object = this.getObjectById(objectId);
//         if (object) {
//           return path.resolve(object.data);
//         }
//         return null;
//       }

//       deleteObject(objectId) {
//         this.objects = this.objects.filter(obj => obj.id !== objectId);
//       }
    
//   }
  
//   module.exports = new ObjectsService();
  