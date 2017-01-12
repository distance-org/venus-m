export default {
    template : require('/common/ui_widget/poster_list/tpl.html'),
    data() {
        return {
            list : null
        }
    },
    methods : {
        getList() {
            //$.get()
            this.list = [
                {category : '促销',marks : ['认证用户','置顶'],content : '大望路招聘咖啡促销', images : ['a.png', 'b.png'], author : '会说话的猫', createTime : '一天前'},
                {category : '促销',marks : ['认证用户','置顶'],content : '大望路招聘咖啡促销', images : [], author : '杰米', createTime : '半小时前'}

            ]
        }
    },
    created() {
        this.getList();
    }
}