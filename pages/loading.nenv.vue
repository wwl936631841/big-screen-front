<template>
    <div>
        加载中
    </div>    
</template>
<script>
export default {
    data () {
        return {
            fromPath: ''
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => vm.fromPath = from.path)
        // next()
    },
    beforeRouteUpdate  (to, from, next) {
        //debugger
        nenv.pageLoader.loadPage(to.path).then(() => {
            // debugger
            this.$router.push(to.path)
        })
        next()
    }
}
</script>
<style lang="scss" scoped>

</style>


