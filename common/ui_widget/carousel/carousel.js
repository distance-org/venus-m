var defaultDuration = 300;
export default {
    template : require('/common/ui_widget/carousel/carousel-tpl.html'),
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        auto: {
            type: Number,
            default: 3000
        },
        indicators: {
            type: Boolean,
            default: false
        },
        responsive: {
            type: Number,
            default: 40
        },
        flickThreshold: {
            type: Number,
            default: 0.6
        },
        delta: {
            type: Number,
            default: 100
        },
        onSlidEnd: {
            type: Function,
            default: i => 0
        },
        preventDefault: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            width : null,
            addonBefore: '',
            addonAfter: '',
            timer: 0,
            activeIndex: 0,
            list: [],
            style: {
                height: '',
                paddingBottom: ''
            },
            trackStyle: {
                transform: 'translate(0px, 0px) translateZ(0px)',
                transitionDuration: 0
            },
            transitionDuration: defaultDuration
        }
    },

    watch: {
        list() {
            this.setHelperDOM();
        },
        auto() {
            this.setTimer()
        }
    },
    methods: {
        addItem(item) {
            this.list.push(item.$el.innerHTML)
        },
        delItem(item) {
            var index = this.list.indexOf(item)
            this.list.splice(index, 1)
        },
        setHelperDOM() {
            var len = this.list.length;
            if (len > 1 && this.loop) {
                this.addonBefore = this.list[len - 1];
                this.addonAfter = this.list[0];
            }
        },
        slid(index, delta) {
            var {
                loop,
                width,
                transitionDuration,
                list
            } = this;
            var len = list.length;
            if (len === 0) {
                return;
            }
            if (len === 1) {
                loop = false
            }
            if (!loop) {
                index = (index + len) % len;
            }
            this.trackStyle = {
                transform: 'translate(' + (-width * (index + (loop ? 1 : 0)) - delta) + 'px, 0px) translateZ(0px)',
                transitionDuration: transitionDuration + 'ms'
            }
            this.activeIndex = (index + len) % len;
            if (transitionDuration > 0 && loop && (this.activeIndex === 0 || this.activeIndex === len - 1)) {
                setTimeout(this.correctIndex, transitionDuration);
            }
            if (transitionDuration > 0) {
                this.onSlidEnd(this.activeIndex)
            }
        },
        correctIndex() {
            this.transitionDuration = 0;
            this.slid(this.activeIndex, 0);
        },
        calculatePos(e) {
            var x = e.changedTouches[0].clientX;
            var y = e.changedTouches[0].clientY;
            var xd = this.x - x;
            var yd = this.y - y;
            var axd = Math.abs(xd);
            var ayd = Math.abs(yd);
            return {
                deltaX: xd,
                deltaY: yd,
                absX: axd,
                absY: ayd
            }
        },
        setTimer() {
            var {
                auto,
                list
            } = this;
            var len = list.length;
            if (auto && len > 1) {
                this.timer = setInterval(() => {
                    this.transitionTo(this.activeIndex + 1)
                }, auto)
            }
        },
        clearTimer() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        },
        transitionTo(index, duration) {
            this.clearTimer();
            this.transitionDuration = duration || defaultDuration;
            this.slid(index, 0);
            this.setTimer();
        },
        onTouchstart(e) {
            if (e.touches.length > 1) {
                return
            }
            this.transitionDuration = 0;
            this.start = Date.now();
            this.x = e.touches[0].clientX;
            this.y = e.touches[0].clientY;
            this.clearTimer();
        },
        onTouchmove(e) {
            if (this.preventDefault) {
                e.preventDefault();
            }
            var pos = this.calculatePos(e);
            if (pos.absX > pos.absY) {
                e.preventDefault();
                this.slid(this.activeIndex, pos.deltaX);
            }
        },
        onTouchend(e) {
            var {
                loop,
                list,
                start,
                flickThreshold,
                delta,
                activeIndex
            } = this;
            var pos = this.calculatePos(e);
            var time = Date.now() - start;
            var velocity = Math.sqrt(pos.absX * pos.absX + pos.absY * pos.absY) / time;
            var isFlick = velocity > flickThreshold;
            var newIndex = activeIndex;
            if (isFlick || pos.absX > delta) {
                newIndex = newIndex + pos.absX / pos.deltaX;
                if (!loop) {
                    newIndex = Math.max(Math.min(newIndex, list.length - 1), 0);
                }
            }
            this.transitionTo(newIndex);
        },
        onTouchcancel(e) {
            this.transitionTo(this.activeIndex);
        },
        resize() {
            this.width = this.$el.offsetWidth;
            window.bus.$emit('width', this.width);
            this.activeIndex = 0;
            this.transitionDuration = 0;
            this.$nextTick(function afterResize() {
                this.slid(this.activeIndex, 0);
            }, this)
        }
    },
    created() {
        if (this.responsive !== 0) {
            this.style.height = 0;
            this.style.paddingBottom = this.responsive + '%';
        }
        var _this = this;
        window.bus.$on('addItem', function (id) {
            _this.addItem(id);
        })
        window.bus.$on('delItem', function (id) {
            _this.delItem(id);
        })
    },
    mounted() {
        this.resize();
        this.setTimer();

        window.addEventListener('resize', this.resize);
    },
    detached() {
        window.removeEventListener('resize', this.resize);
    }
}



