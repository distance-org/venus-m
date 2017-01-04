import bb from '/common/ui_widget/carousel/index.js'

window.bus = new Vue();
// 触发组件 A 中的事件

// 在组件 B 创建的钩子中监听事件

bus.$emit('id-selected', 1)
new Vue({
    el : '#cc',
    components : {
        'bb' : bb
    }
})
