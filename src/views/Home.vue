<template>
  <div class="w-[80%] mx-auto h-full">
    <div class="flex items-center h-[85%]">
      <ProviderSelect :items="providers" v-model="selectedModel" />
    </div>
    <div class="flex items-center h-[15%]">
      <MessageInput
        @create="createConversation"
        :disabled="selectedModel === ''"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProviderProps } from "../types";
import ProviderSelect from "../components/ProviderSelect.vue";
import MessageInput from "../components/MessageInput.vue";
import { ref } from "vue";
import { providers } from "../testData";


const selectedModel = ref("");

function createConversation(question: string, imagePath?: string) {
  console.log("question", question);
  console.log("imagePath", imagePath);
}
</script>

<style scoped></style>
