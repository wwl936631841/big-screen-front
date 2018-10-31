<template>
	<div class="dialog-select nv-organize-user-dialog">
		<div class="nv-organize-user-dialog__input" @click="handleClick">
			<span v-if = "!currectValue || currectValue.length === 0" class="nv-organize-user-dialog__placeholder" >
				{{ placeholder }}
			</span>
			<el-tag 
				v-for = "node in currectValue" 
				:key="node.id" 
				closable
				size = "small"
				@close = "removeSelected(node)"
				>
				{{ node.name }}
			</el-tag>
			<el-tag size = "small" type="info" @click="handleClick">
				+添加更多
			</el-tag>
		</div>
		<el-dialog :title="realTitle" :visible.sync="dialogVisible" width="800px">
			<div class="select-tree">
				<div class="select-tree__left">
					<div class="search-div">
						<el-input class="search" placeholder="输入关键字进行搜索" v-model="filterText" />
					</div>
					<div class="tree-div">
						<el-tree ref="selectTree"
							class="filter-tree" 
							:disabled="true" 
							:data="treeData" 
							:props="defaultProps" 
							node-key="id" 
							render-after-expand
							show-checkbox
							:filter-node-method="filterNode"
							@check-change="checkChange" >
						</el-tree>
					</div>
				</div>
				<div class="select-tree__right">
					<div v-for="node in nodeList" class="selected-user-item" :key="node.id">
						<li>{{ node.name }}</li>
						<li class="user-dept">{{ '/' + node.parents.map(item => item.name).join('/') }}</li>
						<i @click="removeSelected(node)">×</i>
					</div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="commitResult">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'NvOrganizeUserSelector',
		props: {
			// 是否为只需要组织，不需要人员
			onlyOrganize: {
				type: Boolean,
				default: false
			},
			// 标题
			title: {
				type: String,
			},
			// 匹配的label
			label: {
				type: String,
				default: 'name'
			},
			// 请求人员url地址
			url: {
				type: String,
				default: '/user/organize/all'
			},
			// 请求组织地址
			organizeUrl: {
				type: String,
				default: '/user/organize'
			},
			// 是否开启多选
			multi: {
				type: Boolean,
				default: false
			},
			// 改元素的值
			value: {
				type: Array,
				required: true
			},
			placeholder: {
				type: String,
				default: '请选择人员'
			}
		},
		data () {
			return {
		        defaultProps: {
		          	children: 'children',
		          	label: this.label
		        },
				dialogVisible: false,
			    filterText: '',
				treeData: [],
				nodeList: []
			}
		},
		computed: {
			realTitle () {
				const self = this
				if (self.title) {
					return title
				} else if (self.onlyOrganize) {
					return "请选择部门"
				} else {
					return "请选择人员"
				}
			},
			currectValue: {
				set (val) {
					this.$emit('input', val)
				},
				get () {
					return this.value
				}
			}
		},
		created () {
			this.fetchData()
		},
		methods: {
			fetchData () {
				const self = this
				const url = self.onlyOrganize ? self.organizeUrl : self.url
				unfetch(url, {})
				.then(({ data }) => {
					// 处理父节点
					function recursivelyProcessNode (tree, parents) {
						tree.forEach(leaf => {
							leaf.name = leaf.text
							delete leaf.text
							if (leaf.children) {
								recursivelyProcessNode(leaf.children, parents.concat({ name: leaf.name, id: leaf.id}))
							} else {
								leaf.parents = parents
							}
						})
					}

					self.$nextTick(() => {
						recursivelyProcessNode(data, [])
					})
					self.treeData = data
				});
			},
			// 点开弹出
			handleClick () {
				this.dialogVisible = true;
			},
			filterNode(value, data) {
				return value ? data[this.label].indexOf(value) !== -1 : true
		    },
		    commitResult () {
				const self = this
		        if (self.nodeList.length < 1) {
		        	self.$message.error('需要勾选人员才能确定哦');
		        }
				self.currectValue = this.nodeList
				self.dialogVisible = false
			},
		    checkChange (node, isChecked, isChildChecked) {
				const self = this
				console.log(node, isChecked, isChildChecked)
		    	if (!node.children) {
		    		if (isChecked) {
		    			if (this.filterText && node.name.indexOf(this.filterText) == -1) {
		    				// 如果是搜索，不在搜索范围的取消
					    	const selectTree = this.$refs.selectTree;
					    	selectTree.setChecked(node.id, false, false);
		    			} else {
		    				if (!this.multi && this.nodeList.length > 0) {
		    					// 单选
		    					const nodeObj = this.nodeList[0];
		    					// 移除其他勾选的
		    					this.removeSelected(nodeObj);
		    				}
		    				this.nodeList.push({ id: node.id, name: node.name, parents: node.parents });
		    			}
			    	} else {
						// 取消勾选
						self.nodeList = self.nodeList.filter(item => item.id !== node.id)
					}
					self.currectValue = self.nodeList
		    	}
		    },
		    removeSelected (node) {
				const self = this
				const { nodeList, $refs } = self
				for (let i = 0; i < nodeList.length; i++) {
					if (nodeList[i].id === node.id) {
						self.nodeList.splice(i, 1)
					}
				}
				// self.nodeList = nodeList.filter(item => item.id !== node.id)
				if ($refs.selectTree) {
					$refs.selectTree.setChecked(node.id, false, false);
				}
		    }
		},
		watch: {
	      	filterText(val) {
	        	this.$refs.selectTree.filter(val)
	      	}
	    },
	}
</script>

<style lang="scss">
	.nv-organize-user-dialog {
		&__input {
			cursor: pointer;
			min-height: 22px;
			border: 1px solid #dcdfe6;
			padding: 10px 10px 0 0px;

			max-width: 400px;

			&:hover {
				border-color: #c0c4cc
			}

			.el-tag {
				margin-bottom: 10px;
				margin-left: 10px;
			}
		}

		&__placeholder {
			display: inline-block;
			font-size: 14px;
			margin: 0 0 10px 10px;
			color: #dcdfe6;
		}
	}
</style>


<style lang="scss" scoped>

	.dialog-footer {
		text-align: center;
	}
	.select-tree {
		height: 335px;
		border: 1px solid #DEDEDE;

		&__left { 

			display: inline-block;
			width: 48%;
			height: 100%;
			border-right: 1px solid #DEDEDE;
			position: relative;

			.search-div {

				padding: 10px; 
				position: absolute; 
				border-bottom: 1px solid #DEDEDE; 
				left: 0; 
				top: 0; 
				right: 0; 
				background-color: #fff; 
				z-index: 2; 
			}
			
			.tree-div {

				overflow: auto;
				height: 271px;
				margin-top: 62px; 
			}
		}
		&__right { 
			display: inline-block;
			width: 48%;
			height: 100%;
			border-left: 1px solid #DEDEDE; 
			vertical-align: top;
			float: right;
			overflow: auto; 

			div {
				position: relative; 
				padding: 6px 10px; 
				border-bottom: 1px solid #DEDEDE;

				li { 
					list-style-type: none; 
					line-height: 21px; 
					color: #333; 
					pointer-events: none;

					&.user-dept {
						color: #999;
						font-size: 12px;
						line-height: 20px;
					}
				}

				i { 
					display: none; 
					background-color: #398DEE;
					padding: 0px 5px 0 4px;
					color: #fff;
					border-radius: 10px; 
					position: absolute; 
					right: 5px;
					top: 18px;
					height: 18px;
					line-height: 18px;
					cursor: pointer; 
				}
			}
		}
	}
</style>

<style lang="scss">
	.selected-user-item {
		&:hover {
			background-color: #D9EBFE;
			i {
				display: block !important;
			}
		}
	}
</style>
