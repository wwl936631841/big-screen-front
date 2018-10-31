export default {
    data() {
        return {
            currentTab: {},
            realComponent: null,
            realComponentProps: {}
        }
    },
    methods: {
        handleTabClick (tab) {
            this.currentTab = tab
            this.$router.push({ path: this.$route.fullPath, query: tab.query || {} })
        }
    },
    watch: {
        currentTab: {
            deep: true,
            handler (val) {
                const self = this
                const { path,query } = self.currentTab
                if (/https?:\/\//.exec(path)) {
                    this.realComponent = 'nv-iframe'
                    this.realComponentProps = { nvUrl: `${path}${query ? '?' + Object.keys(query).map((key, index)=> (index === 0 ? '' : '&') + key + '=' + query[key]).reduce((a,b ) => a + b) : ''}` }
                } else {
                    this.pageLoader.loadPage(path).then(() => {
                        const match = this.$router.match(path)
                        const { matched, params } = match
                        const { components } = matched[matched.length - 1]
    
                        this.realComponentProps = {
                            'is-Daynamic': true,
                            nvProps: params
                        }

                        this.realComponent = components.default || components
                    })
                }
            }
        }
    }
}