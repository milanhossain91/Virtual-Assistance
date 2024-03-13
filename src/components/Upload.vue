<template>
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
  <!-- Modal File -->
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
        class="hidden"
        style="display:none"
        accept="image/jpeg"
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
</template>

<script setup>
import { ref } from "vue";
import { reactive } from 'vue';
import Modal from "./Modal.vue";

const isTextModal = ref(false);
const isAudioModal = ref(false);
const isFileModal = ref(false);
const handleVoiceFileChange = (event) => {
  const selectedFile = event.target.files[0];
  // Do something with the selected file, for example, update formState.voice
  formState.voice = selectedFile;
};

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  // Do something with the selected file, for example, update formState.file
  formState.file = selectedFile;
};
</script>
