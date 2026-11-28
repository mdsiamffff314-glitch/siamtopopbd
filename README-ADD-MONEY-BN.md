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
5. `/admin-money`-এ প্রতিটি Pending আবেদনের Transaction ID ও পরিমাণ বিকাশ/নগদ/রকেট merchant/personal অ্যাকাউন্টের transaction history-তে মিলিয়ে তারপর Approve করুন। শুধু screenshot বা ব্যবহারকারীর লেখা দেখে Approve করবেন না।

## গুরুত্বপূর্ণ সীমাবদ্ধতা ও নিরাপত্তা
- এটি Manual payment verification। সিস্টেম নিজে bKash/Nagad/Rocket-এর সার্ভার থেকে টাকা এসেছে কি না জানতে পারে না। তাই অ্যাডমিনের বাস্তব transaction history যাচাই বাধ্যতামূলক।
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
- bKash, Nagad ও Rocket—তিনটি পেজেই পেমেন্ট নম্বর `01889277663` দেখানো হয়।
- পেমেন্ট আবেদন Pending থাকে; অ্যাডমিন আসল লেনদেন যাচাই করে Approve করলে তবেই Wallet balance বাড়ে।
- ওয়েবসাইট কখনো bKash/Nagad/Rocket PIN বা OTP চাইবে না।

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

---

## SIAM feature update (November 2026)

এই আপডেটে হোমপেজের টুলবারে নতুন শর্টকাট ও পেজ যোগ হয়েছে: My Saved UID, One Tap Reorder, Download/Print Invoice, Achievement & Rewards, Dark/Light Mode, Help Center & FAQ, Premium Welcome Animation, Price Drop Alert, Multiple Payment Methods, Top Buyers Leaderboard, Product Stock Status এবং Best Deal Finder।

### বর্তমানে কার্যকর ক্লায়েন্ট-সাইড সুবিধা
- Saved UID, থিম পছন্দ, রিভিউ কাউন্ট/লোকাল ব্যাজ এবং Price Alert ব্রাউজারের local storage-এ থাকে; অন্য ডিভাইসে সিঙ্ক হয় না।
- One Tap Reorder সর্বশেষ খোলা প্রোডাক্ট পেজে ফেরত নেয়; পুরোনো অর্ডার/পেমেন্ট আবার জমা দেয় না।
- Invoice বাটন My Orders পেজে নিয়ে ব্রাউজারের Print / Save as PDF চালায়; এটি ট্যাক্স ইনভয়েস নয়।
- Best Deal Finder পেজে লোড হওয়া প্যাকেজের প্রদর্শিত দাম কম থেকে বেশি সাজিয়ে দেখায়; ভিন্ন পরিমাণের প্যাকেজের মধ্যে value-for-money তুলনা নয়।
- বর্তমান Add Money ফ্লোতে থাকা bKash ও Nagad পদ্ধতি দেখানো হয়।
- Welcome animation প্রতি ব্রাউজার সেশনে একবার চলে।

### যে সুবিধাগুলোর জন্য Backend/Admin integration এখনো দরকার
- Server-side coupon validation ও order total-এ discount প্রয়োগ।
- Referral attribution, fraud checks এবং wallet bonus credit।
- অর্ডারের live status events এবং server-pushed notifications।
- Push price alerts (service worker/notification permission ও server scheduler)।
- Live stock/availability source এবং admin-managed stock status।
- Customer consent-সহ privacy-safe leaderboard এবং server-calculated rewards।
- নতুন payment gateway-এর merchant credentials, webhook verification এবং server-side reconciliation।
- Server-issued invoice number/verified order receipt।

কোনো আর্থিক সুবিধা বা লাইভ স্টক এই UI আপডেট একা থেকে কৃত্রিমভাবে নিশ্চিত করে না।
\n\n### পেমেন্ট মাধ্যম আপডেট\n- Add Money পেজে সবুজ Siam Top Up FF wallet banner ও amount card যোগ করা হয়েছে।\n- Payment selection-এ bKash, Nagad ও Rocket আছে; EPS নেই।\n- তিনটি মাধ্যমেই Send Money নির্দেশনা ও Transaction ID verification form আছে।\n- তিনটি মাধ্যমের জন্যই পেমেন্ট নম্বর `01889277663` সেট করা হয়েছে।\n- Rocket deposit method server validation ও Admin Money list-এ যুক্ত হয়েছে।\n

### UI polish (26 Nov 2026)
- Amount field-এ বৈধ ১০–৫০,০০০ পূর্ণসংখ্যা লিখলে Add Money Securely বাটন উজ্জ্বল সবুজ হয়; ফাঁকা/অবৈধ ইনপুটে muted ও disabled থাকে।
- bKash, Nagad ও Rocket method card-এ আলাদা branded app-style icon এবং নাম দেখানো হয়।

### অর্ডার সিস্টেমের অতিরিক্ত সংযোগ (27 Nov 2026)
- FF Likes, UID/Diamond Topup, Weekly/Monthly, Weekly Lite, Level Up Pass এবং Indonesia Server—সব পণ্যের জন্য একই authenticated Wallet order API সংযুক্ত করা হয়েছে। সার্ভার `FFX.html`-এর ডিফল্ট প্যাকেজ অথবা Admin Panel-এ সংরক্ষিত প্যাকেজ তালিকা থেকে নাম ও দাম মিলিয়ে অর্ডার গ্রহণ করে।
- `/api/wallet/me` এখন ব্যবহারকারীর নিজের অর্ডারও ফেরত দেয়; My Orders পেজ সেই সার্ভার ডাটা দেখায়।
- `/admin-money`-এ Customer Orders তালিকা যোগ হয়েছে। অ্যাডমিন Pending → Processing → Completed করতে পারে; Reject করলে অর্ডারের কাটা Wallet balance আবার ফেরত আসে।
- Transaction ID তুলনার আগে uppercase ও whitespace normalization করা হয়, তাই অক্ষরের case বা মাঝের whitespace বদলে একই ID পুনরায় ব্যবহার করা যায় না।
- এই JSON ledger একক Node.js instance ও persistent `DATA_DIR`-এর জন্য। একাধিক replica চালালে Firestore/SQL-এর atomic transaction এবং unique constraint ব্যবহার করতে হবে।


### Instant Pay / সরাসরি বিকাশ-নগদ অর্ডার (নতুন)
- পণ্য পেজে Instant Pay নির্বাচন করলে বিকাশ/নগদ বেছে Transaction ID দেওয়ার ফর্ম দেখা যায়।
- সঠিক পরিমাণ Send Money করে Transaction ID জমা দিলে অর্ডার Pending অবস্থায় `/admin-money`-এর Customer Orders তালিকায় যাবে।
- অ্যাডমিন বিকাশ/নগদ অ্যাপের transaction history-তে নম্বর, পরিমাণ ও Transaction ID মিলিয়ে তারপর Processing/Completed করবেন। টাকা যাচাই না করে Complete করবেন না।
- একই Transaction ID Add Money আবেদন বা অন্য কোনো অর্ডারে আগে ব্যবহার হয়ে থাকলে সার্ভার সেটি প্রত্যাখ্যান করবে।
- এই পদ্ধতি কোনো automatic bKash/Nagad gateway নয়; এটি manual verification।


### Buy Now → bKash / Nagad / Rocket payment flow (28 Nov 2026)
- Instant Pay নির্বাচন করে Buy Now চাপলে প্রথমে bKash, Nagad ও Rocket-এর মধ্যে মাধ্যম নির্বাচন করার আলাদা পপআপ আসে।
- মাধ্যম নির্বাচন করলে সংশ্লিষ্ট USSD/app নির্দেশনা, পেমেন্ট নম্বর ও অর্ডারের পরিমাণ দেখায়।
- ব্যবহারকারী “আমি টাকা পাঠিয়েছি” চাপার পরেই Transaction ID ইনপুট দেখা যায়; ID দিয়ে Verify & Submit করলে manual-order আবেদন Pending হয়।
- Rocket এখন product manual-order server validation-এও অনুমোদিত।
- এটি এখনো manual verification: অ্যাডমিন payment app-এর transaction history-তে ID ও amount মিলিয়ে তারপর অর্ডার Processing করবেন। কোনো gateway/API credential এই ZIP-এ নেই।
- Add Money ফ্লোতেও Transaction ID field নির্দেশনার নিচে সরানো হয়েছে, যাতে টাকা পাঠানোর আগে ID চাওয়া না হয়।
