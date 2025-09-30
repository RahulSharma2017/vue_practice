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
        if(isLogin.value){
        const userCred = await signInWithEmailAndPassword(auth, email.value, password.value);
        alert("Logged In!")
        console.log(router.getRoutes())
        router.push("/Dashboard")
        }
        else{
            const userCred = await createUserWithEmailAndPassword(auth, email.value, password.value);
            await setDoc(doc(db,"users", userCred.user.uid) ,{
                email : email.value,
                createdAt: new Date()
            })
            alert("New Account created!")
            console.log(router.getRoutes())
            router.push("/Dashboard")

        }
    } catch(err){
        alert(err.message);
    }
};
const logout = async () => {
   signOut(userCred);
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
    <hr>
    <button @click="logout">logout</button>
    </hr>
</template>
