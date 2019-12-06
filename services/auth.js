const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config/index.js');
const DBCon = require('../db/connection');
const auth = require('../handlers/auth');
const jwt = require('express-jwt');
const cors = require('cors');

DBCon.init(config.getConfig('db'));

var api = express();
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
    .unless({
        path: ['/api/v1/register', '/api/v1/login']
    })
);

api.post('/api/v1/register', auth.register);
api.post('/api/v1/login', auth.login);
api.get('/api/v1/renew', auth.renew);
api.post('/api/v1/reset-link', auth.resetLink);
api.post('/api/v1/reset-password', auth.resetPassword);
api.post('/api/v1/change-password', auth.changePassword);


api.listen(8081, err => {
    if(err){
        console.log('Could not start server');
        console.log(err);
        return
    }
    console.log('Server has started on port 8081');
});