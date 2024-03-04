<template>
  <div
    class="flex justify-between items-center bg-[#072C66] rounded-md py-2 px-4 header"
  >
    <div>
      <h1 class="text-base md:text-lg xl:text-2xl font-semibold text-white">
        {{ title }}
      </h1>
    </div>
    <div>
      <button
        type="button"
        class="text-white font-semibold w-10 hover:text-yellow-300 md:text-xl"
        @click="handleLogout"
      >
        <PoweroffOutlined class="align-baseline" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { showNotification } from "@/utilities/notification.js";
import { PoweroffOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const router = useRouter();

defineProps(["title"]);

const handleLogout = () => {
  Cookies.set("token", "");
  localStorage.clear();
  router.push({ name: "login" });
  showNotification("success", "Logged Out");
};
</script>
