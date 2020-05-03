const { body } = require("express-validator/check");

exports.hasDescription = body("description")
  .isLength({ min: 5 })
  .withMessage("La description est obligatoire. Elle doit être composée de 5 caractères au minimum");

  exports.isEmail = body("email")
  .isEmail()
  .withMessage("Le champ doit contenir un bon format de mail");

  exports.hasPassword = body("password")
  .exists()
  .withMessage("Le mot de passe ne doit pas être vide !");

  exports.hasName = body("name")
  .isLength({min: 5})
  .withMessage("Le nom est obligatoire. Il doit contenir au minimun 5 caractères")