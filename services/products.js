const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

const config = require('../config/index.js');
const DBConn = require('../db/connection');
const products = require('../handlers/products');
const cors = require('cors');

DBConn.init(config.getConfig("db"));

const api = express();
api.use(bodyParser.json());
api.use(cors());
// api.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
//     next();
// }); 
api.use(
    jwt({ 
        secret: config.getConfig('jwt').key
    })
);

api.get('/api/v1/products/', products.getAll);
api.get('/api/v1/products/:id', products.getOne);
api.post('/api/v1/products/', products.save);
api.put('/api/v1/products/:id', products.replace);
api.patch('/api/v1/products/:id', products.update);
api.delete('/api/v1/products/:id', products.remove);

api.listen(8080, err => {
    if(err){
        console.log('could not start server');
        console.log(err);
        return;
    }
    console.log('server started successfully on port 8080');
});