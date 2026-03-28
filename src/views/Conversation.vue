<template>
  <div
    class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between"
    v-if="convsersation"
  >
    <h3 class="font-semibold text-gray-900">{{ convsersation.title }}</h3>
    <span class="text-sm text-gray-500">{{ convsersation.updatedAt }}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessage" ref="messageListRef" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import { ConversationProps, MessageProps } from "../types";

import { messages, conversations } from "../testData";

import MessageInput from "../components/MessageInput.vue";
import MessageList from "../components/MessageList.vue";

const route = useRoute();

const filteredMessage = ref<MessageProps[]>([]);
const convsersation = ref<ConversationProps | null>(null);

watch(
  () => route.params.id,
  (newId: string) => {
    const conversationId = parseInt(newId);
    filteredMessage.value = messages.filter(
      (message) => message.conversationId === conversationId,
    );
    convsersation.value = conversations.find(
      (conversation) => conversation.id === conversationId,
    );
  },
);
</script>

<style scoped></style>
