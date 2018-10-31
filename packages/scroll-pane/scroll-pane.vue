<template>
    <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
        <div class="scroll-wrapper" ref="scrollWraper" :style= "{left: left + 'px'} ">
            <slot />
        </div>
    </div>
</template>

<script>

const padding = 15

export default {
    name: 'NvScrollPane',
    data() {
        return {
            left: 0
        }
    },
    methods: {
        ScrollTo () {
            
        },
        handleScroll(e) {
            const self = this
            const eventDelta = e.wheelDelta || -e.deltaY * 3
            const $container = self.$refs.scrollContainer
            const $containerWidth = $container.offsetWidth
            const $wrapper = self.$refs.scrollWraper
            const $wrapperWidth = $wrapper.offsetWidth

            if ( eventDelta > 0) {
                self.left = Math.min(0, self.left + eventDelta)
            } else {
                if ($containerWidth - padding < $wrapperWidth) {
                    if (self.left < - ($wrapperWidth - $containerWidth + padding)) {
                        self.left = self.left
                    } else {
                        self.left = Math.max(self.left +  eventDelta, $containerWidth - $wrapperWidth - padding)
                    }
                } else {
                        self.left = 0
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    .scroll-wrapper {
        position: absolute;
    }
}
</style>