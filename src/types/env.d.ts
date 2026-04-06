/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVICE_KEY: string;
  readonly VITE_TEMPLATE_KEY: string;
  readonly VITE_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
