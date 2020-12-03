const User = require('../models/usersModel');
const crypto = require("crypto");
const nodemon = require('nodemon');

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/**
 * Accept only letters (min and MAJ), numbers and symboles '_', '-', '.' and '&'
 * Minimum : 8
 * Maximum : 128
 */
const USERNAME_REGEX = /^[a-zA-Z0-9_\-&.]{5,128}$/;

/**
 * Accept min, MAJ, numbers, symboles
 * Minimum : 8
 * Maximum : 32
 */
const PASSWORD_REGEX = /^[*.!@$%^&(){}[\]:;<>,.?\/~_+\-=|\\a-zA-Z0-9]{8,32}$/;

const SALT_LENGTH = 255; 

class _AuthentificationController {

    async register(req, res) {
        // Récupérer les infos de l'utilisateur

        const {username, email, password} = req.body;
        if(!USERNAME_REGEX.test(username)) {
            return res.status(400).send("INVALID_USERNAME");
        }
        if(!EMAIL_REGEX.test(email)) {
            return res.status(400).send("INVALID_EMAIL");
        }
        if(!PASSWORD_REGEX.test(password)) {
            return res.status(400).send("INVALID_PASSWORD");
        }

        // Test l'unicité de l'username ou du mail

        const user_username = await User.findOne({
            username
        });

        if(user_username)
            return res.status(401).send("UNSERNAME_TAKEN");

        const user_email = await User.findOne({
            email
        });

        if(user_email)
            return res.status(401).send("EMAIL_TAKEN");

        // Création du salt

        const salt = crypto
            .randomBytes(Math.ceil(SALT_LENGTH/2))
            .toString("hex")
            .slice(0,SALT_LENGTH);

        // Crypter password

        const hash = crypto.createHash("sha512", salt);
        hash.update(password);
        const hashedPassword = hash.digest("hex");

        try{
            const user = await User.create({username, email, password: hashedPassword, salt});
        } catch (exception) {
            console.error(exception);
            return res.status(500).send("SERVER_ERROR");
        }

        return res.json({
            success: "ACCOUNT_CREATED"
        });
    } // user registration

    async login(res, req) {
        // Vérifier que l'utilisateur existe

        // Connexion de l'utilisateur

    } // user login

}

const AuthentificationController = new _AuthentificationController();

module.exports = AuthentificationController;