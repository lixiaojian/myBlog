var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');


var index = require('./routes/index');
var articles = require('./routes/articles');
var user = require('./routes/user')
var util = require('./utils')
var app = express();

// 设置模板渲染引擎
app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//添加日期格式化的过滤器
app.locals.dateFormat = util.dateFormat;

//添加路由
app.use('/', index);
app.use('/articles', articles);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
