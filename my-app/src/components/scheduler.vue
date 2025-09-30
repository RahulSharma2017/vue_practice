<script setup>
import { ref, onMounted } from "vue";
import { auth, db } from "../firebase";
import { useRouter } from "vue-router";
import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

// --------- State variables ---------
const title = ref("");
const date = ref("");
const events = ref([]);
const router = useRouter();

// reactive ref for schedules collection
const schedulesRef = ref(null);

// NEW: Flag to indicate Firebase is ready
const ready = ref(false);

// --------- Add Schedule function ---------
const addSchedule = async () => {
  // Early exit if inputs are empty
  if (!title.value || !date.value) return;

  // NEW: check ready flag instead of schedulesRef directly
  if (!ready.value) return;

  try {
    await addDoc(schedulesRef.value, {
      title: title.value,
      date: date.value,
      createdAt: new Date(),
    });

    title.value = "";
    date.value = "";
  } catch (err) {
    console.error("Error adding schedule:", err);
    alert("Failed to add schedule: " + err.message);
  }
};

// --------- Firebase Auth Listener ---------
onMounted(() => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      router.push("/");
      return;
    }

    // User is logged in → initialize schedulesRef
    schedulesRef.value = collection(db, "users", user.uid, "schedules");

    const q = query(schedulesRef.value, orderBy("date"));
    onSnapshot(q, (snapshot) => {
      events.value = snapshot.docs.map((doc) => ({
        title: doc.data().title,
        start: doc.data().date, // FullCalendar expects 'start'
      }));
    });

    // NEW: mark ready so form and calendar can safely render
    ready.value = true;
  });
});
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">📅 Your Schedule</h2>

    <!-- Add Schedule Form -->
    <form @submit.prevent="addSchedule" class="space-y-3 mb-6">
      <input
        v-model="title"
        placeholder="Task"
        class="border p-2 w-full rounded"
        required
        :disabled="!ready"   
      />
      <input
        type="date"
        v-model="date"
        class="border p-2 w-full rounded"
        required
        :disabled="!ready"   <!-- NEW: disable until ready -->
      />
      <button
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded"
        :disabled="!ready"   <!-- NEW: disable until ready -->
      >
        Add
      </button>
    </form>

    <!-- Calendar -->
    <FullCalendar
      v-if="ready"             
      :plugins="[dayGridPlugin]"
      initialView="dayGridMonth"
      :events="events"
    />
  </div>
</template>