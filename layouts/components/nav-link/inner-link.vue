<template>
    <div @click = "navTo" class="inner-link" :class="{active: isActive}"> 
        <slot name="default"/>
    </div>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            default: 'a'
        }
    },
    computed: {
        isActive () {
            const self = this
            const path = self.to
            return path.indexOf(self.$route.fullPath) > -1
        }
    },
    methods: {
        navTo () {
            const self = this
            self.$router.push(self.to)
            self.$emit('click')
        }
    }
}
</script>

<style lang="scss" scoped>
    .inner-link {
        cursor: pointer;
    }
</style>


