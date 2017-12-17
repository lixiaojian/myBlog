/**
 * Created by 872458899@qq.com on 2017/12/17.
 */
var MongoClient = require('mongodb').MongoClient;
var dataSpaceName = 'artcle';
//mogo的地址
var url = 'mongodb://localhost:27017/myblog';
//添加数据
var insertOneDocument = function(data, callback,table) {
    MongoClient.connect(url, function(err, db) {
        if(err){
            callback(98,'数据库连接失败');
            return;
        }
        var collection = db.collection(table || dataSpaceName);
        collection.insert(data, function(err, result) {
            if(err){
                callback(99,'数据库插入数据失败');
                db.close();
                return;
            }
            callback && callback(0,result);
            db.close();
        });
    });
}
//修改数据
var updateOneDocument = function(query,data, callback,table) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection(table || dataSpaceName);
        collection.updateOne(query, { $set: data }, function(err, result) {
            if(err){
                callback && callback(101,'修改数据失败');
            }else{
                callback && callback(0,result);
            }
            db.close();
        });
    })
}
//删除数据
var deleteDocument = function(query, callback,table) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection(table || dataSpaceName);
        collection.deleteOne(query, function(err, result) {
            callback && callback(0,result);
            db.close();
        });
    })
}
//查询
var findDocuments = function(query={}, callback,table) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection(table || dataSpaceName);
        collection.find(query).toArray(function(err, docs) {
            callback && callback(0,docs);
            db.close();
        });
    })
}

module.exports = {
    insertOneDocument,
    updateOneDocument,
    deleteDocument,
    findDocuments
};