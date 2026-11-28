# Firestore Wallet Setup (Bangla)

এই সংস্করণে Wallet ledger Firebase project `siam-123fd`-এর Cloud Firestore-এ রাখা হবে।
Render-এর Persistent Disk বা `DATA_DIR` দরকার নেই। `DATA_DIR=/var/data` থাকলেও এই সংস্করণ Wallet-এর জন্য সেটি ব্যবহার করে না।

## Render Secret File সেটআপ

1. Firebase Console → Project settings → Service accounts খুলুন।
2. `siam-123fd` project নিশ্চিত করে `Generate new private key` চাপুন এবং JSON key ফাইলটি নিজের ডিভাইসে ডাউনলোড করুন।
3. এই JSON key কাউকে পাঠাবেন না, GitHub-এ আপলোড করবেন না, ChatGPT-তে দেবেন না।
4. Render → আপনার Web Service → Environment → Secret Files → Add file:
   - Filename: `firebase-service-account.json`
   - File contents: ডাউনলোড করা JSON key ফাইলটি আপলোড করুন।
5. Environment Variables-এ যোগ করুন:
   - Key: `FIREBASE_SERVICE_ACCOUNT_FILE`
   - Value: `/etc/secrets/firebase-service-account.json`
6. `DATA_DIR` যদি `/var/data` থাকে, সেটি মুছে দিতে পারেন; এই সংস্করণে এটি আর দরকার নেই।
7. Save, rebuild, and deploy করুন।

## গুরুত্বপূর্ণ

- Firestore-এর Production mode rules অপরিবর্তিত রাখুন। Server Admin SDK ব্যবহার করবে; Admin SDK Security Rules bypass করে এবং service-account key গোপন রাখতে হবে।
- প্রথমবার চালু হলে সার্ভার পুরোনো `wallet-ledger.json` খুঁজে পেলে সেটি Firestore-এ একবার কপি করার চেষ্টা করবে। Render Free-এর ephemeral filesystem থেকে আগে মুছে যাওয়া ডেটা ZIP থেকে ফিরিয়ে আনা সম্ভব নয়।
- এই সংস্করণে `walletData/ledger` নামে একটি Firestore document-এ deposits এবং orders রাখা হয়। Firestore-এর document size limit 1 MiB; ব্যবহারের পরিমাণ বড় হলে আলাদা collection-এ ledger records ভাগ করে নেওয়া দরকার।
- Deployment-এর পর Render Logs-এ `Firebase service account` বা `Firestore` error আছে কি না দেখুন। সফল সংযোগের আগে Wallet ব্যবহার করে নতুন জমা/অর্ডার পরীক্ষা করবেন না।
