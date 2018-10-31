<template>
 
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'sso-callback',
    title:'登录',
    meta: { nvPermission: false },
    computed: {
        token () {
            return this.$route.query.token;
        }
    },
    created(){
        localStorage.setItem('unfetch.is.redirect', false)
        this.userInfo(this.token)
    },
    methods: {
        ...mapActions(['userInfo']),
    }
    
   
}
</script>
<style lang="sass" scoped>

</style>


