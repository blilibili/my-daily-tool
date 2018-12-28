const express = require('express');
const app = express();
let request = require('request-promise');
let router = express.Router();
let fs = require('fs');

function promiseRequest(options){
    let writeSuc = '';
    let writeEor = '';

    request(options)
        .then(function (body) {
            writeSuc = writeSuc + body + '\n';
            // POST succeeded...

            fs.writeFile('/data/daniel.li/logs/logs_success.txt', writeSuc, {flag: 'a'}, function (err) {
                if(err) {
                    console.error(err);
                } else {

                }

            });

        })
        .catch(function (err) {
            writeEor = writeEor + 'blackKey错误: ' +options.form.blackKey + ': ' + err + '\n';
            // POST failed...
            fs.writeFile('/data/daniel.li/logs/logs_error.txt', writeEor, {flag: 'a'}, function (err) {
                if(err) {
                    console.error(err);
                } else {
                    console.log('写入成功');
                }
            });
        });
}

app.post('/' , (req , res) => {
    let url = req.body.url;
    // let url = 'http://localhost:8899/exit'
    let errCount = 0;
    let errMsg = [];
    let forbidCount = 0;
    let arrIndex = 0;
    let completeTime = ''

    let form = {
        appId:'10122',
        blackKey:'',
        type:0,
        level:0,
        forbidTimeParam:'2145891661000',
        blackDesc:'工作室封号'
    };

    let blackKeys = req.body.keys.split(',');

    //添加时间间隔防止服务器宕机
    let timer = setInterval(() => {
        form.blackKey = blackKeys[arrIndex];
        var options = {
            method: 'POST',
            uri: req.body.url,
            form: form,
            headers: {
                /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
                'Authorization':req.body.auto,
                'username':req.body.username,
            }
        };

        promiseRequest(options);
        arrIndex++;
        if(arrIndex == blackKeys.length){
            completeTime = '所有请求完成 , 完成时间 ' + new Date().getTime();
            fs.writeFile('/data/daniel.li/logs/logs_complete.txt', completeTime, {flag: 'a'}, function (err) {
                if(err) {
                    console.error(err);
                } else {

                }

            });
            res.send({code:0 , count:arrIndex + 1 , msg:'所有封号请求已发出'});
            clearInterval(timer);
        }
        console.log('请求发送成功 , 请求数: ' + arrIndex)
    } , 100)

    // req.body.keys.split(',').forEach((v , k) => {
    //     if(v != ''){
    //         form.blackKey = v;
    //
    //         var options = {
    //             method: 'POST',
    //             uri: req.body.url,
    //             form: form,
    //             headers: {
    //                 /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
    //                 'Authorization':req.body.auto,
    //                 'username':req.body.username,
    //             }
    //         };
    //
    //         let writeSuc = '';
    //         let writeEor = '';
    //
    //         forbidCount = forbidCount + 1;
    //         if(k+1 == req.body.keys.split(',').length){
    //             writeSuc = writeSuc + '所有请求完成' + '\n';
    //             res.send({code:0 , count:forbidCount , msg:'所有封号请求已发出'})
    //         }
    //
    //         promiseRequest(options)
    //     }
    // })
})

module.exports = app
