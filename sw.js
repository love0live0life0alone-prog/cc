const CACHE_NAME = 'workers-app-cache-v3'; // تم تغيير رقم الإصدار
const urlsToCache = [
  './',
  './index.html',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap'
];

// تثبيت التطبيق وحفظ الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // إجبار التطبيق على أخذ النسخة الجديدة فوراً
  );
});

// تفعيل النسخة الجديدة ومسح الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // مسح النسخ القديمة
          }
        })
      );
    })
  );
});

// جلب البيانات (يبحث في الإنترنت أولاً، ثم في الذاكرة)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});