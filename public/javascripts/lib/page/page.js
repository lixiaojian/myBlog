/**
 * 分页组件
 * parentId：分页组件挂载的节点的id
 * pageSize：每页条数（不设置时，默认为10
 * pageIndex： 当前页码
 * totalCount：总记录数
 * prevPage：上一页（不设置时，默认为：上一页）
 * nextPage：下一页（不设置时，默认为：下一页）
 * firstPage：首页（不设置时，默认为：首页）
 * lastPage：末页（不设置时，默认为：末页）
 * degeCount：当前页前后两边可显示的页码个数（不设置时，默认为3）
 * ellipsis：是否显示省略号不可点击按钮（true：显示，false：不显示）
 * onPageChange ：页码改变时的回调 onPageChange(pageIndex,pageSize)
 *
 *
 * 使用方法 var page = new Paging({parentId:'pageBar',onPageChange:function(){}});  page.initPage(123,2)
 */

;(function () {
    function Paging(paramsObj) {
        this.parentDom = document.getElementById(paramsObj.parentId) || document.body; //分页组件挂载的节点
        this.pageSize = paramsObj.pageSize || 10;    //每页条数（不设置时，默认为10
        this.pageIndex = paramsObj.pageIndex || 1;    //当前页码
        this.totalCount = paramsObj.totalCount || 0;   //总记录数
        this.totalPage = Math.ceil(paramsObj.totalCount / paramsObj.pageSize) || 0;     //总页数
        this.prevPage = paramsObj.prevPage || '上一页';     //上一页（不设置时，默认为：<）
        this.nextPage = paramsObj.nextPage || '下一页';     //下一页（不设置时，默认为：>）
        this.firstPage = paramsObj.firstPage || '首页';     //首页（不设置时，默认为：<<）
        this.lastPage = paramsObj.lastPage || '末页';     //末页（不设置时，默认为：>>）
        this.degeCount = paramsObj.degeCount || 3;             //当前页前后两边可显示的页码个数（不设置时，默认为3）
        this.ellipsis = paramsObj.ellipsis; //是否显示省略号不可点击按钮（true：显示，false：不显示）
        this.ellipsisBtn = (paramsObj.ellipsis == true || paramsObj.ellipsis == null) ? '<li><span class="ellipsis">…</span></li>' : '';
        this.onPageChange = paramsObj.onPageChange;  //分页切换时的回调

        var that = this;
        // 生成分页DOM结构
        this.initPage = function (totalCount, pageIndex) {
            this.totalCount = totalCount;
            var totalPage = Math.ceil(totalCount / this.pageSize);
            this.totalPage = totalPage;
            var degeCount = this.degeCount;
            var pageHtml = '';  //总的DOM结构
            var tmpHtmlPrev = '';   //省略号按钮前面的DOM
            var tmpHtmlNext = '';   //省略号按钮后面的DOM
            var headHtml = ''; //首页和上一页按钮的DOM
            var endHtml = '';   //末页和下一页按钮的DOM
            if(pageIndex - degeCount >= degeCount-1 && totalPage - pageIndex >= degeCount+1){   //前后都需要省略号按钮
                headHtml = '<li><a id="first_page" href="javascript:;">'+this.firstPage+'</a></li>' +
                    '<li><a id="prev_page" href="javascript:;">'+this.prevPage+'</a></li>';

                endHtml = '<li><a id="next_page" href="javascript:;">'+this.nextPage+'</a></li>' +
                    '<li><a id="last_page" href="javascript:;">'+this.lastPage+'</a></li>';

                var count = degeCount;  //前后各自需要显示的页码个数
                for(var i=0; i<count; i++){
                    if(pageIndex != 1){
                        tmpHtmlPrev += '<li class="page-number"><a href="javascript:;">'+(pageIndex-(count-i))+'</a></li>';
                    }
                    tmpHtmlNext += '<li class="page-number"><a href="javascript:;">'+((pageIndex-0)+i+1)+'</a></li>';
                }
                pageHtml = headHtml +
                    this.ellipsisBtn +
                    tmpHtmlPrev +
                    '<li><a href="javascript:;" class="active">'+pageIndex+'</a></li>'+
                    tmpHtmlNext +
                    this.ellipsisBtn +
                    endHtml;
            }else if(pageIndex - degeCount >= degeCount-1 && totalPage - pageIndex < degeCount+1) { //前面需要省略号按钮，后面不需要
                headHtml = '<li><a id="first_page" href="javascript:;">'+this.firstPage+'</a></li>' +
                    '<li><a id="prev_page" href="javascript:;">'+this.prevPage+'</a></li>';

                if(pageIndex == totalPage){ //如果当前页就是最后一页
                    endHtml = '<li class="disabled"><a href="javascript:;">'+this.nextPage+'</a></li>' +
                        '<li class="disabled"><a href="javascript:;">'+this.lastPage+'</a></li>';
                }else{  //当前页不是最后一页
                    endHtml = '<li><a id="next_page" href="javascript:;">'+this.nextPage+'</a></li>' +
                        '<li><a id="last_page" href="javascript:;">'+this.lastPage+'</a></li>';
                }

                var count = degeCount;  //前需要显示的页码个数
                var countNext = totalPage - pageIndex;  //后需要显示的页码个数
                if(pageIndex != 1){
                    for(var i=0; i<count; i++){
                        tmpHtmlPrev += '<li class="page-number"><a href="javascript:;">'+(pageIndex-(count-i))+'</a></li>';
                    }
                }
                for(var i=0; i<countNext; i++){
                    tmpHtmlNext += '<li class="page-number"><a href="javascript:;">'+((pageIndex-0)+i+1)+'</a></li>';
                }
                pageHtml = headHtml +
                    this.ellipsisBtn +
                    tmpHtmlPrev +
                    '<li class="active"><a href="javascript:;">'+pageIndex+'</a></li>'+
                    tmpHtmlNext +
                    endHtml;
            }else if(pageIndex - degeCount < degeCount-1 && totalPage - pageIndex >= degeCount+1){ //前面不需要，后面需要省略号按钮
                if(pageIndex == 1){ //如果当前页就是第一页
                    headHtml = '<li class="disabled"><a href="javascript:;">'+this.firstPage+'</a></li>' +
                        '<li class="disabled"><a href="javascript:;">'+this.prevPage+'</a></li>';
                }else{  //当前页不是第一页
                    headHtml = '<li><a id="first_page" href="javascript:;">'+this.firstPage+'</a></li>' +
                        '<li><a id="prev_page" href="javascript:;">'+this.prevPage+'</a></li>';
                }

                endHtml = '<li><a id="next_page" href="javascript:;">'+this.nextPage+'</a></li>' +
                    '<li><a id="last_page" href="javascript:;">'+this.lastPage+'</a></li>';

                var countPrev = pageIndex - 1;  //前需要显示的页码个数
                var count = degeCount;  //后需要显示的页码个数
                if(pageIndex != 1){
                    for(var i=0; i<countPrev; i++){
                        tmpHtmlPrev += '<li class="page-number"><a href="javascript:;">'+(pageIndex-(countPrev-i))+'</a></li>';
                    }
                }
                for(var i=0; i<count; i++){
                    tmpHtmlNext += '<li class="page-number"><a href="javascript:;">'+((pageIndex-0)+i+1)+'</a></li>';
                }
                pageHtml = headHtml +
                    tmpHtmlPrev +
                    '<li class="active"><a href="javascript:;">'+pageIndex+'</a></li>'+
                    tmpHtmlNext +
                    this.ellipsisBtn +
                    endHtml;
            }else if(pageIndex - degeCount < degeCount-1 && totalPage - pageIndex < degeCount+1){   //前后都不需要省略号按钮
                if(totalPage == 1){ //如果总页数就为1
                    headHtml = '<li class="disabled"><a href="javascript:;">'+this.firstPage+'</a></li>'+
                        '<li><span id="prev_page" href="javascript:;">'+this.prevPage+'</span></li>';
                    endHtml = '<li class="disabled"><a href="javascript:;">'+this.nextPage+'</a></li>'+
                        '<li><span id="last_page" href="javascript:;">'+this.lastPage+'</span></li>';
                }else{//如果总页数就不为1
                    if(pageIndex == 1){ //如果当前页就是第一页
                        headHtml = '<li class="disabled"><a href="javascript:;">'+this.firstPage+'</a></li>'+
                            '<li class="disabled"><a href="javascript:;">'+this.prevPage+'</a></li>';
                        endHtml = '<li><a id="next_page" href="javascript:;">'+this.nextPage+'</a></li>'+
                            '<li><a id="last_page" href="javascript:;">'+this.lastPage+'</a></li>';
                    }
                    if(pageIndex == totalPage){  //如果当前页是最后一页
                        headHtml = '<li><a id="first_page" href="javascript:;">'+this.firstPage+'</a></li>'+
                            '<li><a id="prev_page" href="javascript:;">'+this.prevPage+'</a></li>';
                        endHtml = '<li class="disabled"><a href="javascript:;">'+this.nextPage+'</a></li>'+
                            '<li class="disabled"><a href="javascript:;">'+this.lastPage+'</a></li>';
                    }
                }

                var countPrev = pageIndex - 1;  //前需要显示的页码个数
                var countNext = totalPage - pageIndex;  //后需要显示的页码个数
                if(pageIndex != 1){
                    for(var i=0; i<countPrev; i++){
                        tmpHtmlPrev += '<li class="page-number"><a href="javascript:;">'+(pageIndex-(countPrev-i))+'</a></li>';
                    }
                }
                for(var i=0; i<countNext; i++){
                    tmpHtmlNext += '<li class="page-number"><a href="javascript:;">'+((pageIndex-0)+i+1)+'</a></li>';
                }
                pageHtml = headHtml +
                    tmpHtmlPrev +
                    '<li class="active"><a href="javascript:;">'+pageIndex+'</a></li>'+
                    tmpHtmlNext +
                    endHtml;
            }
            this.parentDom.innerHTML = pageHtml;
        };

        // 点击页码（首页、上一页、下一页、末页、数字页）
        this.parentDom.addEventListener('click', function (e) {
            var _this = e.target;   //当前被点击的a标签
            var idAttr = _this.id;  //id属性
            var className = _this.parentElement.className;    //class属性
            var tempCls = ' '+className+' ';
            if(tempCls.indexOf(' active ')>-1 || tempCls.indexOf(' disabled ')>-1 ){
                return;
            };
            if(idAttr == 'first_page'){ //如果是点击的首页
                that.pageIndex = 1;
            }else if(idAttr == 'prev_page'){    //如果点击的是上一页
                that.pageIndex = that.pageIndex == 1 ? that.pageIndex : that.pageIndex - 1 ;
            }else if(idAttr == 'next_page'){ //如果点击的是下一页
                that.pageIndex = that.pageIndex == that.totalPage ? that.pageIndex : parseInt(that.pageIndex) + 1;
            }else if(idAttr == 'last_page'){ //如果点击的是末页
                that.pageIndex = that.totalPage;
            }else if(className == 'page-number'){   //如果点击的是数字页码
                that.pageIndex = _this.innerText;
            }
            that.onPageChange && that.onPageChange(that.pageIndex, that.pageSize);
        });
    };

    window.Paging = Paging;
}());

