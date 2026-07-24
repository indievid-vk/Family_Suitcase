const VERSION = '0.0.1';
const CACHE_NAME = `family-pack-cache-v${VERSION}`;

// Базовые ресурсы для гарантированного офлайна
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-256.png',
  './icon-512.png',
  './version.json'
];

// Установка Service Worker, кэширование ресурсов и немедленная активация
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Кэшируем офлайн-ресурсы');
      return Promise.allSettled(
        PRECACHE_ASSETS.map((asset) =>
          fetch(asset, { cache: 'no-cache' })
            .then((res) => {
              if (res.ok || res.type === 'opaque') {
                return cache.put(asset, res);
              }
            })
            .catch((err) => console.warn('[Service Worker] Ошибка кэширования ресурса:', asset, err))
        )
      );
    })
  );
});

// Сообщения от клиента
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Получена команда SKIP_WAITING');
    self.skipWaiting();
  }
});

// Активация и очистка старых версий кэша
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Удаляем старый кэш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Перехват сетевых запросов
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Игнорируем сокеты и служебные запросы Vite dev-сервера
  if (url.pathname.startsWith('/@vite') || (url.hostname === 'localhost' && url.port && url.port !== '3000')) {
    return;
  }

  // Запрос версии
  if (url.pathname.endsWith('version.json')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ version: VERSION }), {
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  // Обслуживание из кэша (Cache First с фоновым обновлением и офлайн-фоллбэками)
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        // Если ресурс есть в кэше — отдаем его мгновенно
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
          })
          .catch(() => {/* В офлайне фоновое обновление тихо проваливается */});

        return cachedResponse;
      }

      // Если в кэше ресурса нет — загружаем из сети и сохраняем в кэш
      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Если сеть недоступна и ресурса не было в кэше по точному URL:
          // Для страниц навигации возвращаем index.html из кэша
          if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html')
              .then((res) => res || caches.match('./'))
              .then((res) => res || caches.match('index.html'))
              .then((res) => {
                if (res) return res;
                return caches.open(CACHE_NAME).then((cache) => {
                  return cache.keys().then((keys) => {
                    const htmlKey = keys.find((k) => k.url.endsWith('index.html') || k.url.endsWith('/'));
                    if (htmlKey) return cache.match(htmlKey);
                  });
                });
              });
          }

          // Для изображений возвращаем иконку
          if (event.request.destination === 'image') {
            return caches.match('./icon.svg');
          }

          return new Response('Офлайн-режим: ресурс недоступен', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
          });
        });
    })
  );
});
