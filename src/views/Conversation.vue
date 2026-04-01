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
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { ConversationProps, MessageProps, MessageStatus } from "../types";

import MessageInput from "../components/MessageInput.vue";
import MessageList from "../components/MessageList.vue";

import { db } from "../db";

const route = useRoute();
const conversationId = parseInt(route.params.id as string); //挂载时的对话id
const initMessageId = parseInt(route.query.init as string); //初始化时消息id

let lastQuestion = "";

const filteredMessage = ref<MessageProps[]>([]);
const convsersation = ref<ConversationProps | null>(null);

const creatingInitialMessage = async () => {
  const createdData: Omit<MessageProps, "id"> = {
    content: "",
    conversationId: conversationId,
    type: "answer",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "loading",
  };

  const newMessageId = await db.messages.add(createdData);

  filteredMessage.value.push({
    ...createdData,
    id: newMessageId,
  });

  if (convsersation.value) {
    const provider = await db.providers
      .where({ id: convsersation.value.providerId })
      .first();

    if (provider) {
      window.electronAPI.startChat({
        messageId: newMessageId,
        providerName: provider.name,
        selectedModel: convsersation.value.selectedModel,
        content: lastQuestion,
      });
    }
  }
};

watch(
  () => route.params.id,
  async () => {
    const newConversationId = parseInt(route.params.id as string);

    convsersation.value = await db.conversations
      .where({ id: newConversationId })
      .first();
    filteredMessage.value = await db.messages
      .where({ conversationId: newConversationId })
      .toArray();
  },
);

onMounted(async () => {
  convsersation.value = await db.conversations
    .where({ id: conversationId })
    .first();
  filteredMessage.value = await db.messages.where({ conversationId }).toArray();
  if (initMessageId) {
    const lastMessage = await db.messages.where({ conversationId }).last();
    lastQuestion = lastMessage?.content || "";
    await creatingInitialMessage();
  }

  window.electronAPI.onUpdateMessage(async (streamData) => {
    const { messageId, data } = streamData;
    const currentMessage = await db.messages.where({ id: messageId }).first();
    if (currentMessage) {
      const updatedData = {
        content: currentMessage.content + data.result,
        status: (data.is_end ? "finished" : "streaming") as MessageStatus,
        updatedAt: new Date().toISOString(),
      };
      await db.messages.update(messageId, updatedData);
      const index = filteredMessage.value.findIndex(
        (message) => message.id === messageId,
      );
      if (index !== -1) {
        filteredMessage.value[index] = { ...currentMessage, ...updatedData };
      }
    }
  });
});
</script>

<style scoped></style>
