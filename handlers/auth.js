const mUsers = require('../models/users');
const vUsers = require('../validators/users');
const validator = require('node-input-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('../config/index.js');
const randomString = require('randomstring');
const sgMail = require('@sendgrid/mail');


const register = (req, res) => {
    let v = new validator.Validator(req.body, vUsers.createUser);
    v.check()
    .then(matched => {
        if(matched) {
            return mUsers.getUserPasswordByEmail(req.body.email)
            .then((ed) => {
                if(!ed) {                   
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
                            var confirm_hash = randomString.generate({
                                length: 30,
                                charset: 'alphanumeric'
                            });
                            mUsers.createUser({
                                ...req.body, 
                                password: hash,
                                confirm_hash: confirm_hash,
                                confirmed: false
                            });
                            sgMail.setApiKey(config.getConfig('mailer').key);
                            let msg = {
                            to: req.body.email,
                            from: 'metodijalichovski@gmail.com',
                            subject: 'Testing the SENDGRID',
                            text: 'Thanks for registrating',
                            html: `<a href="http://localhost:8081/api/v1/auth/confirm/${confirm_hash}">Click here to confirm you account</a>`,
                            };
                            sgMail.send(msg);
                            return ;
                        });
                    });
                } else {
                    throw new Error('Bad Request - User Exists');
                }
            })
            .catch(err => {
                console.log('vleguva?')
                throw new Error(err.message);
            });
        } else {
            throw new Error('Validation failed');
        }
    })
    .then(() => {
        return res.status(201).send('ok');
    })
    .catch(err => {
        console.log(err.message);
        return res.status(400).send(err.message);
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
                return res.status(200).send({
                    jwt: token, 
                    first_name: data.first_name, 
                    last_name: data.last_name,
                    email: data.email,
                    status: data.confirmed,
                    birthday: data.birthday,
                    country: data.country,
                    telephone: data.telephone,
                    user_type: data.user_type,
                    user_id: data._id,
                    supervisor_id: data.supervisor_id
                });
            }
            return res.status(400).send('Wrong password');
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
    mUsers.getUserPasswordByEmail(req.body.email)
    .then((user) => {
        if(user) {
            var reset_hash = randomString.generate({
                length: 30,
                charset: 'alphanumeric'
            });
            // Kreira reset_hash i go zapishuva kaj user infoto vo DB
            mUsers.resetPasswordHash(req.body.email, reset_hash)
            .then(() => {
                sgMail.setApiKey(config.getConfig('mailer').key);
                    let msg = {
                    to: req.body.email,
                    from: 'metodijalichovski@gmail.com',
                    subject: 'Testing the RESET LINK',
                    text: 'GET RESET HASH',
                    // Tuka treba link do druga komponenta kade sto ke se vnese nov pass i posle post povik da se zapise noviot pass
                    html: `<a href="http://localhost:3000/resetpassword/${reset_hash}/${req.body.email}">${reset_hash} - Click here to reset your password</a>`,
                    };
                    sgMail.send(msg);
                return res.status(200).send('ok');
            })
            .catch(err => {
                return res.status(500).send('Could not send email');
            })
        } else {
            throw new Error('This email has not been used to register an account');
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send({err});
    });
}

const resetPassword = (req, res) => {
    if(req.body.pass1 === req.body.pass2) {
        bcrypt.genSalt(10, function(err, salt) {
            if(err){
                throw new Error(err);
                return
            }
            bcrypt.hash(req.body.pass1, salt, function(err, hash) {
                if(err){
                    throw new Error(err);
                    return
                }
                // Mu se prakja reset_hash i noviot password kao hash 
                // (Naogja koj pass treba da se smeni spored toa koj user go ima ovoj reset_hash)
                mUsers.resetPassword(req.body.reset_hash, hash)
                .then(() => {
                    sgMail.setApiKey(config.getConfig('mailer').key);
                    let msg = {
                    to: req.body.email,
                    from: 'metodijalichovski@gmail.com',
                    subject: 'Password Reset',
                    text: 'Your password has been reset',
                    };
                    sgMail.send(msg);
                })
                .then(data => {
                    // console.log(data)
                    return res.status(201).send('ok');
                })
                .catch(err => {
                    return res.status(500).send('Something went wrong');
                })
            })
        });
    }
}

const changePassword = (req, res) => {
    mUsers.getUserPasswordByEmail(req.body.email)
    .then((data) => {
        bcrypt.compare(req.body.oldPass, data.password, (err, result) => {
            if(err){
                return res.status(500).send('Could not compare passwords');
            }
            if(result){
                if(req.body.pass1 === req.body.pass2) {
                    bcrypt.genSalt(10, function(err, salt) {
                        if(err){
                            throw new Error(err);
                            return
                        }
                        bcrypt.hash(req.body.pass1, salt, function(err, hash) {
                            if(err){
                                throw new Error(err);
                                return
                            }
                            mUsers.changePassword(req.body.email, hash)
                            .then(() => {
                                sgMail.setApiKey(config.getConfig('mailer').key);
                                let msg = {
                                to: req.body.email,
                                from: 'metodijalichovski@gmail.com',
                                subject: 'Password Change',
                                text: 'You have changed your password',
                                };
                                sgMail.send(msg);
                            })
                            .then(data => {
                                return res.status(201).send('ok');;
                            })
                            .catch(err => {
                                console.log(err);
                                // return res.status(500).send('Something went wrong');
                                throw new Error(err);
                            })
                        })
                    });
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send(err);
    });
}

const confirm = (req, res) => {
    var hash = req.params.confirm_hash
    mUsers.confirmUserAccount(hash)
    .then(() => {
        let p = req.path;
        console.log(p);
        return res.status(200).send('You have confirmed you email!');
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).send('Internal server error');
    })
}

const updateInfo = (req, res) => {
    let val = new validator.Validator(req.body, vUsers.updateUser);
    val.check()
    .then(mathced => {
        if(mathced) {
            return mUsers.updateUserInfo(req.body)
        } else {
            throw new Error('Validation failed');
        }
    })
    .then(() => {
        return res.status(200).send('ok');
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send(v.errors);
    });
}

const findUsers = (req, res) => {
    mUsers.getSubUsers(req.user.id)
    .then((data) => {
        return res.status(200).send(data);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send(v.errors);
    });
}


module.exports = {
    register,
    login,
    renew,
    resetLink,
    resetPassword,
    changePassword,
    userInfo,
    confirm,
    updateInfo,
    findUsers
}
