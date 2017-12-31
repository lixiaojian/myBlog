/**
 * Created by 872458899@qq.com on 2017/12/31.
 */
;(function () {
    //去掉全局的加载效果
    document.onreadystatechange = function (){
        if(document.readyState === "complete"){
            $('#page_loadding').addClass('loadding-hide');
        }
    }
    //将宽度大于900的屏幕设置为电脑的显示
    var width = document.body.clientWidth;
    if(width>900){
        document.body.className = 'is-pc';
    }
}());