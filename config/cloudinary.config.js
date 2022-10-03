const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
 
const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  params: { // see: https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters
    folder: 'vibes', // bien donné le nom du dossier créé dans Cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg', 'svg'],
    // resource_type: 'raw', // on donne les formats de fichiers autorisés
    public_id: (req, file) => file.originalname // nous gardons avec originalname le nom du fichier d'origine (bonne pratique, nommmer l'image comme le titre)
  }
});

const uploadCloud = multer({ storage });
 
module.exports = uploadCloud;