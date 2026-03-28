<template>
  <div class="flex items-center justify-between h-screen">
    <div class="w-75 bg-gray-200 h-full border-r flex flex-col">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :items="conversations" />
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <RouterLink to="/">
          <Button icon-name="radix-icons:chat-bubble" class="w-full">
            新建聊天
          </Button>
        </RouterLink>

        <RouterLink to="/settings">
          <Button icon-name="radix-icons:gear" plain class="w-full">
            应用设置
          </Button>
        </RouterLink>
      </div>
    </div>
    <div class="h-full flex-1">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import ConversationList from "./components/ConversationList.vue";
import Button from "./components/Button.vue";

import { RouterView, RouterLink } from "vue-router";
import { conversations } from "./testData";
</script>

<style scoped></style>
