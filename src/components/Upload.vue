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
        <p class="mt-3">Write a text message</p>
      </button>
    </div>
    <!-- single -->
    <div class="border p-3 text-center rounded-md mb-3">
      <!-- <input type="file" id="voice-upload" class="hidden" accept="audio/*" />
      <label for="voice-upload">
        <img
          src="@/assets/images/file.png"
          alt="img"
          class="inline-block h-32 w-32"
        />
        <p class="mt-3">Voice upload</p>
      </label> -->
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
      <!-- <input type="file" id="file-upload" class="hidden" />
      <label for="file-upload">
        <img
          src="@/assets/images/text.png"
          alt="img"
          class="inline-block h-32 w-32"
        />
        <p class="mt-3">File upload</p>
      </label> -->
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
    >lala</Modal
  >
  <!-- Modal Audio -->
  <Modal
    imgPath="file.png"
    modalTitle="audio"
    v-if="isAudioModal"
    @button-clicked="isAudioModal = false"
    >audio</Modal
  >
  <!-- Modal File -->
  <Modal
    imgPath="text.png"
    modalTitle="isFileModal"
    v-if="isFileModal"
    @button-clicked="isFileModal = false"
    >isFileModal</Modal
  >
</template>

<script setup>
import { ref } from "vue";
import Modal from "./Modal.vue";
const isTextModal = ref(false);
const isAudioModal = ref(false);
const isFileModal = ref(false);
</script>
