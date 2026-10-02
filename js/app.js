import { auth, loginUser, registerUser, logoutUser, getUserProfile } from "./auth.js";
import { getStore, createStore, createCategory } from "./store-service.js";
import { createProduct, getStoreProducts } from "./product-service.js";
import { createOrder, updateOrderStatus } from "./order-service.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("KRISTA Commerce Initialized successfully.");
  
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const profile = await getUserProfile(user.uid);
      console.log("Logged in user:", profile);
    } else {
      console.log("No user logged in.");
    }
  });
});
