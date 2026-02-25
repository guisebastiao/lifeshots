import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { api } from "@/lib/http/api";

interface PushSubscriptionRequest {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  deviceId: string;
  userAgent: string;
}

export const generatePushSubscription = async (): Promise<void> => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service Worker não suportado");
  }

  if (!("PushManager" in window)) {
    throw new Error("Push API não suportada");
  }

  await navigator.serviceWorker.register("/sw.js");

  const registration = await navigator.serviceWorker.ready;

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Permissão para notificações negada");
  }

  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY) as BufferSource,
    });
  }

  const p256dh = subscription.getKey("p256dh");
  const auth = subscription.getKey("auth");

  if (!p256dh || !auth) {
    throw new Error("Erro ao obter chaves da subscription");
  }

  const deviceId = await getDeviceId();

  const data: PushSubscriptionRequest = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: arrayBufferToBase64(p256dh),
      auth: arrayBufferToBase64(auth),
    },
    deviceId,
    userAgent: navigator.userAgent,
  };

  await api.post("/push/subscribe", data);
};

const getDeviceId = async (): Promise<string> => {
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  } catch {
    return "unknown";
  }
};

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
};

const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};
