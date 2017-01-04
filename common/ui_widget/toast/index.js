var toastVm = new Vue({
    template : require('/common/ui_widget/toast/tpl.html'),
    data : function() {
        return {
            message : '请提供文案!',
            show : false,
            showCss : {
                display : 'block'
            }
        }
    },
    watch : {
        show : function(val) {
            var self = this;
            if (val) {
                setTimeout(function() {
                    self.show = false;
                }, 1600)
            }

        }
    }
});

toastVm.$mount(document.createElement('div'));

module.exports = function(mes){
    toastVm.message = mes;
    toastVm.show = true;
    document.body.appendChild(toastVm.$el);
}