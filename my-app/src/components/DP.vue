// @ts-nocheck
<script setup>
import { ref, onMounted} from "vue";
import { auth, db} from "../firebase";
import { doc, onSnapshot, updateDoc} from "firebase/firestore";
import {signOut} from "firebase/auth"
import Scheduler from "./scheduler.vue";

const userData = ref({});
const newName = ref("");
//const newDob = ref("");

onMounted(()=>{
    if(auth.currentUser){
        const userRef = doc(db, "users", auth.currentUser.uid);
        onSnapshot( userRef, (docSnap) =>{
            if(docSnap.exists()){
                userData.value = docSnap.data();      
            } else{
                console.log("No such document!");
            }
        })
    }
})

const updateName = async()=>{
    if(auth.currentUser){
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
            name : newName.value
        })
        newName.value = "";

    }
}
const logout = async () => {
  await signOut(auth); // this logs the user out
  alert("You have been logged out");
};
</script>

<template>
    <div>
        <h1>Welcome,{{userData.email}}</h1>
        <p>Joined: {{userData.createdAt?.toDate().toDateString()}}</p>
        <p>Name:{{userData.name || "Not Set"}}</p>
        <input v-model="newName" type="Name" placeholder="Enter Name"/>
        <button @click="updateName">Update Name</button>
        <Scheduler />
        <hr>
       <div><button @click="logout">Logout</button></div> 
    </div>
</template>