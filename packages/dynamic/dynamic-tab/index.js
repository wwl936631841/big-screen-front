import NvDynamicTab from './dynamic-tab'
NvDynamicTab.install = function (Vue) {
    Vue.component(NvDynamicTab.name, NvDynamicTab)
}
import './style.scss'
export default NvDynamicTab