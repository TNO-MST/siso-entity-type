<template>
  <v-footer height="40" app>
    <div class="text-caption text-disabled" style="position: absolute; left: 16px">
      <a class="text-decoration-none on-surface" :href="githubUrl" rel="noopener noreferrer" target="_blank">Github source</a>
    </div>
    <div class="text-caption text-disabled" style="position: absolute; right: 16px">
      &copy; {{ new Date().getFullYear() }} <span class="d-none d-sm-inline-block"></span>
      <a class="text-decoration-none on-surface" href="https://tno.nl" rel="noopener noreferrer" target="_blank">TNO The Netherlands </a>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
const githubUrl = "https://github.com/TNO-MST/siso-entity-type";
</script>

<style scoped lang="sass"></style>
