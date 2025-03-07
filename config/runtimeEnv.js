export const runtimeEnvConfig = {
  //for server-only variable
  APP_URL: process.env.SERVER_APP_URL,
  // Public for exposed to client-side
  public: {
    CLIENT_APP_URL: process.env.CLIENT_APP_URL,
    CLIENT_APP_PATH: process.env.CLIENT_APP_PATH,
    CALENDAR_APP_URL: process.env.CLIENT_APP_CALENDAR_URL,
    CLIENT_APP_ID: process.env.CLIENT_APP_ID,
  },
}
