# Telegram ব্যক্তিগত চ্যাটে অর্ডার নোটিফিকেশন

এই আপডেটে অ্যাডমিন প্যানেল থেকে কোনো অর্ডার প্রথমবার `Processing` করলে Render-এর Telegram bot ব্যবহার করে অ্যাডমিনের ব্যক্তিগত Telegram চ্যাটে নোটিফিকেশন পাঠানো হবে। সফলভাবে পাঠানো হলে একই অর্ডারের জন্য পুনরায় নোটিফিকেশন পাঠানো হবে না।

Render → Environment-এ এই দুটি variable থাকতে হবে:

- `TELEGRAM_BOT_TOKEN` = BotFather থেকে নেওয়া বট টোকেন
- `TELEGRAM_CHAT_ID` = `8816006035`

বটকে আগে Telegram-এ ব্যক্তিগতভাবে `/start` পাঠিয়ে চালু করতে হবে। টোকেন শুধু Render-এর Environment-এ রাখবেন; ওয়েবসাইটের HTML/JavaScript-এ বসাবেন না।

নতুন ZIP আপলোড করার পর Render-এ Deploy সম্পূর্ণ হতে দিন। তারপর Admin Panel থেকে একটি অর্ডার `Processing` করে পরীক্ষা করুন।
