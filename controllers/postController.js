const Post = require("../models/post");
const validationHandler = require("../validations/validationHandler");

exports.index = async (req, res) => {
  try {
    const pagination = req.query.pagination
    ?parseInt(req.query.pagination):10;
    const page = req.query.pagination?parseInt(req.query.page) : 1 ;
    const posts = await Post.find({
      user: {$in: [...req.user.following, req.user.id]}
    })
    .skip((page -1) * pagination)
    .limit(pagination)
    .populate("user")
    .sort({ createdAt: -1 });
    res.send(posts);
  } catch (err) {
    next(err);
  }
};

exports.show = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      user: {$in: [...req.user.following, req.user.id]}
    }).populate("user");

    res.send(post);
  } catch (err) {
    next(err);
  }
};

exports.store = async (req, res, next) => {
  try {
    validationHandler(req);

    let post = new Post();
    post.description = req.body.description;
    post.image = req.file.filename;
    post.user = req.user;
    post = await post.save();

    res.send(post);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    validationHandler(req);
 //vérification si l'utilisateur authentifié est l'auteur
 if (!post || post.user != req.user.id) {
  const error = new Error("Wrong request");
  error.statusCode = 400;
  throw error;
}
    let post = await Post.findById(req.params.id);
    post.description = req.body.description;
    post = await post.save();

    res.send(post);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post || post.user != req.user.id) {
      const error = new Error("Wrong request");
      error.statusCode = 400;
      throw error;
    }
    await post.delete();

    res.send({ message: "suppression terminé" });
  } catch (err) {
    next(err);
  }
};
