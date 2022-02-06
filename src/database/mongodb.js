const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("Connexion à MongoDB effectuée avec succès.")
}).catch((err) => {
    console.log(err);
    console.log("Connexion à MongoDB impossible.");
});