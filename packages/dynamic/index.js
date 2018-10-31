import NvDynamicLedger from './dynamic-ledger'
import NvDynamicTab from './dynamic-tab'

export default {
    install (Vue) {
        NvDynamicLedger.install(Vue)
        NvDynamicTab.install(Vue)
    }
}