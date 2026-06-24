/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAINTENANCE_MODE?: string;
  readonly VITE_GOOGLE_ADS_ID?: string;
  readonly VITE_GOOGLE_ADS_FORM_CONVERSION?: string;
  readonly VITE_GOOGLE_ADS_PHONE_CONVERSION?: string;
  readonly VITE_GOOGLE_ADS_THANKYOU_CONVERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
