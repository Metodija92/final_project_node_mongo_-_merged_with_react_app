const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const init = () => {
    mongoose.connect('mongodb+srv://dev:<pass>@cluster0-l74pg.mongodb.net/products?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = {
    init
}
