<template>
    <demo-foo :msg="msg"></demo-foo>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('SLAM DUNK')
</script>