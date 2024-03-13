<script setup>
import { ref, computed, reactive } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'vue-router';

import MainLayout from "@/components/MainLayout.vue";
import Modal from "@/components/Modal.vue";

const router = useRouter();

const userType = ref(localStorage.getItem("userType"));

const userTypeLabel = computed(() => {
  return userType.value === "admin"
    ? "Virtual Assistant Admin Panel"
    : "Virtual Assistant Input Panel";
});

const isAdmin = computed(() => {
  return userType.value === "admin";
});

const isTextModal = ref(false);
const isAudioModal = ref(false);
const isFileModal = ref(false);

const formState = reactive({
  text: "",
  voice: null,
  file: null,
  feedback: ""
});

const handleVoiceFileChange = (event) => {
  formState.voice = event.target.files[0];
};

const handleFileChange = (event) => {
  formState.file = event.target.files[0];
};
const onFinish = async () => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      console.error("Token not found");
      return;
    }

    const formData = new FormData();
    formData.append("text", formState.text);
    formData.append("voice", formState.voice); // Directly append the file
    formData.append("file", formState.file);
    formData.append("feedback", formState.feedback);

    const response = await axios.post('https://va.mis.digital/virtual_assistant', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    Cookies.set("token", response?.data?.access_token);
    router.push({ name: 'home' });
  } catch (error) {
    console.error("Error during request", error);
  }
};


</script>

<template>
  <MainLayout :title="userTypeLabel">
    <template v-if="!isAdmin">
      <a-form :model="formState" layout="vertical" @finish="onFinish">
        <!-- ... your existing code ... -->

        <div class="sm:grid grid-cols-3 gap-4">
    <!-- single -->
    <div class="border p-3 text-center rounded-md mb-3">
      <button
        type="button"
        class="block text-center w-full"
        @click="isTextModal = true"
      >
        <img
          src="@/assets/images/audio.png"
          alt="img"
          class="inline-block h-32 w-32"
        />
        <p class="mt-3">Write a text message</p>
      </button>
    </div>
    <!-- single -->
    <div class="border p-3 text-center rounded-md mb-3">
      <button
        type="button"
        class="block text-center w-full"
        @click="isAudioModal = true"
      >
        <img
          src="@/assets/images/file.png"
          alt="img"
          class="inline-block h-32 w-32"
        />
        <p class="mt-3">Voice upload</p>
      </button>
    </div>
    <!-- single -->
    <div class="border p-3 text-center rounded-md mb-3">
      <button
        type="button"
        class="block text-center w-full"
        @click="isFileModal = true"
      >
        <img
          src="@/assets/images/text.png"
          alt="img"
          class="inline-block h-32 w-32"
        />
        <p class="mt-3">File upload</p>
      </button>
    </div>
    <!-- /single -->
  </div>
    <!-- Modal Text -->

        <!-- Modal Text -->
        <Modal
          imgPath="audio.png"
          modalTitle="hello"
          v-if="isTextModal"
          @button-clicked="isTextModal = false"
        >
        <br />
        <p class="text-1xl xl:text-1xl font-semibold mb-2">Question:</p>
        <a-input
          placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry ?"
          readonly
        ></a-input>
        <p class="text-1xl xl:text-1xl font-semibold mb-2">Answer:</p>
        <a-input v-model:value="formState.text" placeholder="Answer"></a-input>
        </Modal>

        <!-- Modal Audio -->
        <Modal
          imgPath="file.png"
          modalTitle="audio"
          v-if="isAudioModal"
          @button-clicked="isAudioModal = false"
        >
          <!-- ... your existing code ... -->
          <div class="text-center">
            <input
              type="file"
              id="voice-upload"
              style="display:none"
              accept="audio/*"
              @change="handleVoiceFileChange"
            />
          <label for="voice-upload">
            <img
              src="@/assets/images/file.png"
              alt="img"
              class="inline-block h-32 w-32"
            />
            <p class="mt-3">Voice upload</p>
          </label>
        </div>
        </Modal>

       
        <Modal
          imgPath="text.png"
          modalTitle="isFileModal"
          v-if="isFileModal"
          @button-clicked="isFileModal = false"
        >
        <div class="text-center">
        <input
             type="file"
              id="file-upload"
              style="display:none"
              @change="handleFileChange"
            />
        <label for="file-upload">
          <img
            src="@/assets/images/text.png"
            alt="img"
            class="inline-block h-32 w-32"
          />
          <p class="mt-3">File upload</p>
        </label>
      </div>
        </Modal>

        <div class="feedback mt-5">
          <h5 class="mb-3 text-lg">Feedback</h5>
          <textarea 
            v-model="formState.feedback"
            class="w-full px-3 py-2 border rounded-md bg-[#f1f1f1] focus:outline-none focus:ring-1 focus:ring-slate-500"
          ></textarea>
        </div>
        
        <div class="text-center mt-10">
          <button type="submit" class="btn-submit">
            <i class="bi bi-check2-circle mr-2"></i>Submit
          </button>
        </div>
      </a-form>
    </template>
  </MainLayout>
</template>
