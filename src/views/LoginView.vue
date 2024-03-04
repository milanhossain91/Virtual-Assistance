<template>
  <MainLayout>
    <div class="md:p-10">
      <h1 class="text-4xl xl:text-5xl font-semibold mb-8">Login</h1>
      <a-form :model="formState" layout="vertical" @finish="onFinish">
        <a-form-item
          label="Email Address"
          name="email"
          :rules="[
            { required: true, message: 'Please input your Email Address!' },
          ]"
        >
          <a-input v-model:value="formState.email">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <button type="submit" class="btn-submit">
            <i class="bi bi-check2-circle mr-2"></i>Login
          </button>
        </a-form-item>
      </a-form>
    </div>
  </MainLayout>
</template>

<script setup>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { showNotification } from "@/utilities/notification.js";
import MainLayout from "@/components/MainLayout.vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { reactive } from "vue";

const router = useRouter();

const formState = reactive({
  email: "admin@admin.com",
  password: "123456",
});

const onFinish = (values) => {
  localStorage.setItem("userType", "");
  Cookies.set("token", "123");
  router.push({ name: "home" });
  showNotification("success", "Logged In");
};
</script>
