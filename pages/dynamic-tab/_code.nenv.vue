<template>
    <nv-layout>
        <nv-dynamic-tab :nvCode="nvCode"/>
    </nv-layout>
</template>
<script>
export default {
    name: 'DynamicTab',
    meta: { nvPermisson: false },
    props: {
        nvProps: {
            type: Object
        }
    },
    computed: {
        nvCode () {
            return this.nvProps.code || this.$route.query['nv-code'] || this.$route.params.code
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


