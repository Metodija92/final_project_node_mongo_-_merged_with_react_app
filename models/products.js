const mongoose = require('mongoose');

const Product = mongoose.model(
    'products', 
    new mongoose.Schema({
            productName: String,
            productType: String,
            productDescription: String,
            purchaseDate: Date,
            productPrice: Number,
            _created : Date, 
            _modified : Date
        }
    )
);

const getAll = () => {
    return new Promise((success, fail) => {
        Product.find({}, (err, data) => {
            if(err){
                return fail(err);
            }
            return success(data);
        });
    });
};

const getOne = (id) => {
    return new Promise((success, fail) => {
        Product.findById(id, (err, data) => {
            if(err){
                return fail(err);
            }
            return success(data);
        });
    });
};

const save = (data) => {
    return new Promise((success, fail) => {
        var p = new Product(data);
        p.save(data, err => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
};

const replace = (id, data) => {
    return new Promise((success, fail) => {
        Product.findByIdAndUpdate(id, data, err => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
};

const update = (id, data) => {
    return new Promise((success, fail) => {
        Product.findByIdAndUpdate(id, {$set: {data}}, err => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
};

const remove = (id) => {
    return new Promise((success, fail) => {
        Product.findByIdAndRemove(id, err => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
};

const filterQuery = (param1, param2) => {
    return new Promise((success, fail) => {
        Product.find({purchaseDate:{$gte: param1, $lte: param2}}, (err, data) => {
            if(err){
                return fail(err);
            }
            return success(data);
        });
    });
};

module.exports = {
    getAll,
    getOne,
    save,
    replace,
    update,
    remove,
    filterQuery
}