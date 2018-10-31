import dynamicMixins from '../lib/dynamicMixins'
export default {
    name: 'NvDynamicTab',
    props: {
        nvUrl: {
            type: String,
            default: '/tab/valid/menus'
        },
        nvCode: String
    },
    mixins: [ dynamicMixins ],
    data () {
        return {
            isLoading: false,
            currentTab: {},
            tabs: []
        }
    },
    created () {
        this.fetchTabs()
    },
    methods: {
        fetchTabs () {
            const self = this
            const { nvUrl, nvCode } = self
            self.isLoading = true
            unfetch(nvUrl, {
                params: {
                    CODE: nvCode
                }
            }).then(({ data }) => {
                data = data.map(tab => {
                    const path = tab.URL.split('?')
                    let query = path[1]
                    if (query) {
                        query = query.split('&')
                        const kv = {}
                        for (let q of query) {
                            q = q.split('=')
                            kv[q[0]] = q[1]
                        }
                        tab.query = kv
                    }
                    tab.path = path[0]
                    delete tab.URL
                    return tab
                })
                self.isLoading = false
                self.tabs = data
                self.handleTabClick(data[0])
            }).catch(() => {
                self.isLoading = false
            })
        },
        handleTabClick (tab) {
            this.currentTab = tab
            this.$router.push({ path: this.$route.fullPath, query: tab.query || {} })
        },
        handleNvLayout (nvLayout) {
            nvLayout.isDynamicView = true
        }
    },
    watch: {
        nvCode () {
            this.fetchTabs()
        }
    },
    render (h) {
        const self = this
        return h(
            'section',
            {
                staticClass: 'nv-dynamic-tab'
            },
            [
                h(
                    'div',
                    {
                        staticClass: 'nv-dynamic-tabs'
                    },
                    [
                        h('div',
                            {
                                staticClass: 'nv-dynamic-tab__nav'
                            }, 
                            self.tabs.map(function (tab) {
                                return h(
                                            'div',
                                            {
                                                key: tab.ID,
                                                staticClass: 'nv-dynamic-tab__item',
                                                class: tab.ID === self.currentTab.ID ? 'active' : '',
                                                on: {
                                                    click: function () { self.handleTabClick(tab) }
                                                } 
                                            },
                                            tab.NAME
                                        )
                            })
                        ),
                        h(
                            'div',
                            {
                                staticClass: 'nv-dynamic-tab__pane',
                            },
                            [
                                h(
                                    self.realComponent, 
                                    {
                                        props: {
                                            ...self.realComponentProps
                                        },
                                        on: {
                                            configNvlayout: self.handleNvLayout
                                        }
                                    }
                                )
                            ]
                        )
                    ]
                )
            ]
        )
    }
}


