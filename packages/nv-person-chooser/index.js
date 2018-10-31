import NvPersonChooser from './nv-person-chooser'
import NvPersonChoose from './nv-person-choose'
NvPersonChooser.install = function (Vue) {
    Vue.component(NvPersonChoose.name, NvPersonChoose)
    Vue.component(NvPersonChooser.name, NvPersonChooser)
}

export default NvPersonChooser
