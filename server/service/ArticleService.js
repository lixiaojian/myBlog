/**
 * Created by 872458899@qq.com on 2017/12/17.
 */
const ObjectID = require('mongodb').ObjectID;
const dbUtil =  require('../dao/dbUtil');

const ArticleDao = require('../dao/ArticleDao');

/**
 * 添加文章
 * @param ariticle 文章实体
 * @param callback 操作后的回调
 */
module.exports.addArticle = (article={},callback)=>{
    if (!article.title) {
        return new Promise(function (resolve, reject) {
            resolve({
                code: 1,
                message: '文章标题不能为空'
            });
        });
    }
    if (!article.content) {
        return new Promise(function (resolve, reject) {
            resolve({
                code: 2,
                message: '文章内容不能为空'
            });
        });
    }
    var now = new Date();
    article.createTime = now;
    article.updateTime =now;
    article.isDelete =0;
    article.readNumber =0;
    article.commentNumber =0;
    article.admireNumber =0;
    return ArticleDao.addArticle(article);
}
/**
 * 修改文章
 * @param article
 * @param callback
 */
const updateArticle = (article={},callback)=>{
    if(!article.id){
        callback(99,'文章id不能为空');
        return;
    }
    if(!article.title){
        callback(100,'文章标题不能为空');
        return;
    }
    if(!article.content){
        callback(101,'文章内容不能为空');
        return;
    }
    dbUtil.updateOneDocument({_id:ObjectID(article.id)},{
        title:article.title,
        cover:article.cover||'',
        content:article.content
    },callback,'artcle');
}
/**
 * 查询文章
 * @param query
 * @param callback
 */
const queryArticle = (query={},callback)=>{
    dbUtil.findDocuments(query,callback,'artcle');
}
/**
 * 通过id获取文章
 * @param id
 * @param callback
 */
module.exports.queryArticleById = (id)=>{
    if(!id){
       return new Promise((resolve, reject)=>{
           resolve({code:'1',message:'请求参数错误'})
       })
    }
    return ArticleDao.queryArticleById(id);
}
/**
 * 通过条件查询文章
 * @param param
 * @param page
 * @return {*}
 */
module.exports.queryArticle=(param,page)=>{
    return ArticleDao.queryArticle(param,page);
}