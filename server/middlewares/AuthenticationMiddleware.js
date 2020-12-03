const { jwtVerify, jwtAdder } = require("../tools/jwtTools");

const AuthenticationMiddleware = (req, res, next) => {
    const bearer = req.headers['authorisation'];
    if (!bearer) return next();
    const token = bearer.slice(7);


    jwtVerify(token, (decoded) => {
        req.currentUserId = decoded.id;
        jwtAdder(res, {id: decoded.id});
        return next();
    }, () => {
        return res.status(403).send("DISCONECTION");
    });

};

module.exports = AuthenticationMiddleware;