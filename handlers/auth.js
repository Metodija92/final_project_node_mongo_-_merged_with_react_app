const mUsers = require('../models/users');
const vUsers = require('../validators/users');
const validator = require('node-input-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('../config/index.js');


const register = (req, res) => {
    var v = new validator.Validator(req.body, vUsers.createUser);
    v.check()
    .then(matched => {
        if(matched) {
            bcrypt.genSalt(10, function(err, salt) {
                if(err){
                    throw new Error(err);
                    return;
                }
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    if(err){
                        throw new Error(err);
                        return;
                    }
                    return mUsers.createUser({...req.body, password: hash});
                });
            });
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

const login = (req, res) => {
    mUsers.getUserPasswordByEmail(req.body.email)
    .then((data) => {
        bcrypt.compare(req.body.password, data.password, (err, result) => {
            if(err){
                return res.status(500).send('Could not compare passwords');
            }
            if(result){
                var tokenData = {
                    id: data._id,
                    full_name: `${data.first_name} ${data.last_name}`,
                    email: data.email
                };
                var token = jwt.sign(tokenData, config.getConfig('jwt').key);
                return res.status(200).send({jwt: token, first_name: data.first_name, last_name: data.last_name});
            }
            return res.status(400).send('not found');
        });
    })
    .catch(err => {
        return res.status(500).send('Could not get user');
    });
}

const userInfo = (req, res) => {
    mUsers.getUserPasswordByEmail(req.params.email)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

const renew = (req, res) => {
    return res.status(200).send(req.user);
}

const resetLink = (req, res) => {
    return res.status(200).send('ok');
}

const resetPassword = (req, res) => {
    return res.status(200).send('ok');
}

const changePassword = (req, res) => {
    return res.status(200).send('ok');
}


module.exports = {
    register,
    login,
    renew,
    resetLink,
    resetPassword,
    changePassword,
    userInfo
}
