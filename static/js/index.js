import Carousel from '/common/ui_widget/carousel/carousel.js'
import CarouselItem from '/common/ui_widget/carousel/carousel-item.js'
import PosterList from '/common/ui_widget/poster_list/index.js';
window.bus = new Vue();
// 触发组件 A 中的事件

// 在组件 B 创建的钩子中监听事件

bus.$emit('id-selected', 1)
new Vue({
    el : '#Page_Root',
    components : {
        Carousel,
        CarouselItem,
        PosterList
    }
})
