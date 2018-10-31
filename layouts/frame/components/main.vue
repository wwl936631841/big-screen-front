<template>
    <section class="main">
        <transition name="fade" mode="out-in">
              <router-view />
        </transition>
    </section>
</template>

<script>
    export default {
      name: 'FrameMain',  
    }
</script>
<style scoped lang="scss">
    .main{
        height: 100%;
        min-width: 1063px;
        overflow-y: auto;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease-in-out;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>

