<script setup>
import {ref} from "vue";
import {auth, db} from "../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const isLogin = ref(true);
const router = useRouter();

const handleLogin = async () => {
    try{
        if(isLogin){
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        alert("Logged In!")
        router.push("/Dashboard")
        }
        else{
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db,"users", userCred.user.uid) ,{
                email : email.value,
                createdAt: new Date()
            })
            alert("New Account created!")
            router.push("/Dashboard")

        }
    } catch(err){
        alert(err.message);
    }
}
</script>

<template>
    <div>
        <h2>{{isLogin ? "Login": "Register" }}</h2>
        <input v-model="email" type="email" placeholder="Enter your Email" />
        <input v-model="password" type="password" placeholder="Enter Password"/>
        <button @click="handleLogin">{{isLogin ? "Login": "Register"}}</button>
        <div>
            <p @click="isLogin = !isLogin">{{isLogin ? "NewHere? Register": "Bitch login"}}</p>
        </div>
    </div>
</template>
