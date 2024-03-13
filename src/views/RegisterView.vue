<template>
  <MainLayout>
    <div class="md:p-10">
      <h1 class="text-4xl xl:text-5xl font-semibold mb-8">Registration</h1>
      <a-form :model="formState" layout="vertical" @finish="registrationMethod">
        <a-form-item
          label="User Name"
          name="username"
          :rules="[
            { required: true, message: 'Please input your User Name!' },
          ]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
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
          <button v-on:click="registrationMethod()" class="btn-submit"><i class="bi bi-check2-circle mr-2"></i>Registration</button>
          <p class="mt-3">
            Already have an account?
            <router-link :to="{ name: 'login' }" class="text-red-600"
              >Login</router-link
            >
          </p>
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
import axios from 'axios';
import qs from 'qs';
const router = useRouter();

const formState = reactive({
  email: "",
  password: "",
  username: "",
});

// Define your method
const registrationMethod = () => {
  // Convert form data to x-www-form-urlencoded format
  const formData = qs.stringify(formState.value);

  axios.post('https://va.mis.digital/register', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(function (response) {
      console.log(response, 'SUCCESS');
    })
    .catch(function (error) {
      console.log(error, 'ERROR');
    });
};
// const onFinish = (values) => {
//   localStorage.setItem("userType", "");
//   Cookies.set("token", "123");
//   router.push({ name: "home" });
//   showNotification("success", "Logged In");
// };
</script>
