const mongoose = require('mongoose');

const User = mongoose.model(
    'users',
    new mongoose.Schema({
        user_type: String,
        supervisor_id: String,
        first_name: String,
        last_name: String,
        email: String,
        password: String,
        birthday: Date,
        telephone: String,
        country: String,
        confirm_hash: String,
        reset_hash: String,
        confirmed: Boolean,
        _created: Date,
        _modified: Date
    })
);

const createUser = (data) => {
    return new Promise((success, fail) => {
        var user = new User(data);
        user.save(err => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
}

const getUserPasswordByEmail = (email) => {
    return new Promise ((success, fail) => {
        User.find({email: email}, (err, data) => {
            if(err){
                return fail(err);
            }
            return success(data[0]);
        });
    });
}

const confirmUserAccount = (hash) => {
    return new Promise((success, fail) => {
        User.updateOne({confirm_hash: hash}, {confirmed: true}, (err) => {
            if(err){
                return fail(err);
            }
            return success();
        })
    })
}

const resetPasswordHash = (email, reset_hash) => {
    return new Promise((success, fail) => {
        User.updateOne({email: email}, {reset_hash: reset_hash, _modified: new Date()}, (err) => {
            if(err) {
                return fail(err);
            }
            return success();
        })
    })
}

const resetPassword = (hash, password_hash) => {
    return new Promise((success, fail) => {
        User.updateOne({reset_hash: hash}, {password: password_hash, reset_hash: '', _modified: new Date()}, (err) => {
            if(err){
                return fail(err);
            }
            return success();
        })
    })
}

const getEmailAfterReset = (pass_hash) => {
    return new Promise((success, fail) => {
        User.find({password: pass_hash},(err, data) => {
            if(err){
                return fail(err);
            }
            return success(data[0]);
        })
    })
}

const changePassword = (email, hash) => {
    return new Promise((success, fail) => {
        User.updateOne({email: email}, {password: hash, _modified: new Date()}, (err) => {
            if(err){
                return fail(err);
            }
            return success();
        })
    })
}

const updateUserInfo = (data) => {
    return new Promise((success, fail) => {
        User.updateOne
        ({email: data.email}, {$set: /* Moze i bez ova $set kako pogore, cisto za primer stoi tuka */
            {...data,
            _modified: new Date()}
        }, (err) => {
            if(err){
                return fail(err);
            }
            return success();
        })
    })
}

const getSubUsers = (id) => {
    return new Promise((success, fail) => {
        User.find({supervisor_id: id}, {_id: 1, first_name: 1}, (err, data) => {
            if(err){
                return fail(err);
            }
            return success(data);
        })
    })
}
 

module.exports = {
    createUser,
    getUserPasswordByEmail,
    confirmUserAccount,
    resetPasswordHash,
    resetPassword,
    getEmailAfterReset,
    changePassword,
    updateUserInfo,
    getSubUsers
}