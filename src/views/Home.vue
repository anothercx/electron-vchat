<template>
  <div class="w-[80%] mx-auto h-full">
    <div class="flex items-center h-[85%]">
      <ProviderSelect :items="providers" v-model="currentProvider" />
    </div>
    <div class="flex items-center h-[15%]">
      <MessageInput
        @create="createConversation"
        :disabled="currentProvider === ''"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import ProviderSelect from "../components/ProviderSelect.vue";
import MessageInput from "../components/MessageInput.vue";

import { ProviderProps } from "../types";
import { db } from "../db";

const router = useRouter();

const providers = ref<ProviderProps[]>([]);

const currentProvider = ref("");

onMounted(async () => {
  providers.value = await db.providers.toArray();
});

const modelInfo = computed(() => {
  const [providerId, selectedModel] = currentProvider.value.split("/");
  return {
    providerId: parseInt(providerId),
    selectedModel,
  };
});

const createConversation = async (question: string, imagePath?: string) => {
  const { providerId, selectedModel } = modelInfo.value;
  const currentDate = new Date().toISOString();

  const conversationId = await db.conversations.add({
    title: question,
    providerId,
    selectedModel,
    createdAt: currentDate,
    updatedAt: currentDate,
  });

  const newMessageId = await db.messages.add({
    content: question,
    conversationId,
    createdAt: currentDate,
    updatedAt: currentDate,
    type: "question",
  });
  router.push({
    path: `/conversation/${conversationId}`,
    query: {
      init: newMessageId,
    },
  });
};
</script>

<style scoped></style>
