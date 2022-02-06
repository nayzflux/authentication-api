const UserModel = require("../models/user.model");

module.exports.isAuth = async (req, res, next) => {
    const session = req.session;

    // si l'utilisateur n'est pas authentifier ou que l'utilisateur n'existe plus
    if (!session.authenticated) return res.status(401).json({ message: "Authentification requise !" });
    if (!session.user || !session.user._id) return res.status(401).json({ message: "Authentification requise !" });
    if (!await UserModel.exists({ _id: session.user._id })) return res.status(401).json({ message: "Authentification requise !" });

    const user = await UserModel.findOne({ _id: session.user._id }).select("-password");

    res.locals.sender = user;

    console.log(`Authentifié en tant que ${user.email}.`);
    return next();
}