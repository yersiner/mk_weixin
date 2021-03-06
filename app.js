'use strict';
var express = require('express');
var path = require('path');
var ejs = require("ejs");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var wx = require('./routes/wxrouter');
var api = require('./routes/api');
var page = require('./routes/page');

var app = express();
// 设置 view 引擎
app.set('views', path.join(__dirname, 'views'));

//修改view 引擎为html
app.engine("html", ejs.__express);
app.set('view engine', 'html');

//设置静态目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'mp')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.get('/', function(req, res) {
    res.render('index', {
        currentTime: new Date()
    });
});

app.get('/jssdk',function(req,res){
    res.render('jssdk');
});
//weixin
app.use('/wx', wx);
app.use('/api',api);
app.use(page);



// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) { // jshint ignore:line
        var statusCode = err.status || 500;
        if (statusCode === 500) {
            console.error(err.stack || err);
        }
        res.status(statusCode);
        res.render('error', {
            message: err.message || err,
            error: err
        });
    });
}
// 如果是非开发环境，则页面只输出简单的错误信息
app.use(function(err, req, res, next) { // jshint ignore:line
    res.status(err.status || 500);
    res.render('error', {
        message: err.message || err,
        error: {}
    });
});

module.exports = app;
