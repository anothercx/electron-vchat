<template>
  <div class="flex items-center justify-between h-screen">
    <div class="w-75 bg-gray-200 h-full border-r flex flex-col">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :items="items" />
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <button
          class="shadow-sm inline-flex items-center justify-center bg-green-700 text-white hover:bg-green-700/90 border border-green-700 h-8 py-2 px-3.75 text-sm rounded-sm"
        >
          <Icon icon="radix-icons:chat-bubble" class="mr-2"></Icon>
          新建聊天
        </button>
        <button
          class="shadow-sm inline-flex items-center justify-center bg-green-50 text-green-700 hover:text-white hover:bg-green-700/90 border border-green-700 h-8 py-2 px-3.75 text-sm rounded-sm"
        >
          <Icon icon="radix-icons:gear" class="mr-2"></Icon>
          应用设置
        </button>
      </div>
    </div>
    <div class="h-full flex-1 flex items-center">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ConversationProps, ProviderProps } from "./types";
import ProviderSelect from "./components/ProviderSelect.vue";
import ConversationList from "./components/ConversationList.vue";
import MessageInput from "./components/MessageInput.vue";
import { ref } from "vue";


const items: ConversationProps[] = [
  {
    id: 1,
    title: "什么是光合作用",
    selectedModel: "GPT-3.5-Turbo",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
    providerId: 0,
  },
  {
    id: 2,
    title: "什么是光合作用",
    selectedModel: "GPT-3.5-Turbo",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
    providerId: 0,
  },
  {
    id: 3,
    title: "什么是光合作用",
    selectedModel: "GPT-3.5-Turbo",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
    providerId: 0,
  },
  {
    id: 4,
    title: "什么是光合作用,你的说法是正确的 光合作用就是光合作用",
    selectedModel: "GPT-3.5-Turbo",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
    providerId: 0,
  },
  {
    id: 5,
    title: "什么是光合作用",
    selectedModel: "GPT-3.5-Turbo",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
    providerId: 0,
  },
  {
    id: 6,
    title: "什么是光合作用",
    selectedModel: "GPT-3.5-Turbo",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
    providerId: 0,
  },
  {
    id: 7,
    title: "什么是光合作用",
    selectedModel: "GPT-3.5-Turbo",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
    providerId: 0,
  },
  {
    id: 8,
    title: "什么是光合作用,你的说法是正确的 光合作用就是光合作用",
    selectedModel: "GPT-3.5-Turbo",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
    providerId: 0,
  },
];

const providers: ProviderProps[] = [
  {
    id: 1,
    name: "qianfan",
    title: "百度千帆",
    desc: "文心一言 百度出品的大模型",
    models: ["ERNIE-4.0-8K", "ERNIE-3.5-8K", "ERNIE-Speed-128K"],
    avatar:
      "https://aip-static.cdn.bcebos.com/landing/product/ernie-bote321e5.png",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
  },
  {
    id: 2,
    name: "dashscope",
    title: "阿里灵积",
    desc: "通义千问",
    // https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.5bf41507xgULX5#b148acc634pfc
    models: ["qwen-turbo", "qwen-plus", "qwen-max", "qwen-vl-plus"],
    avatar:
      "https://qph.cf2.poecdn.net/main-thumb-pb-4160791-200-qlqunomdvkyitpedtghnhsgjlutapgfl.jpeg",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
  },
  {
    id: 3,
    name: "deepseek",
    title: "DeepSeek",
    desc: "DeepSeek",
    // https://api-docs.deepseek.com/zh-cn/
    models: ["deepseek-chat"],
    avatar:
      "https://qph.cf2.poecdn.net/main-thumb-pb-4981273-200-phhqenmywlkiybehuaqvsxpfekviajex.jpeg",
    createdAt: "2024-12-27",
    updatedAt: "2024-12-27",
  },
];

const selectedModel = ref("");

function createConversation(question: string, imagePath?: string) {
  console.log('question',question);
  console.log('imagePath',imagePath);
  
  
}
</script>

<style scoped></style>
