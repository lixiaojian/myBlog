/**
 * Created by 872458899@qq.com on 2017/12/28.
 */
var mongoose = require('mongoose');
var articleSchema = require('../../scheams/article');
var Article = mongoose.model('article', articleSchema);

/**
 * 添加文章
 * @param article
 */
module.exports.addArticle = (article)=>{
    var a = new Article(article);
    return a.save();
}
/**
 * 修改文章
 * @param article
 * @return {Promise}
 */
module.exports.updateArticle = (article)=>{
    var update = {
            title:article.title,
            previewImg:article.previewImg||'',
            content:article.content,
            readNumber:article.readNumber
        };
    return Article.findByIdAndUpdate(article._id,update);
}
/**
 * 通过条件查询文章
 */
module.exports.queryArticle = (param={},page={})=>{
    let {size,number} = page;
    size =  +size || 10;
    number =  +number || 1;
    param.isDelete = false;
    //需要查询的字段名
    //const userPro = '_id title content author createTime updateTime previewImg readNumber';
    if(page.number){
        let totalCount=0;
        return Article.count(param).then(count=>{
            totalCount = count;
            return Article.find(param).populate('author').limit(size).skip((number-1) * size)
        }).then(result=>{
            return new Promise((resolve,reject)=>{
                const data = {
                    data:result,
                    pageNumber:number,
                    pageSize:size,
                    total:totalCount
                }
                resolve(data);
            })
        })
    }else{
        return Article.find(param);
    }
}

/**
 * 通过id查询文章
 */
module.exports.queryArticleById = (id)=>{
    return Article.findOne({_id:id,isDelete:false});
}
