import { db } from "./auth.js";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, query, where, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

export { db, collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc, query, where, orderBy, serverTimestamp };
