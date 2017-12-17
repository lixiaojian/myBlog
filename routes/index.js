var express = require('express');
var router = express.Router();
var Article = require('../server/service/articleService');

/* 主页. */
router.get('/', function(req, res, next) {
    Article.queryArticle({},(code,result)=>{
        let data = {code:0,title:'文章列表'};
        if(code==0){
            let articles = result.map(article=>{
                return {
                    id:article._id,
                    title:article.title
                }
            })
            data.articles = articles;
        }else{
            data.code = code;
            data.articles = [];
            data.msg = result || '获取文章列表失败';
        }
        res.render('index',data);
    })
});
/**
 * 添加文章的页面
 */
router.get('/addArticle', function(req, res, next) {
    res.render('addArticle',{});
});
/**
 * 添加文章的请求
 */
router.post('/addOrUpdateArticle', function(req, res, next) {
    var data = {
        title:req.body.title,
        content:req.body.content
    }
    if(req.body.id){
        data.id = req.body.id;
        Article.updateArticle(data,(code,result)=>{
            if(code==0){
                res.send({code:code,data:result,msg:'修改成功'})
            }else{
                res.send({code:code,msg:result})
            }
        })
    }else{
        Article.addArticle(data,(code,result)=>{
            if(code==0){
                res.send({code:code,data:result,msg:'添加成功'})
            }else{
                res.send({code:code,msg:result})
            }
        });
    }

});

module.exports = router;
