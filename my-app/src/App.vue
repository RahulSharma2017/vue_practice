<script setup>
import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Auth from "./components/AuthPractice.vue";
import DP from "./components/DP.vue";

const user = ref(null);

// Watch auth state
onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;
});
</script>

<template>
  <div>
    <h1>My Firebase App</h1>
    <Auth v-if="!user" />
    <DP v-else />
  </div>
</template>