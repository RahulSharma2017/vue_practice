<script setup>
import { ref, onMounted } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const user = ref(null);

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u;
  });
});
</script>

<template>
  <div id="app">
    <h1>My Firebase App</h1>
    <p v-if="user">Logged in as: {{ user.email }}</p>
    <router-view />
  </div>
</template>