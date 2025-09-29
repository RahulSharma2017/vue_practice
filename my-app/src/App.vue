<script setup>
import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./components/login.vue";


const user = ref(null);

</script>

<template>
  <div>
    <h1>My Firebase App</h1>
    <Login />
 
  </div>
</template>