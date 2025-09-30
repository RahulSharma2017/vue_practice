<script setup>
import { ref, onMounted } from "vue";
import { db, auth } from "../firebase";
import { doc, setDoc, updateDoc, getDoc, onSnapshot} from "firebase/firestore";
import { useRouter } from "vue-router";

const userData = ref({});
const router = useRouter();
const newName = ref("");


onMounted(() => {
    if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid)
        onSnapshot(userRef, (docSnap) => {
            if(docSnap.exists()){
                //docSnap is a fucntion gotta use ()
                userData.value = docSnap.data()
            }else{
                console.log("No such document!");
            }          
        }
        )
    }else { router.push("/")
    }
});
const updateName = async ()=> {
    if(auth.currentUser){
        const userRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(userRef,{
            name: newName.value
        })
        newName.value = "";
    }
    router.push("/scheduler");
}
</script>

<template>
    <div>
        <h2>Hey {{userData.email}}</h2>
        <h3 v-if="userData.createdAt">Created at: {{userData.createdAt.toDate().toDateString()}}</h3>
        <input v-model="newName" type="name" placeholder="Enter your Name"/>
        <button @click="updateName">Add</button>
    </div>
</template>