;$(function () {
    var page = new Paging({
        parentId:'page_box',
        onPageChange:function (pageIndex,pageSize) {
            console.log(pageIndex);
            //doSearch(pageIndex,pageSize);
        }
    });
    page.initPage(totalRrcod,1);
});