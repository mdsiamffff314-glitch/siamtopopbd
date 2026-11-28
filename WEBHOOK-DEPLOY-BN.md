Shop2Topup Webhook Deploy নির্দেশনা

Webhook URL:
https://siamtopopbdff.onrender.com/webhooks/shop2topup

এই আপডেটে POST validation request HTTP 200 পাবে। GitHub/storage initialization শেষ হওয়ার জন্য webhook অপেক্ষা করবে না। URL-এর শেষে slash বা query string থাকলেও route শনাক্ত হবে। GET/HEAD diagnostic-ও 200 দেয়।

গুরুত্বপূর্ণ: এটি URL reachability/validation ঠিক করে। Shop2Topup-এর অফিসিয়াল signature এবং event schema ছাড়া অর্ডার/ব্যালেন্স পরিবর্তন করা হয় না; এটিকে live auto-delivery integration মনে করবেন না।

Deploy: ZIP extract করে repository-র ফাইল replace করুন, Render deploy শেষ হতে দিন, তারপর Shop2Topup-এ URL দিয়ে Save Webhook করুন।
