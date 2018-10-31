import NvLedger from './components/ledger'
import './style.scss'
NvLedger.install =  function (Vue) {
    Vue.component(NvLedger.name, NvLedger)
}

export default NvLedger