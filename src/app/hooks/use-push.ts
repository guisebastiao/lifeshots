import { api } from "@/shared/lib/axios";
import { useCallback } from "react";

export function usePush() {
  const subscribe = useCallback(async () => {
    const registration = await navigator.serviceWorker.register("/sw.js");

    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Push permission not granted");
      }
    }

    const subscription = await registration.pushManager.getSubscription();

    if (subscription) return;

    const subscribe = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY),
    });

    const p256dh = subscribe.getKey("p256dh");
    const auth = subscribe.getKey("auth");

    if (!p256dh || !auth) {
      throw new Error("Keys not found");
    }

    api.post("/push/subscribe", {
      endpoint: subscribe.endpoint,
      keys: {
        p256dh: arrayBufferToBase64(p256dh),
        auth: arrayBufferToBase64(auth),
      },
    });
  }, []);

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    return Uint8Array.from([...atob(base64)].map((c) => c.charCodeAt(0)));
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  };

  return { subscribe };
}
