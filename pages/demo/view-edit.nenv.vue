<template>
    <nv-layout>
        <nv-checkbox nv-code="HOBBY" v-model="nvCheckBoxResult"/>
        <nv-checkbox nv-code="HOBBY" v-model="nvCheckBoxResult" :disabled = "false"/>
        <p>
        <div> 
            <nv-radio nv-code="HAHA" v-model="nvRadioResult"/>       
        </div>
        <div> 
            <nv-radio nv-code="HAHA" v-model="nvRadioResult2" :disabled = "false"/>       
        </div>
        <p>
        <div>
            <nv-select nv-code="XSELECT" v-model="nvSelectResult" placeholder="请选择" />
        
            <nv-select nv-code="XSELECT" v-model="nvSelectResult2" placeholder="请选择" :disabled = "false"/>
        </div>
        <p>
        <div>
            <nv-input v-model="nvInputResult" placeholder="请选择" />
        
            <nv-input v-model="nvInputResult2" placeholder="请选择" :disabled = "false"/>
        </div>
        <p>
        <div>
            <nv-textarea v-model="nvTextareaResult"/>
            
            <nv-textarea v-model="nvTextareaResult2" :disabled = "false"/>
        </div>
        <p>
        <div>
            <nv-date-picker v-model="nvDatePickResult"/>
            <nv-date-picker v-model="nvDatePickResult" :disabled = "false"/>                
        </div>
    </nv-layout>
</template>
<script>
export default {
    name: 'DemoViewEdit',
    data () {
        return {
            nvCheckBoxResult: [],
            nvRadioResult: '',
            nvRadioResult2: '',
            nvSelectResult:'',
            nvSelectResult2:'',
            nvInputResult:'',
            nvInputResult2:'',
            nvTextareaResult:'',
            nvTextareaResult2:'',
            nvDatePickResult: null
        }
    },
    created () {
        this.fetchForm()
    },
    methods: {
        fetchForm () {
            const self = this
            unfetch('/view-edit', {
                params: {
                    CODE: 'x'
                }
            }).then(({data}) => {
                self.nvCheckBoxResult = data.nvCheckBoxResult,
                self.nvRadioResult = data.nvRadioResult,
                self.nvSelectResult = data.nvSelectResult,
                self.nvInputResult = data.nvInputResult,
                self.nvTextareaResult = data.nvTextareaResult
            })
        }
    }
}
</script>

<style lang="scss" scoped>

    .el-select {
        width: auto;
    }
</style>

