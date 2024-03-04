<script setup>
import { base } from "@/config.js";
defineProps(["modalTitle", "imgPath"]);
</script>
<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center transition-opacity duration-300"
  >
    <div class="p-6 rounded-lg shadow-md xl:w-1/3 lg:w-1/2 w-full">
      <div class="flex justify-center items-center mb-4">
        <img :src="`${base}src/assets/images/${imgPath}`" class="w-10" alt="" />
        <h2 class="text-lg font-semibold text-white ml-3 capitalize">
          {{ modalTitle }}
        </h2>
      </div>
      <div class="bg-[#D9D9D9] rounded-md p-5 min-h-72">
        <div class="flex justify-between">
          <div class="grow"><slot></slot></div>
          <div class="text-right">
            <button
              class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              @click="$emit('button-clicked')"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="text-center mt-5">
        <button
          type="submit"
          class="bg-[#707070] border-[#707070] text-white px-10 py-1 uppercase font-medium tracking-wide rounded-md border hover:bg-transparent hover:border-[#fff]"
          @click="$emit('button-clicked')"
        >
          <i class="bi bi-check2-circle mr-2"></i>Submit
        </button>
      </div>
    </div>
  </div>
</template>
