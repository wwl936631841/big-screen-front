<template>
    <div class="home-block" :class="{'is-edit-mode': isEditMode}" :style="style" v-block>
        <label class="home-block__handler" v-if="isEditMode" @click="close"> x </label>
        <div class="home-block__top"  v-if="title || $slots.title" :class="{ line: line }">
            <label class="home-block__label" v-if="title"> {{ title }}
                <slot name="title" />
            </label>
        </div>
        <slot name="default"/>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String
        },
        width:{
            type: String
        },
        height: {
            type: String
        },
        line: {
            type: Boolean,
            default: true
        },
    },
    data () {
        return   {
            isEditMode: false,
            data: -1,
        }
    },
    created () {
        const self = this
        self.$bus.$on('trigger-home-edit-mode', self.handlerTigger)
    },
    beforeDestory () {
        self.$bus.$off('trigger-home-edit-mode', self.handlerTigger)
    },
    computed: {
        style () {
            const self = this
            const style = {}
            if (self.width) {
                style.width = self.width
            }
            if (self.height) {
                style.height = self.height
            }

            return style
        }
    },
    directives: {
        block: {
            bind: function (el, binding, vnode, oldVnode) {
                return
                el.onmouseenter = function () {
                    el.onmousemove = function (e) {
                        e = e || e.event

                        const rect = el.getBoundingClientRect()


                        const { top, left, right, bottom } = rect
                        const { clientX, clientY } = e
                        console.log(rect, clientY)

                        el.style.cursor = 'auto'

                        // 如果是左右边缘,呈现
                        if (clientX < left + 10 || clientX > right - 10) {
                            el.style.cursor = 'w-resize'
                        }

                        // 如果是上下边缘
                        if (clientY < top + 10 || clientY > bottom - 10) {
                            el.style.cursor = 'n-resize'
                        }

                        //如果是左上边缘
                        if (clientX < left + 10 && clientY < top + 10) {
                            el.style.cursor = 'nw-resize'
                        }

                        // 如果是右上边缘
                        if (clientX > right - 10 && clientY < top + 10 ) {
                            el.style.cursor = 'ne-resize'
                        }

                        // 如果是右下边缘
                        if (clientX > right -10 && clientY > bottom - 10) {
                            el.style.cursor = 'se-resize'
                        }

                        // 如果是左下边缘
                        if (clientX < left + 10 && clientY > bottom - 10) {
                            el.style.cursor = 'sw-resize'
                        }
                    }
                }

                el.onmouseleave = function () {
                    el.onmousemove = null
                }

                el.onmousedown = function (e) {
                    console.log(e)
                    // e = e
                    const ox = e.clientX
                    const oy = e.clientY
                    const rect = el.getBoundingClientRect()
                    
                    let width = el.offsetWidth
                    el.style.width = width + 'px'
                    el.onmousemove = function (e) {
                        const dx = e.clientX - ox
                        const dy = e.clientY - oy
                        el.style.width = width + dx + 'px'
                    }

                    el.onmouseup = function () {
                        el.onmousemove = null
                    }
                }
            }
        }
    },
    methods: {
        close () {
            this.$parent.$emit('close')
        },
        handlerTigger (val) {
            this.isEditMode = val
        },
        handlerMouseMove () {
            const self = this
            if (self.isEditMode) {
                
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .home-block {
        position: relative;
        min-height: 185px;
        // border: 1px solid;
        border-radius: 6px;
        padding: 20px;
        margin: 10px;
        width: 25%;
        min-width: 350px;
        background-color: #fff;
        box-shadow: 0px 2px 4px 0px rgba(226,226,226,0.5);

        &__top {
            &.line {
                &:after {
                    margin-top: 10px;
                    display: block;
                    content: '';
                    border-bottom: 1px solid #eee;
                }
            }
        }

        &__handler {
            position: absolute;
            right: -10px;
            top: -10px;
        }

        &__label {
            position: relative;
            &:before {
                content: "";
                display: block;
                position: absolute;
                border-radius: 6px;
                top: 0;
                left: -10px;
                width: 6px;
                height: 22px;
                background-color: #3b8cff;
            }
        }
    }
</style>


