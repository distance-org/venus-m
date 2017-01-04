avalon.component('ms-paging', {
    template : require('/common/ui_widget/paging/tpl.html'),
    defaults : {
        onReady : function() {
            console.log(333, this.urlArr);
            this.urlArr.pop();
        }
    }
});
