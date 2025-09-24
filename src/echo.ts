import Echo from '@merit-systems/echo-next-sdk';

export const { 
  handlers, 
  openai
} = Echo({
    appId: process.env.ECHO_APP_ID || "d1852822-2ac3-4ed6-b9c1-ab28c075bcae"
});
