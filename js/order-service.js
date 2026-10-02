import { db, doc, setDoc, getDoc, updateDoc, collection, addDoc, getDocs, query, where, serverTimestamp } from "./firestore-service.js";

export async function createOrder(storeId, orderData, items) {
  const orderId = 'ord_' + Date.now();
  let subtotal = 0;

  items.forEach(item => {
    subtotal += Number(item.price) * Number(item.quantity);
  });

  const deliveryFee = Number(orderData.deliveryFee || 0);
  const total = subtotal + deliveryFee;

  const fullOrder = {
    storeId,
    customerId: orderData.customerId,
    status: "pending",
    paymentStatus: "unpaid",
    paymentMethod: orderData.paymentMethod || "cash_on_delivery",
    subtotal,
    discount: 0,
    deliveryFee,
    total,
    currency: orderData.currency || "YER",
    customer: orderData.customer,
    shippingAddress: orderData.shippingAddress,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(doc(db, "stores", storeId, "orders", orderId), fullOrder);

  // حفظ Items و Status History
  for (let item of items) {
    await addDoc(collection(db, "stores", storeId, "orders", orderId, "items"), {
      productId: item.productId,
      name: item.name,
      imageUrl: item.imageUrl || "",
      price: Number(item.price),
      quantity: Number(item.quantity),
      total: Number(item.price) * Number(item.quantity)
    });
  }

  await addDoc(collection(db, "stores", storeId, "orders", orderId, "statusHistory"), {
    status: "pending",
    changedBy: orderData.customerId,
    note: "تم إنشاء الطلب بنجاح",
    createdAt: serverTimestamp()
  });

  return orderId;
}

export async function updateOrderStatus(storeId, orderId, newStatus, userId, note = "") {
  const orderRef = doc(db, "stores", storeId, "orders", orderId);
  await updateDoc(orderRef, {
    status: newStatus,
    updatedAt: serverTimestamp()
  });

  await addDoc(collection(db, "stores", storeId, "orders", orderId, "statusHistory"), {
    status: newStatus,
    changedBy: userId,
    note: note || `تم تحديث حالة الطلب إلى ${newStatus}`,
    createdAt: serverTimestamp()
  });
}
