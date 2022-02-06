module.exports.canGetUser = (req, res, next) => {
    const sender = res.locals.sender;
    const userId = req.params._id;

    if (sender._id.toString() === userId) return next();

    if (sender.role === "Admin") return next();

    console.log(`        Permission d'obtenir l'utilisateur avec l'ID : ${userId} refusé.`);
    return res.status(403).json({ message: `Vous n'avez pas la permissions d'obtenir l'utilisateur avec l'ID : ${userId}.` });
}

module.exports.canGetUsers = (req, res, next) => {
    const sender = res.locals.sender;

    if (sender.role === "Admin") return next();

    console.log(`        Permission d'obtenir tous les utilisateurs refusé.`);
    return res.status(403).json({ message: `Vous n'avez pas la permissions d'obtenir tous les utilisateurs.` });
}

module.exports.canEditUser = (req, res, next) => {
    const sender = res.locals.sender;
    const userId = req.params._id;

    if (sender._id.toString() === userId) return next();

    if (sender.role === "Admin") return next();

    console.log(`        Permission d'éditer l'utilisateur avec l'ID : ${userId} refusé.`);
    return res.status(403).json({ message: `Vous n'avez pas la permissions d'éditer l'utilisateur avec l'ID : ${userId}.` });
}

module.exports.canDeleteUser = (req, res, next) => {
    const sender = res.locals.sender;
    const userId = req.params._id;

    if (sender._id.toString() === userId) return next();

    if (sender.role === "Admin") return next();

    console.log(`        Permission de supprimer l'utilisateur avec l'ID : ${userId} refusé.`);
    return res.status(403).json({ message: `Vous n'avez pas la permissions de supprimer l'utilisateur avec l'ID : ${userId}.` });
}