
module.exports =  {
    template : require('/common/ui_widget/filter_bar/tpl.html'),
    data() {
        return {
            activeIndex : null
        }
    },
    methods : {
        showFilterMenu(index) {
            if (this.activeIndex == index) {
                this.activeIndex = null;
            } else {
                this.activeIndex = index;
            }
        }
    }

}