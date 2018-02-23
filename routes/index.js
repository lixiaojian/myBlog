var express = require('express');
var router = express.Router();
var Article = require('../server/service/ArticleService');

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
    //匹配内容中的第一张图片
    var imgReg = /<img.*?(?:>|\/>)/i;
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var firstImage = data.content.match(imgReg);
    if(firstImage && firstImage.length>0){
        data.cover = firstImage[0].match(srcReg)[1];
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
