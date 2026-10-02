# KRISTA Commerce

منصة تجارة إلكترونية متعددة المتاجر مبنية باستخدام **HTML5, CSS3, JavaScript ES Modules** و **Firebase (Auth, Firestore, Hosting)**.

## متطلبات التشغيل
1. حساب على [Firebase Console](https://console.firebase.google.com/).
2. تثبيت [Node.js](https://nodejs.org/) و Firebase CLI.

## خطوات النشر والتشغيل
1. أنشئ مشروعاً جديداً في Firebase.
2. فعّل **Authentication** (بريد إلكتروني وكلمة مرور).
3. فعّل **Cloud Firestore**.
4. حدد بيانات التكوين في ملف `js/firebaseConfig.js`.
5. ثبت أداة Firebase CLI محلياً عبر الأوامر:
   ```bash
   npm install -g firebase-tools
   firebase login
