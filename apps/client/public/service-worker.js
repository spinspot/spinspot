addEventListener("install", () => {
  console.log("Service worker installed");
});

addEventListener("activate", () => {
  console.log("Service worker activated");
});

addEventListener("fetch", (event) => {
  // eslint-disable-next-line no-undef
  if (event instanceof FetchEvent) {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(event.request);
          const resClone = res.clone();

          const cache = await caches.open("test-cache");
          await cache.put(event.request, resClone);
          return res;
        } catch (err) {
          if (event.request.method === "GET") {
            const match = await caches.match(event.request);

            if (match !== undefined) {
              console.log("Cache hit: ", event.request, match);

              return match;
            }
          }
          console.log("Cache miss: ", event.request);
          throw err;
        }
      })(),
    );
  }
});
