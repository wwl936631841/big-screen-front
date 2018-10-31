import NvCard from './card'
import NvLayoutSection from './section'
import NvLayoutForm from './nv-layout-form'
import store from './store'
NvCard.install = function (Vue) {
    Vue.component(NvLayoutSection.name, NvLayoutSection)
    Vue.component(NvLayoutForm.name, NvLayoutForm)
    Vue.component(NvCard.name, NvCard)
}

nenv.loader({ store })

export default NvCard