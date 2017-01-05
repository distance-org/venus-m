import FilterBar from '/common/ui_widget/filter_bar/index.js'
import StatusBarB from '/common/ui_widget/status_bar_b/index.js'
import PosterList from '/common/ui_widget/poster_list/index.js'
new Vue({
    el : '#container',
    data : {
      docTitle : document.title
    },
    components : {
        FilterBar, //组件名称不能叫Filter,否则不起作用不报错,可能与vue关键字冲突所致
        StatusBarB,
        PosterList
    }
})
