/* eslint-disable no-unused-vars */
declare module "process" {
  global {
    namespace NodeJS {
      interface Process {
        env: {
          PORT?: string;
          API_APP_URL: string;
          CLIENT_APP_URL: string;
          ADMIN_APP_URL: string;
          CORS_ORIGINS: string;
          MONGODB_URI: string;
          JWT_SECRET: string;
          GOOGLE_CLIENT_ID: string;
          GOOGLE_CLIENT_SECRET: string;
          GOOGLE_REFRESH_TOKEN: string;
          EMAIL_USER: string;
        };
      }
    }
  }
}
