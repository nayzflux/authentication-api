const bcrypt = require("bcrypt");

const UserModel = require("../models/user.model");

module.exports.register = async (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;

    // vérifier les champs
    if (!username) return res.status(400).json({ message: "Merci d'indiquer un nom d'utilisateur." });
    if (!email) return res.status(400).json({ message: "Merci d'indiquer une adresse e-mail." });
    if (!password) return res.status(400).json({ message: "Merci d'indiquer un mot de passe." });
    if (!passwordConfirm) return res.status(400).json({ message: "Merci de confirmer le mot de passe." });

    // vérifier si les mots de passe correspondent
    if (password !== passwordConfirm) return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });

    // vérifier si le nom d'utilisateur et l'adresse e-mail est déjà utilisé
    if (await UserModel.exists({ username: username })) return res.status(400).json({ message: "Ce nom d'utilisateur est déjà utilisé." });
    if (await UserModel.exists({ email: email })) return res.status(400).json({ message: "Cette adresse e-mail est déjà utilisée." });

    // hasher le mot de passe
    const hash = await bcrypt.hash(password, 10);

    // créer l'utilisateur et le renvoyer
    UserModel.create({ username: username, email: email, password: hash, role: "User" }).then((user) => {
        req.session.authenticated = true;
        req.session.user = {
            _id: user._id
        }

        console.log("Utilisateur " + user.email + " créé avec succès.");
        return res.status(201).json({ message: "Utilisateur créé.", user: { username: user.username, email: user.email, role: user.role } });
    }).catch((err) => {
        console.log(err);
        console.log("La création de l'utilisateur a échoué.");
        return res.status(500).json({ message: "Une erreur est survenue." });
    });
}

module.exports.login = async (req, res) => {
    const { username, email, password } = req.body;

    if (!password) return res.status(400).json({ message: "Merci d'indiquer un mot de passe." });

    if (!email && !username) return res.status(400).json({ message: "Merci d'indiquer un nom d'utilisateur ou une adresse e-mail." });

    if (username) {
        // trouver l'utilisateur avec le nom d'utilisateur fourni puis comparer les mots de passe
        UserModel.findOne({ username: { $eq: username } }).then(async (user) => {
            bcrypt.compare(password, user.password).then((result) => {
                if (result === false) {
                    console.log("Accès au compte de " + user.email + " refusé.");
                    return res.status(403).json({ message: "Mot de passe incorrecte." });
                } else {
                    req.session.authenticated = true;
                    req.session.user = {
                        _id: user._id
                    }

                    console.log("Accès au compte de " + user.email + " autorisé.");
                    return res.status(200).json({ message: "Connexion au compte de " + user.email + " réussite." });
                }
            });
        }).catch(() => {
            return res.status(404).json({ message: "L'utilisateur avec ce nom d'utilisateur n'existe pas." });
        });
    }

    if (email) {
        // trouver l'utilisateur avec l'adresse e-mail fourni puis comparer les mots de passe
        UserModel.findOne({ email: { $eq: email } }).then(async (user) => {
            bcrypt.compare(password, user.password).then((result) => {
                if (result === false) {
                    console.log("Accès au compte de " + user.email + " refusé.");
                    return res.status(403).json({ message: "Mot de passe incorrecte." });
                } else {
                    req.session.authenticated = true;
                    req.session.user = {
                        _id: user._id
                    }

                    console.log("Accès au compte de " + user.email + " autorisé.");
                    return res.status(200).json({ message: "Connexion au compte de " + user.email + " réussite." });
                }
            });
        }).catch(() => {
            return res.status(404).json({ message: "L'utilisateur avec ce nom d'utilisateur n'existe pas." });
        });
    }
}

module.exports.logout = async (req, res) => {
    res.cookie("connect.sid", "", { maxAge: 1 });
    req.session.destroy();
    return res.status(200).json({ message: "Déconnexion du compte effectuée avec succès." });
}