import dynamicMixins from '../../lib/dynamicMixins'
export default {
    name: 'NvDynamicLedger',
    props:{
        nvUrl: {
            default: '/ledger/valid/menus'
        },
        nvCode : {
            type: String,
            required: true
        },
        nvEmbed: {
        	type: Boolean,
        	default: false
        },
        nvPosition: {
            type: String,
            default: 'left'
        },
        allParams:{
            type: String,
        }
    },
    mixins: [ dynamicMixins ],
    data () {
        return {
            menus: []
        }
    },
    created () {
        this.loadMenus()
    },
    methods: {
        loadMenus () {
            const self =this
            const { nvUrl, nvCode, allParams} = self
            unfetch(nvUrl, {
                params: {
                    CODE: nvCode,
                    ALL_PARAMS: allParams
                }
            }).then(({ data }) => {
            	self.$emit('nv-slider', data);
            	data = data.menus;
            	self.loopMenus(data);
                self.isLoading = false
                self.menus = data
                function findRealTab (data) {
                    const ledger = data[0]
                    if (ledger.children) {
                        ledger.isChildExpansion = true
                        return findRealTab(ledger.children)
                    }
                    return ledger
                }
                self.handleTabClick(findRealTab(data))
            }).catch(() => {
                self.$emit('error')
            })
        },
        loopMenus(data) {
        	const self = this
        	data.map(tab => {
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
                // 是否展开子菜单
                tab.isChildExpansion = false;
                delete tab.URL
                if (tab.children && tab.children.length > 0) {
                	self.loopMenus(tab.children);
                }
            })
        },
        handleTabClick (tab) {
        	if (tab.children) {
        		tab.isChildExpansion = !tab.isChildExpansion;
        		this.$forceUpdate();
        	} else {
        		this.currentTab = tab
            	this.$router.push({ path: this.$route.fullPath, query: tab.query || {} })
        	}
            
        }
    },
    render (h) {
        const self = this
        return h(
                    'div',
                    {
                        staticClass: 'nv-ledger',
                        class: `nv-${self.nvPosition}`
                    },
                    [
                        !self.nvEmbed ? h(
                            'div',
                            {
                                staticClass: 'nv-ledger__nav'
                            },
                            self.menus.map((menu) => {
                                return [
                                	h(
                                        'div',
                                        {
                                            staticClass: 'nv-ledger__item',
                                            class: menu.children ? '' : (self.currentTab.ID === menu.ID ? ' active' : ''),
                                            on: {
                                                click: function () { self.handleTabClick(menu) }
                                            }
                                        },
                                        [
                                        	menu.NAME,
                                        	/*箭头*/
                                        	menu.children ? h(
                                        		'div',
	                                        	{
	                                        		staticClass: 'left-down',
	                                        		class: menu.isChildExpansion ? 'el-icon-arrow-down' : 'el-icon-arrow-right',
	                                        	},
	                                        	''
                                       		) : null
                                        ]
                                        
                                    ),
                                    // 台账二级
                                    menu.children ? menu.children.map((childMenu) => {
                                    	return [
                                    		h(
		                                		'div',
							                    {
							                        staticClass: 'nv-ledger__item nv-ledger__item__child',
		                                            class: (self.currentTab.ID === childMenu.ID ? ' active' : '') + (menu.isChildExpansion ? '' : ' hide'),
		                                            on: {
		                                                click: function () { self.handleTabClick(childMenu) }
		                                            }
							                    },
							                    childMenu.NAME,
							                )
                                    	]
                                    }) : null
                                ]
                            })
                        ) : null,
                        h(
                            'div',
                            {
                                staticClass: 'nv-ledger__pane'
                            },
                            [
                                h(
                                    self.realComponent,
                                    {
                                        props: {
                                            ...self.realComponentProps
                                        }
                                    }
                                )
                            ]
                        )
                    ]
                )
    }
}



