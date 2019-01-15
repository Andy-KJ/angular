importScripts('https://www.gstatic.com/firebasejs/5.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.0/firebase-messaging.js');


firebase.initializeApp({
  'messagingSenderId': '98033218534'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const data = payload.data;

  const notificationTitle = 'AngularApp';
  const notificationOptions = {
    body: `This is Body Message`,
    icon: '/assets/icons/icon-512x512.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});