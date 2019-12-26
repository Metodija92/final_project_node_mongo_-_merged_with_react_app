const express = require('express');
const proxy = require('http-proxy');

var api = express();
var apiProxy = proxy.createProxyServer();

api.all('/api/v1/products/*', (req, res) => {
    apiProxy.web(req, res, {target: 'http://localhost:8080'});
});

api.all('/api/v1/auth/*', (req, res) => {
    apiProxy.web(req, res, {target: 'http://localhost:8081'});
});

api.all('/*', (req, res) => {
    res.status(404).send('Not found!');
});

api.listen(process.env.PORT, err => {
    if(err){
        console.log('could not start server');
        console.log(err);
        return;
    }
    console.log('server started successfully on port whatever');
});