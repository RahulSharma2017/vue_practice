<script setup>
import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Auth from "./components/auth.vue";


const user = ref(null);

</script>

<template>
  <div>
    <h1>My Firebase App</h1>
    <Auth />
 
  </div>
</template>