export default {
    template : require('/common/ui_widget/carousel/carousel-item-tpl.html'),
    data() {
        return {
            style: {
                width: document.documentElement.offsetWidth + 'px'
            }
        }
    },
    methods : {
        width(width) {
            this.style.width = width + 'px';
        }
    },
    created() {
        var _this = this;
        window.bus.$on('width', function (width) {
            _this.width(width);
        })
    },
    mounted() {
        window.bus.$emit('addItem', this)
    },
    beforeDestroy() {
        window.bus.$emit('delItem', this)
    }
}