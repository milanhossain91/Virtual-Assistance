<script setup>
import MainLayout from "@/components/MainLayout.vue";
import Upload from "@/components/Upload.vue";
import Feedback from "@/components/Feedback.vue";
import { ref, computed } from "vue";

const userType = ref(localStorage.getItem("userType"));

const userTypeLabel = computed(() => {
  return userType.value === "admin"
    ? "Virtual Assistant Admin Panel"
    : "Virtual Assistant Input Panel";
});

const isAdmin = computed(() => {
  return userType.value === "admin";
});
</script>

<template>
  <MainLayout :title="userTypeLabel">
    <template v-if="!isAdmin">
      <Upload />
      <Feedback />
    </template>
  </MainLayout>
</template>
