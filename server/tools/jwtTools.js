const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET } = require('./environnement');

const AUTHENTICATION_DURATION = '1d';

exports.jwtAdder = (res, data) => {
    const authenticationToken = jsonwebtoken.sign(data, JWT_SECRET, {expiresIn: AUTHENTICATION_DURATION});

    res.set('x-access-token', authenticationToken);
}

exports.jwtVerify = (token, successCallback, errorCallback) => {
    jsonwebtoken.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return errorCallback();
        successCallback(decoded);
    });
}