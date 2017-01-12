var vm = new Vue({
    template : require('/common/ui_widget/send_comment/tpl.html'),
    data() {
      return {
          isShow : false
      }
    },
    methods : {
        hide () {
            this.isShow = false;
        }
    }
});

vm.$mount(document.createElement('div'));
document.body.appendChild(vm.$el);


export default function showSendCommentWidget() {
    vm.isShow = true;
    setTimeout(function() {
        $(vm.$el).find('textarea').focus();

    }, 200)
}