const {Schema, model, Document} = require("mongoose");

const userSchema = new Schema ({
    username: String,
    email: String,
    password: String,
    salt: String
});

module.exports = model('User', userSchema, 'users'); // model du nom de 'User', qui utilise userSchema, appelé 'users' dans la base de données