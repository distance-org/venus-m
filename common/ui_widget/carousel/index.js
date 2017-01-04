import Carousel from '/common/ui_widget/carousel/carousel.js'
import CarouselItem from '/common/ui_widget/carousel/carousel-item.js'
export default {
    template : require('/common/ui_widget/carousel/tpl.html'),
    components: {
        Carousel,
        CarouselItem
    },
    data() {
        return {
            auto: 3000
        }
    },
    methods: {
        slidEnd(index) {
            // console.log(index)
        },
        log(i) {
            console.log(i)
        },
        toggle() {
            this.auto = this.auto === 0 ? 3000 : 0
        }
    }
}