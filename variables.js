const dev = process.env.NEXT_PUBLIC_ENV !== "production";

export const PHOTO_URL = dev
  ? `https://hb.bizmrg.com/mysalon-staging/photos/`
  : `https://hb.bizmrg.com/mysalon-production-02/photos/`;
