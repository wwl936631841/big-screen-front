<template>
  <!-- <nv-dynamic-ledger nv-code="FIRST_LEDGER"></nv-dynamic-ledger> -->
  <nv-layout>
    <div>
      <el-button type="primary" @click="openLedger">打开台账页面</el-button>
    </div>
  </nv-layout>
</template>
<script>
export default {
  name: 'LedgerDemo',
  methods: {
    openLedger (val) {
      if (val) {
        unfetch.open('./#/ledger', {
          params: {
            'nv-code': 'FIRST_LEDGER'
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>


