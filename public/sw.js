self.addEventListener("push", (event) => {
  if (!event.data) return;

  let data = {};

  try {
    data = event.data.json();
  } catch {
    data = { title: "Notification", message: event.data.text() };
  }

  const options = {
    body: data.message ?? "",
    icon: data.icon ?? "/web-app-manifest-192x192.png",
    badge: data.badge ?? "/web-app-manifest-72x72.png",
    tag: data.tag ?? "default",
    renotify: true,
    requireInteraction: data.requireInteraction ?? false,

    data: {
      url: data.url ?? "/notifications",
    },

    actions: [
      {
        action: "open",
        title: "Abrir",
      },
    ],
  };

  event.waitUntil(self.registration.showNotification(data.title ?? "Nova notificação", options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/notifications";

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of allClients) {
        if ("focus" in client && client.url.includes(self.location.origin)) {
          await client.focus();

          client.postMessage({
            type: "NAVIGATE",
            url: targetUrl,
          });

          return;
        }
      }

      if (clients.openWindow) {
        await clients.openWindow(targetUrl);
      }
    })(),
  );
});
