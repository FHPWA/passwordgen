const CACHE="PasswordGen",precacheFiles=["passwordgen/","passwordgen/advanced.html","passwordgen/check.html","passwordgen/about.html"];function fromCache(e){return caches.open(CACHE).then((function(t){return t.match(e).then((function(e){return e&&404!==e.status?e:Promise.reject("no-match")}))}))}function updateCache(e,t){return caches.open(CACHE).then((function(n){return n.put(e,t)}))}self.addEventListener("install",(function(e){self.skipWaiting(),e.waitUntil(caches.open(CACHE).then((function(e){return e.addAll(precacheFiles)})))})),self.addEventListener("activate",(function(e){e.waitUntil(self.clients.claim())})),self.addEventListener("fetch",(function(e){"GET"===e.request.method&&e.respondWith(fromCache(e.request).then((function(t){return e.waitUntil(fetch(e.request).then((function(t){return updateCache(e.request,t)}))),t}),(function(){return fetch(e.request).then((function(t){return e.waitUntil(updateCache(e.request,t.clone())),t})).catch((function(e){}))})))}));