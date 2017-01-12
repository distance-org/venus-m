import StatusBarB from '/common/ui_widget/status_bar_b/index.js'
import showSendCommentWidget from '/common/ui_widget/send_comment/index.js'
new Vue({
    el : '#container',
    components : {
        StatusBarB,
    },
    data : {
    },
    methods : {
        sendComment : function() {
            showSendCommentWidget();
        }
    }
});