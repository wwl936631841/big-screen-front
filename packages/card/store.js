export const name = 'nv-layout'
export const types = {
    CHANGE_LAYOUT: 'CHANGE_LAYOUT',
    CHNAGE_SHOW_TITLE: 'CHNAGE_SHOW_TITLE',
    CHANGE_EXTRA_DIRECTION: 'CHANGE_EXTRA_DIRECTION'
}
export default {
    name,
    state: {
        isCardLayout: false,
        isShowTitle: true,
        isExtraRight: false,
    },
    mutations: {
        [types.CHANGE_LAYOUT] (state, layout) {
            state.isCardLayout = layout
        },
        [types.CHNAGE_SHOW_TITLE] (state, isShow) {
            state.isShowTitle = isShow
        },
        [types.CHANGE_EXTRA_DIRECTION](state, isExtraRight) {
            state.isExtraRight = isExtraRight
        }
    },
    actions: {
        changeLayout  ({commit, state}) {
            commit(types.CHANGE_LAYOUT, !state.isCardLayout)
        },
        changeShowTitle ({ commit, state }) {
            commit(types.CHNAGE_SHOW_TITLE, !state.isShowTitle)
        },
        changeExtraDirection({commit, state}) {
            commit(types.CHANGE_EXTRA_DIRECTION, !state.isExtraRight)
        }
    }
}