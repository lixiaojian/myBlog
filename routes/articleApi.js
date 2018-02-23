var express = require('express');
var router = express.Router();
var Article = require('../server/service/ArticleService');

router.post('/artcle/add', function(req, res, next) {
    if(!req.userInfo.id){
        res.send({
            code:401,
            message:'非法请求,请重新登录后再试！'
        });

    }
    var data = {
        title:req.body.title,
        content:req.body.content,
        author:req.userInfo.id
    }

    //匹配内容中的第一张图片
    var imgReg = /<img.*?(?:>|\/>)/i;
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    var firstImage = data.content.match(imgReg);
    if(firstImage && firstImage.length>0){
        data.previewImg = firstImage[0].match(srcReg)[1];
    }
    Article.addArticle(data).then((result)=>{
        if(result.code !== undefined){
            res.send({code:result.code,data:result.data,msg:result.message})
        }else{
            res.send({code:0,message:'添加成功'});
        }
    })
});
module.exports = router;
