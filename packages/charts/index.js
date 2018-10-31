import ECharts  from 'vue-echarts'

import './style.scss'
import mytheme from './theme'
ECharts.props.theme = {
    type:[String, Object],
    default () {
        return mytheme
    }
}
export default {
    install (Vue) {
        Vue.component('ECharts', ECharts)
    }
}