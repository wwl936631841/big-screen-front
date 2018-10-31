export const name = 'frame'

export const types = {
  CHANGE_LIMIT_WIDTH: 'LIMIT_WIDTH'
}

const persistentStore = new nenv.lib.StorageBuilder(name, {
  isWithLimited: Boolean
}).storage

const store = {
  name,
  // namespaced: true,
  state: {
    // 是否展开布局
    isWithLimited: persistentStore.isWithLimited || false
  },
  mutations: {
    [types.CHANGE_LIMIT_WIDTH]: (state) => {
      state.isWithLimited = !state.isWithLimited
      persistentStore.isWithLimited = state.isWithLimited
    }
  },
  actions: {
    changeLimitWidth: ({ commit, state }) => {
      commit(types.CHANGE_LIMIT_WIDTH, !state.isWithLimited)
    }
  }
}

window.persistentStore = persistentStore

export default store
