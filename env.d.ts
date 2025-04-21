declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_PHOTO_URL: string;
    NEXT_PUBLIC_ENV: 'development' | 'production';
    // и другие переменные по необходимости
  }
}
