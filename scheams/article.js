/**
 * Created by 872458899@qq.com on 2017/12/28.
 *
 * 文章的表结构
 */

var mongoose = require('mongoose');

module.exports =  mongoose.Schema({
    //文章标题
    title: String,
    //文章内容
    content:String,
    //作者
    author:{
        type:String,
        ref:'user'
    },
    //创建时间
    createTime:Date,
    //修改时间
    updateTime:Date,
    //删除标记
    isDelete:Boolean,
    //预览图
    previewImg:String,
    //阅读量
    readNumber:Number,
    //评论数量
    commentNumber:Number,
    //赞赏数量
    admireNumber:Number
})