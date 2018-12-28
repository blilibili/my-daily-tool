let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json({limit: '50mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    limit: '50mb',
    extended: true
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

app.get('/demo' , (req , res) => {
    res.send({
        value:req.query
    });
})

app.use('/cloesJen' , require('./route/requestCloseJenkin'));
app.use('/account/forbidden' , require('./route/requestForbidden'));

app.get('/test' , (req , res) => {
    res.send('测试通过~')
})

app.listen(3003);
