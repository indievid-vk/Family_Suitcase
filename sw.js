const CACHE_NAME = 'family-pack-cache-v1';

// Ресурсы, которые кэшируются сразу при установке
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

// Установка Service Worker и кэширование базовых ресурсов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching offline assets');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Активация и удаление старых версий кэша
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Перехват запросов и обслуживание из кэша / сети
self.addEventListener('fetch', (event) => {
  // Обрабатываем только GET-запросы
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Игнорируем запросы к панели разработчика (HMR, Vite ws)
  if (url.pathname.startsWith('/@vite') || url.hostname === 'localhost' && url.port && url.port !== '3000') {
    return;
  }

  // Стратегия обслуживания
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. Если это статический ассет (JS, CSS, изображения, шрифты), используем Cache-First
      const isStaticAsset = 
        url.pathname.includes('/assets/') || 
        url.pathname.endsWith('.js') || 
        url.pathname.endsWith('.css') || 
        url.pathname.endsWith('.svg') || 
        url.pathname.endsWith('.png') || 
        url.pathname.endsWith('.ico') ||
        url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com');

      if (isStaticAsset && cachedResponse) {
        // Возвращаем из кэша, но фоном обновляем (Stale-While-Revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {/* Игнорируем ошибки сети во время фонового обновления */});
        
        return cachedResponse;
      }

      // 2. Для остальных запросов (HTML страницы, манифест) используем Network-First
      return fetch(event.request)
        .then((networkResponse) => {
          // Если запрос успешен, клонируем его и сохраняем в кэш
          if (networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Если сеть недоступна, возвращаем кэшированную копию, если она есть
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Для навигационных запросов (переход на другие страницы), если совсем ничего нет,
          // возвращаем базовый index.html из кэша (fallback)
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
