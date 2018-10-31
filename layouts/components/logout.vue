<template>
    <span class="e-header__btn-loginout" @click="handlerLogout"> 退出 </span>
</template>
<script>
import vuex, { mapGetters, mapActions } from 'vuex'
export default {
    methods: {
        handlerLogout () {
            const self = this
            self
              .logout()
              .then(() => {
                this.$router.push({ path: process.env.LOGIN_PATH || '/login' })
              })
        },
        ...mapActions(
            ['logout']
        ),
    }
}
</script>
<style lang="scss" scoped>

</style>


