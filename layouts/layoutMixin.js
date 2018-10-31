import vuex from 'vuex'

export default {
    computed: {
        ...vuex.mapGetters('platform', ['menus']),
    }
}