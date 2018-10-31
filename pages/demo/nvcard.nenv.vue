<template>
    <nv-layout :prefixType="prefixType">
        <div slot="top">
            <el-form>
                <el-form-item label="选择前缀">
                    <el-select v-model="prefixType">
                        <el-option
                            v-for = "item in [{value: '一', label:'中文数字'}, {value: 'Ⅰ', label: '罗马数字'}, {value: '1', label: '阿拉伯数字数字'}, {value: null, label: '无'}]"
                            :value = "item.value"
                            :label = "item.label"
                            :key="item.value"/>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <nv-layout-section title="标题一">
            {{ content }}
        </nv-layout-section>
        <nv-layout-section title="标题二">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题三">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题四">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题五">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题六">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题七">
            {{ content }}
        </nv-layout-section>
        <nv-layout-section title="标题八">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题九">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题十">
            {{ content }}
        </nv-layout-section> 
    </nv-layout>
</template>
<script>
export default {
    name: 'DemoCard',
    data () {
        return {
            content: "    ",
            prefixType: '一'
        }
    },
    created () {
        for (let i = 0; i < 100; i++) {
            this.content += "内容"
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


