<template>
  <section class="wrapper relative">
    <div
      class="container mx-auto"
      :class="{
        'max-w-2xl absolute top-24 left-1/2  -translate-x-1/2': !token,
      }"
    >
      <!-- header -->
      <Header :title="title" v-if="token" />
      <!-- content -->
      <div
        class="p-5 bg-transparent border-double border-4 border-indigo-400 mt-5 rounded-md min-h-80"
      >
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script setup>
import Header from "./Header.vue";
import Cookies from "js-cookie";
import { ref } from "vue";

const token = ref(Cookies.get("token"));
defineProps(["title"]);
</script>
