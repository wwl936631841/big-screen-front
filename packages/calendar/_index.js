import NvCalendar from './src/calendar'

NvCalendar.install = function(Vue) {
  Vue.component(NvCalendar.name, NvCalendar)
}

export default NvCalendar