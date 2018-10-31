const x = './frame.vue'
import _import from './_import'
const Frame = _import(x)
import store from './store'

const { loader } = window.nenv

export const layout = Frame
Object.assign(layout, {
    label: "顶部侧边导航"
})

loader({ layout, store })

import './assets/icons/index.scss'
import './index.scss'