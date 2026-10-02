import { db, doc, setDoc, getDoc, updateDoc, collection, addDoc, getDocs, query, where, serverTimestamp } from "./firestore-service.js";

export async function createStore(ownerId, storeData) {
  const storeId = storeData.slug || 'store_' + Date.now();
  const fullData = {
    ...storeData,
    ownerId,
    status: "active",
    isPublic: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  await setDoc(doc(db, "stores", storeId), fullData);
  
  // تعيين المالك كعضو بصلاحيات كاملة
  await setDoc(doc(db, "stores", storeId, "members", ownerId), {
    userId: ownerId,
    role: "owner",
    permissions: { products: true, orders: true, inventory: true, customers: true, settings: true },
    status: "active",
    createdAt: serverTimestamp()
  });

  return storeId;
}

export async function getStore(storeId) {
  const docSnap = await getDoc(doc(db, "stores", storeId));
  return docSnap.exists() ? docSnap.data() : null;
}

export async function createCategory(storeId, categoryName) {
  const catSlug = categoryName.trim().toLowerCase().replace(/\s+/g, '-');
  const catRef = doc(db, "stores", storeId, "categories", catSlug);
  await setDoc(catRef, {
    name: categoryName,
    slug: catSlug,
    createdAt: serverTimestamp()
  });
  return catSlug;
}
