var express = require('express');
var router = express.Router();
var Article = require('../server/service/ArticleService');

router.post('/artcle/save', function(req, res, next) {
    if(!req.userInfo.id){
        res.send({
            code:401,
            message:'非法请求,请重新登录后再试！'
        });
        return;
    }
    const id = req.body._id;
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
    }else{
        data.previewImg = null;
    }

    if(id){
        data._id = id;
        Article.updateArticle(data).then(result=>{
            if(!result){
                res.send({code:404,message:'该文章不存在'});
            }else if(result.code !== undefined){
                res.send({code:result.code,data:result.data,msg:result.message})
            }else{
                res.send({code:0,message:'文章修改成功'});
            }
        }).catch(ex=>{
            res.send({code:100,message:'服务器错误'});
        })
    }else{
        Article.addArticle(data).then((result)=>{
            if(result.code !== undefined){
                res.send({code:result.code,data:result.data,msg:result.message})
            }else{
                res.send({code:0,message:'文章添加成功'});
            }
        }).catch(ex=>{
            res.send({code:100,message:'服务器错误'});
        })
    }
});
module.exports = router;
