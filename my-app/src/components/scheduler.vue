<template>
  <div class="scheduler">
    <h2 class="text-2xl font-bold mb-4">📅 Your Schedule</h2>

    <!-- Add Schedule Form -->
    <form @submit.prevent="addSchedule" class="space-y-3 mb-6">
      <input v-model="title" placeholder="Task (e.g. Spray pesticide A)" class="border p-2 w-full rounded" required />
      <input type="date" v-model="date" class="border p-2 w-full rounded" required />
      <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Add</button>
    </form>

    <!-- Calendar -->
    <FullCalendar
      defaultView="dayGridMonth"
      :plugins="[ dayGridPlugin ]"
      :events="events"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
  components: { FullCalendar },
  setup() {
    const title = ref("");
    const date = ref("");
    const events = ref([]);

    const auth = getAuth();
    const user = auth.currentUser;

    const schedulesRef = collection(db, "users", user.uid, "schedules");

    const addSchedule = async () => {
      if (!title.value || !date.value) return;
      await addDoc(schedulesRef, {
        title: title.value,
        date: date.value,
        createdAt: new Date(),
      });
      title.value = "";
      date.value = "";
    };

    onMounted(() => {
      const q = query(schedulesRef, orderBy("date"));
      onSnapshot(q, (snapshot) => {
        events.value = snapshot.docs.map((doc) => ({
          title: doc.data().title,
          start: doc.data().date,
        }));
      });
    });

    return { title, date, addSchedule, events, dayGridPlugin };
  },
};
</script>

