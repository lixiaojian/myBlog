var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
const url = require('url');
const cookies = require('cookies')


var index = require('./routes/index');
var articleApi = require('./routes/articleApi');
var userApi = require('./routes/userApi');
var pageRouter = require('./routes/pageRouter');
const TokenService = require('./server/service/TokenService');
const {getClientIp} = require('./utils');

var api = require('./routes/userApi');

var util = require('./utils')
var app = express();

// 设置模板渲染引擎
app.engine('.html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'),{
    setHeaders:function (resp,url) {
        resp.setHeader('Cache-Control', 'max-age=691200');
    }
}));
//允许请求接口的域名
const allowQequestDomain = [
    'localhost'
]
/**
 * 整个应用的中间件处理
 */
app.use((req,res,next)=>{
    //拦截所有的api请求，如果referer不是允许的 就拒绝
    if(req.url.startsWith('/api/')){
        var hostname = url.parse(req.headers.referer).hostname;
        if(!allowQequestDomain.includes(hostname)){
            res.send({
                code:401,
                message:'非法请求'
            });
            return;
        }
    }
    //将cookies对象注入到request里
    req.cookies = new cookies(req,res);
    //将用户信息保存到request中，以供全局访问
    req.userInfo = {};
    const userInfo = req.cookies.get('userInfo');
    if(userInfo){
        try{
            const user = JSON.parse(userInfo)
            const {userName,userToken,nickName} = user;
            req.userInfo = user;
            //验证用户的token
            if(userName && userToken){
                //获取用户Token信息
                TokenService.getUserToken({userName,userToken}).then((result=>{
                    var ip = getClientIp(req);
                    //如果两次请求用的是同一个token并且ip不同 就认为是非正常登录
                    if(ip !== result.userIp){
                        //清除登录信息
                        req.cookies.set('userInfo',{},{maxAge:-1});
                        req.userInfo = {};
                    }else{
                        req.userToken = result;
                        req.userToken.nickName = new Buffer(nickName, 'base64').toString();
                    }
                    next();
                }))
            }else{
                next();
            }
        }catch (e){
            next();
        }
    }else{
        next();
    }
})

//添加日期格式化的过滤器
app.locals.dateFormat = util.dateFormat;
//根据用户昵称生成用户头像
app.locals.showUserImg = (user={})=>{
    const name = user.nickName || user.userName;
    return name.substr(name.length-1).toUpperCase();
}

//添加路由
app.use('/', index);
app.use('/', pageRouter);
app.use('/api', userApi);
app.use('/api', articleApi);
// app.use('/articles', articles);
// app.use('/user', user);
// app.use('/api', api);

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
