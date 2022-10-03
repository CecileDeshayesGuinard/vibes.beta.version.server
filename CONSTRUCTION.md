Création du projet - server
-------

Construction du projet :
+ npx ironlauncher@latest vibes.beta.0 // npx ironlauncher@latest "nom du projet"

=> Choisir JSON (VSCode comprend directement l'utilisation corté server)

Ironlauncher contient :
+ JSON & NODE_MODULES : npm install
+ MONGOOSE : npm install mongoose
+ EXPRESS : npm install express
+ NODEMON : npm i -D nodemon

Packages supplémentaires : installation via le Terminal
+ BCRYPT : npm install bcryptjs
+ CONNECT-MONGO : npm install connect-mongo
+ JSON WEB TOKEN: npm install jsonwebtoken
+ EXPRESS-JWT: npm install express-jwt
+ AXIOS: npm install axios
+ CLOUDINARY / MULTER: npm install cloudinary multer multer-storage-cloudinary

Packages optionnels:
+ CHART.JS : npm i chart.js // pas nécessaire car relation json - react
+ EXPRESS SESSION : npm i express-session / pas nécessaire car relation json - react avec JWT


Méthode :
+ Lancement serveur local : npm run dev


Dépôt git:
-------

Créer un dépôt github

+ git init
+ git add .
+ git commit -m "first-commit"
+ git remote add origin "lien du dépot créé dans github"
+ git push origin master



Fichier .env :
-------

+ TOKEN_SECRET=...

+ CLOUDINARY_URL=...
+ CLOUDINARY_NAME=...
+ CLOUDINARY_KEY=...
+ CLOUDINARY_SECRET=...

+ MONGODB_URI=...



Fichier jwt.middleware.js (le créer dans un dossier middleware, lui même créé par nos soins juste avant)
-------

const { expressjwt } = require('express-jwt')

const midd = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: 'payload', 
  getToken: function (req) {
    // req.headers.authorization "Bearer 1234123412341234kj123k4jhk123jh4.2134k12jh34k"

    return req.headers.authorization.split(' ')[1]
  }
})

module.exports = midd



Fichier cloudinary.config.js (le créer dans le dossier config)
-------
 
+ const cloudinary = require('cloudinary').v2;
+ const { CloudinaryStorage } = require('multer-storage-cloudinary');
+ const multer = require('multer');
 
+ cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
 
+ const storage = new CloudinaryStorage({
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