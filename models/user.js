const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

//déclaration du model utilisateur
const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  name: { type: String, required: true },
  following: [{type: Schema.Types.ObjectId, ref: "user"}]
});

//cryptage du mot de passe
UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(5);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

//vérification de la validité du mot de passe
UserSchema.methods.validPassword = async function(candidatePassword) {
  const result = await bcrypt.compare(candidatePassword, this.password);
  return result;
};

module.exports = mongoose.model("user", UserSchema);
