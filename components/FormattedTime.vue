<template>
  <time :datetime="asAttribute">{{ asText }}</time>
</template>

<script lang="ts">
import Vue from 'vue'
import 'dayjs/plugin/timezone'

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
      return this.$dayjs(this.datetime)
        .tz('Asia/Tokyo')
        .format('YYYY/MM/DD HH:mm')
    },
  },
})
</script>
