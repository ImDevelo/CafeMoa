import firebase from "firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDa6DPB6A3oRKbI8zVkfPJAow81fDJjRkY",
  authDomain: "cafemoa-f9244.firebaseapp.com",
  projectId: "cafemoa-f9244",
  storageBucket: "cafemoa-f9244.appspot.com",
  messagingSenderId: "571985972680",
  appId: "1:571985972680:web:acfbb695ab86f008d004fd"
}; 

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function MapApiKey(){
  return "AIzaSyAKg9V-QSOU6d51q2eYOJL7fAG1SotIfD8";
}

export const MyDatabase = firebase;
export const dbService = firebase.firestore();
export const authService = firebase.auth();
export const storageService = firebase.storage();
export const GoogleMapApiKey = MapApiKey();
export const asyncStorage = AsyncStorage;

