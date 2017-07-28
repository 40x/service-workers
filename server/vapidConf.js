// run this file ONLY ONCE
const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();

// save these keys
console.log(vapidKeys);