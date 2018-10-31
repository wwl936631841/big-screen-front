import Hola from './hola'

const { loader } = window.nenv

Object.assign(Hola, {
    label: "侧边导航"
})
export const layout = Hola

loader({ layout })