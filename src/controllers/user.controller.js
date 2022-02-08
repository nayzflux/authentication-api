const UserModel = require("../models/user.model");

module.exports.get = async (req, res) => {
    const userId = escape(req.params._id);

    if (!await UserModel.exists({ _id: userId })) return res.status(404).json({ message: `Utilisateur avec l'ID ${userId} n'existe pas.` });

    const user = await UserModel.findOne({ _id: userId }).select("-password");

    console.log(`        Utilisateur ${user.email} obtenue.`);
    return res.status(200).json({ message: `Utilisateur ${user.email} obtenue.`, user: user });
}

module.exports.getAll = async (req, res) => {
    const users = await UserModel.find().select("-password");
    return res.status(200).json({ users: users });
}

module.exports.edit = async (req, res) => {
    const userId = escape(req.params._id);
    const user = req.body.user;

    if (!await UserModel.exists({ _id: userId })) return res.status(404).json({ message: `Utilisateur avec l'ID ${userId} n'existe pas.` });

    const newUser = await UserModel.findOneAndUpdate({ _id: userId }, user, { new: true }).select("-password");

    console.log(`        Utilisateur ${newUser.email} édité.`);
    return res.status(200).json({ message: `Utilisateur ${newUser.email} édité.`, user: newUser });
}

module.exports.delete = async (req, res) => {
    const userId = escape(req.params._id);

    if (!await UserModel.exists({ _id: userId })) return res.status(404).json({ message: `Utilisateur avec l'ID ${userId} n'existe pas.` });

    const oldUser = await UserModel.findOneAndDelete({ _id: userId }).select("-password");

    console.log(`        Utilisateur ${oldUser.email} supprimé.`);
    return res.status(200).json({ message: `Utilisateur ${oldUser.email} supprimé.`, user: oldUser });
}