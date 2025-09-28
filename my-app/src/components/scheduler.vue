<script setup>
import {ref , onMounted} from "vue";
import {auth, db} from "../firebase";
import {useRouter} from "vue-router";
import {addDoc, collection, query,  onSnapshot, orderBy} from "firebase/firestore";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

const title = ref("");
const date = ref("");
const events = ref([])
const router = useRouter();

const addSchedule = async() => {
    if(!title.value || !date.value) return;
    else{
        await addDoc(schedulesRef, {
            title: title.value,
            date: date.value,
            createdAt: new Date(),
        })
        title.value = "";
        date.value = "";
    }
}

onMounted(() =>{
    if(!auth.currentUser){
        router.push("/");
        return;
    } 
    schedulesRef = collection(db, "users", auth.currentUser.uid, "schedules");

    const q = query(schedulesRef, orderBy("date"));
    //Snapshot is for collection multiple docs and docSnap is for a single doc
    onSnapshot(q,(snapshot)=>{
        events.value= snapshot.docs.map((doc)=>{
            title = doc.data().title,
            date = doc.data().date
        }
    )
    })
})
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
      />
      <input
        type="date"
        v-model="date"
        class="border p-2 w-full rounded"
        required
      />
      <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>

    <!-- Calendar -->
    <FullCalendar
      defaultView="dayGridMonth"
      :plugins="[dayGridPlugin]"
      :events="events"
    />
  </div>
</template>