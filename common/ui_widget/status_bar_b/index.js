export default {
    template : require('/common/ui_widget/status_bar_b/tpl.html'),
    props : ['title'],
    data() {
        return {

        }
    },
    methods : {
        goBack() {
            window.history.back();
        }
    }
}