<script setup>
import {ref } from "vue";
import {auth, db} from "../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {doc, setDoc, getDoc} from "firebase/firestore";     

const email = ref("");
const password = ref("");
const isLogin = ref(true);
const user = ref(null);

const handleSubmit = async() => {
    try{
        if(isLogin.value){
            //login
            await signInWithEmailAndPassword(auth, email.value, password.value);
            //reactive user added
            user.value = userCred.user;
            alert("Logged in!");
        }
        else{
           const userCred = await createUserWithEmailAndPassword(auth, email.value, password.value);

           //create user doc in fire
           await setDoc(doc(db, "users", userCred.user.uid), {
            email: email.value, 
            createdAt: new Date()
           });
              alert("Registered!");
              user.value = userCred.user; //updating reactive user
        } 
        }catch(err){
            alert(err.message);
    }
};
onAuthStateChanged(auth, async(currentUser) =>{
    user.value = currentUser;
    if(currentUser){
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if(userSnap.exists()){
            console.log("User Data: ", userSnap.data());
        }else{
            console.log("No such document!");
        }
    }
})

</script>

<template>
    <div>
        <h2>{{ isLogin ? "Login": "Register" }}</h2>
        <input v-model="email" type="email" placeholder="Email"/>
        <input v-model="password" type="password" placeholder="Password"/>
        <button @click="handleSubmit">{{ isLogin? "Login": "Register" }}</button>
        <p @click="isLogin = !isLogin" style="cursor: pointer;">{{ isLogin ? "New Here?Register" : "Already registered?Login" }}</p>
    </div>
</template>