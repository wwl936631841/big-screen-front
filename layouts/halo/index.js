import Halo from './halo'
import HaloMenuItem from './components/halo-menu-item'
import HaloMenuPane from './components/halo-menu-pane'
import './index.scss'
const { loader } = window.nenv

Vue.component(HaloMenuItem.name, HaloMenuItem)
Vue.component(HaloMenuPane.name, HaloMenuPane)

export const layout = Halo
Object.assign(layout, {
    label:"顶部导航"
})


loader({ layout })