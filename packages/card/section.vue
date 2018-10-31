<template>
    <div class="nv-layout-section">
        <div class="top">
            <span class="prefix">{{ prefix }}</span>
            <span class="title">{{ title }}</span>
            <span class="title-line"></span>
        </div>
        <div>
            <slot name="default"/>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NvLayoutSection',
    props: {
        title: {
            
        }
    },
    data () {
        return {
            prefix: ''
        }
    },
    created () {
        this.$parent.addSection(this)
    }
}
</script>
<style lang="scss" scoped>
    .nv-layout-section {
    
    }

    .top {
        position: relative;
        margin: 20px 0 10px 0;
        font-size: 0;
    }

    .is-card-layout {
        .top {
            margin-top: 0;
        }
        .title {
            //color: red;
            &-line {
                border: none
            }
        }
    }

    .prefix {
        position: relative;
        background-color: #fff;
        font-size: 20px;
        font-weight: 800;
        z-index: 1;
        &:after {
            content: '·';
            padding-right: 4px;
        }
    }

    .title {
        position: relative;
        font-size: 20px;
        font-weight: 800;
        color: #333;
        padding: 0 10px;
        background-color: #fff;
        z-index: 1;
        &:before {
            //content: '·';
            padding-right: 4px;
        }

        &-line {
            position: absolute;
            width: 100%;
            left: 0;
            top: 50%;
            border-bottom: 2px solid #888;
        }
    }
</style>



