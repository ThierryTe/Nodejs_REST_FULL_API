const path = require("path");
const multer = require("multer");
//fonction de gestion des images
module.exports = folderName => {
  return multer({
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      if (
        ext !== ".png" &&
        ext !== ".jpg" &&
        ext !== ".gif" &&
        ext !== ".jpeg"
      ) {
        return cb(new Error("Seule les images sont autorisées"));
      }
      cb(null, true);
    },
    dest: `public/uploads/${folderName}/`
  });
};
