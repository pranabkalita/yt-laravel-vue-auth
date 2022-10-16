<template>
  <cNavbar />
  <router-view />
</template>

<style src="@/assets/styles/app.css" />

<script>
import cNavbar from "@/components/global/cNavabr.vue";

export default {
  components: {
    cNavbar,
  },
};
</script>