<template>
  <time :datetime="asAttribute">{{ asText }}</time>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'FormattedTime',
  props: {
    datetime: {
      type: String,
      required: true,
    },
  },
  computed: {
    asAttribute() {
      return new Date(this.datetime).toISOString()
    },
    asText() {
      return this.$dayjs(this.datetime).format('YYYY/MM/DD HH:mm')
    },
  },
})
</script>
