<template>
  <MainLayout>
    <div class="md:p-10">
      <h1 class="text-4xl xl:text-5xl font-semibold mb-8">Login</h1>
      <a-form :model="formState" layout="vertical" @finish="onFinish(formState)">
        <a-form-item label="Email Address" name="username" :rules="[
        { required: true, message: 'Please input your Email Address!' },
      ]">
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="Password" name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]">
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
          <p class="mt-3">
            New Here?
            <router-link :to="{ name: 'register' }" class="text-red-600">Register</router-link>
          </p>
        </a-form-item>
      </a-form>
      <!-- <button v-on:click="testMethod()">KJNFGSJKLHI SGHBKSDFBJKHG
      </button> -->
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
  username: "",
  password: "",
});

const onFinish = async(data) => {
  console.log(data);


  await axios.post('https://va.mis.digital/login', data)
  .then(function (response) {
    console.log(response, 'SUCCESS');
    Cookies.set("token",response?.data?.access_token)
    router.push({name: 'home'})
  })
  .catch(function (error) {
    console.log(error, 'ERROR');
  });
};


</script>
