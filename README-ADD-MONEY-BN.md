# SIAM TOPUP BD — Add Money আপডেট

## কী যোগ হয়েছে
- Firebase Authentication ID token সার্ভারে যাচাই করে Add Money আবেদন নেওয়া হয়।
- ১০–৫০,০০০ টাকার মধ্যে আবেদন; বিকাশ/নগদ মাধ্যম ও Transaction ID আবশ্যক।
- Transaction ID বড়/ছোট হাতের অক্ষর নির্বিশেষে একবারই গ্রহণ করা হয়; আগের ID আবার দিলে 409 error আসে।
- আবেদন প্রথমে Pending থাকে। অ্যাডমিন বিকাশ/নগদ অ্যাপে টাকা সত্যি এসেছে কি না যাচাই করে Approve করলে তবেই Wallet balance-এ যোগ হয়।
- একই আবেদন দ্বিতীয়বার Approve করা যায় না। Balance অনুমোদিত রেকর্ড থেকে গণনা হয়, ব্রাউজারের পাঠানো balance গ্রহণ করা হয় না।
- আগের ছবি, ব্যানার, প্যাকেজ ও ডিজাইনের ফাইলগুলো অপরিবর্তিত রাখা হয়েছে।

## Deploy করার আগে আবশ্যক সেটিং
1. Hosting-এ Node.js 18 বা তার বেশি ব্যবহার করুন। `npm start` চালান।
2. Environment Variable-এ `FFX-PASS` দিন — এটি আপনার Admin Panel password। আগের অ্যাডমিন পাসওয়ার্ড থাকলে সেটিই ব্যবহার করুন।
3. `DATA_DIR`-কে স্থায়ী Persistent Disk-এর path দিন (উদাহরণ: `/var/data`)। এই ফোল্ডারে `wallet-ledger.json` এবং আগের `config.json` থাকবে। **Persistent Disk না থাকলে host restart/redeploy-এ জমার রেকর্ড হারাতে পারে।**
4. Deploy শেষে `/admin`-এ লগইন করুন, তারপর `/admin-money` খুলুন। একই ব্রাউজারে একই admin session ব্যবহার হবে।
5. `/admin-money`-এ প্রতিটি Pending আবেদনের Transaction ID ও পরিমাণ বিকাশ/নগদ merchant/personal অ্যাকাউন্টের transaction history-তে মিলিয়ে তারপর Approve করুন। শুধু screenshot বা ব্যবহারকারীর লেখা দেখে Approve করবেন না।

## গুরুত্বপূর্ণ সীমাবদ্ধতা ও নিরাপত্তা
- এটি Manual payment verification। সিস্টেম নিজে bKash/Nagad-এর সার্ভার থেকে টাকা এসেছে কি না জানতে পারে না। তাই অ্যাডমিনের বাস্তব transaction history যাচাই বাধ্যতামূলক।
- একই Transaction ID একাধিকবার ব্যবহার বন্ধ করা হয়েছে। তবে একই Node server-এর একক instance ধরে ledger সংরক্ষণ করে; একাধিক server instance/replica চালালে shared database/atomic unique constraint দরকার।
- Local disk storage-এ `DATA_DIR` অবশ্যই persistent হতে হবে। একাধিক replica বা বড় পরিসরের ব্যবহারের আগে Firestore/SQL-এর transaction ও unique index-এ স্থানান্তর করুন।
- Firebase Web API key browser-এ থাকা স্বাভাবিক public config; Service Account private key এখানে যোগ করা হয়নি।
- পেমেন্ট নম্বর `01889277663` আগের সাইটের নম্বর হিসেবে রাখা হয়েছে। এটি সঠিক ও আপনার নিয়ন্ত্রণে আছে কি না deploy-এর আগে নিশ্চিত করুন।

## পরীক্ষা
- `node --check server.js` দিয়ে server syntax পরীক্ষা করুন।
- Firebase-এ Email/Google sign-in সক্রিয় ও domain Authorized domains-এ যোগ থাকতে হবে।
- লগইন করা ব্যবহারকারী Add Money ফর্মে আবেদন পাঠাবে। অ্যাডমিন Pending আবেদন যাচাই করে Approve/Reject করবে।

## নতুন Add Money ডিজাইন
- Profile পেজের আগের ডিজাইন অপরিবর্তিত রাখা হয়েছে।
- Add Money থেকে Amount → bKash/Nagad নির্বাচন → আলাদা নির্দেশনা → Transaction ID জমা—এই ধাপগুলো করা হয়েছে।
- bKash ও Nagad উভয় পেজে পেমেন্ট নম্বর `01889277663` দেখানো হয়।
- পেমেন্ট আবেদন Pending থাকে; অ্যাডমিন আসল লেনদেন যাচাই করে Approve করলে তবেই Wallet balance বাড়ে।
- ওয়েবসাইট কখনো bKash/Nagad PIN বা OTP চাইবে না।

---

## SIAM Feature Pack (added 26 Nov 2026)

The updated `FFX.html` adds an additive feature layer while retaining the existing Firebase login, wallet API, admin pages, product pages, and navigation:

- Smart product search filters the existing product cards without changing their links.
- Special-offer panel links to the official Telegram channel; its timer is a daily visual countdown only and does not change prices.
- Notification Center links to existing wallet transaction history and Telegram updates.
- Coupon panel is a request/entry UI only. A production coupon needs admin-managed coupon records and server-side validation at checkout; no client-side discount is falsely applied.
- Referral link uses the signed-in Firebase UID as a share identifier. Referral attribution, abuse prevention, and reward crediting still require server-side referral records and admin approval.
- Order tracking links to the existing My Orders page and explains the statuses. The project currently has a `renderOrders()` display hook but no connected order-creation/order-status API, so live statuses must be connected to the actual order provider/admin workflow.
- Support chat opens the existing Telegram support channel; this is not an embedded agent chat service.
- Reviews are stored only in the current browser/device and are not public or sent to an admin database.
- VIP rank progress and wallet transaction history continue to use the existing account/wallet implementation.
- Animated gradient ambience is layered behind the existing background video; reduced-motion preference is respected.

Production activation still required for coupon redemption, referral rewards, server notifications, public reviews, live chat inbox, and live order status: implement authenticated server endpoints and corresponding admin controls before advertising these as fully live services.
