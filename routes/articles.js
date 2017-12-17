var express = require('express');
var router = express.Router();
var Article = require('../server/service/articleService');

/* GET users listing. */
router.get('/:id', function (req, res, next) {
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
