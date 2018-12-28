const express = require('express');
const app = express();
let request = require('request');
let router = express.Router();

app.post('/' , (req , res) => {
    let url = req.body.url;
    // let url = 'http://localhost:8899/exit';
    request.post(url, {form:{
            'Jenkins-Crumb':'76c82e3887b4f54dea5ffddc9ba35eb5',
            'json':'init'
        }} , (e , r , body) => {
        res.send({
            code:0,
            msg:'jenkins关闭成功'
        })
    })
})

module.exports = app