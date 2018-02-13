var express = require('express');
var router = express.Router();
var Article = require('../server/service/articleService');

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
            res.send({code:0,msg:'添加成功'});
        }
    })
});
/* GET users listing. */
router.get('/artcle/:id', function (req, res, next) {
    const id = req.params.id;
    let data = {
        code: 0,
        article: {}
    }
    if (id) {
        Article.getArticleById(id, (code, result) => {
            if (code == 0) {
                data.article = result;
            }
            res.render('articleDetail', data);
        })
    } else {
        data.code = 1;
        data.msg='查询条件有误';
        res.render('articleDetail', data);
    }
});

module.exports = router;
