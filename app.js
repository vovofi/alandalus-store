import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// إعدادات قاعدة بيانات Firebase (قم بربطها بمشروعك المجاني لاحقاً)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.registerUser = function() {
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            document.getElementById('user-status').innerText = "تم إنشاء الحساب وتسجيل الدخول بنجاح!";
        })
        .catch((error) => {
            alert("خطأ في التسجيل: " + error.message);
        });
}

window.loginUser = function() {
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            document.getElementById('user-status').innerText = "مرحباً بك، تم تسجيل الدخول بنجاح!";
        })
        .catch((error) => {
            alert("خطأ في الدخول، تأكد من البيانات: " + error.message);
        });
}

const ADMIN_PASSWORD = "1234"; // كلمة مرور لوحة التحكم الخاصة بك

let products = JSON.parse(localStorage.getItem('grocery_products')) || [
    { name: "شاحن جوال سريع", category: "electronics", image: "https://via.placeholder.com/250x180?text=Electronics", desc: "شاحن أصلي متعدد المنافذ", price: "15,000 ريال" },
    { name: "عسل طبيعي أصلي", category: "honey", image: "https://via.placeholder.com/250x180?text=Honey", desc: "عسل جبال طبيعي نقي", price: "30,000 ريال" }
];

let currentCategory = 'all';

window.checkAdmin = function() {
    let pass = prompt("الرجاء إدخال كلمة مرور لوحة التحكم الخاصة بالمدير:");
    if (pass === ADMIN_PASSWORD) {
        const panel = document.getElementById('admin-panel');
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    } else if (pass !== null) {
        alert("كلمة المرور غير صحيحة!");
    }
}

window.toggleAuthModal = function() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

window.addProduct = function() {
    const name = document.getElementById('p-name').value;
    const image = document.getElementById('p-image').value || 'https://via.placeholder.com/250x180?text=No+Image';
    const desc = document.getElementById('p-desc').value;
    const price = document.getElementById('p-price').value;
    const category = document.getElementById('p-category').value;

    if(!name || !price) {
        alert('الرجاء إدخال اسم المنتج والسعر على الأقل!');
        return;
    }

    products.push({ name, image, desc, price, category });
    localStorage.setItem('grocery_products', JSON.stringify(products));

    document.getElementById('p-name').value = '';
    document.getElementById('p-image').value = '';
    document.getElementById('p-desc').value = '';
    document.getElementById('p-price').value = '';

    alert('تم إضافة المنتج بنجاح!');
    renderProducts();
}

window.filterCategory = function(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts();
}

function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    const filtered = currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory);

    if(filtered.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">لا توجد منتجات في هذا القسم حالياً.</p>';
        return;
    }

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <div class="product-info">
                <div>
                    <h3>${p.name}</h3>
                    <p>${p.desc}</p>
                </div>
                <div class="price">${p.price}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

renderProducts();
