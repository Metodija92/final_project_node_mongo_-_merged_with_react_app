const mongoose = require('mongoose');

const User = mongoose.model(
    'users',
    new mongoose.Schema({
        first_name: String,
        last_name: String,
        email: String,
        password: String,
        birthday: Date,
        telephone: String,
        country: String,
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


module.exports = {
    createUser,
    getUserPasswordByEmail
}