const mUsers = require('../models/users');
const vUsers = require('../validators/users');
const validator = require('node-input-validator');


const register = (req, res) => {
    var v = new validator.Validator(req.body, vUsers.createUser);
    v.check()
    .then(matched => {
        if(matched) {
            return mUsers.createUser(req.body);
        } else {
            throw new Error('Validation failed');
        }
    })
    .then(() => {
        return res.status(201).send('ok');
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send(v.errors);
    });
}

const login = () => {
    return res.status(200).send('ok');
}

const renew = () => {
    return res.status(200).send('ok');
}

const resetLink = () => {
    return res.status(200).send('ok');
}

const resetPassword = () => {
    return res.status(200).send('ok');
}

const changePassword = () => {
    return res.status(200).send('ok');
}


module.exports = {
    register,
    login,
    renew,
    resetLink,
    resetPassword,
    changePassword
}
