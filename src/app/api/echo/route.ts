import Echo from '@merit-systems/echo-next-sdk';

const echoConfig = {
  appId: process.env.NEXT_PUBLIC_ECHO_APP_ID || '',
  basePath: '/api/echo',
  baseEchoUrl: 'https://echo.merit.systems',
};

const echo = Echo(echoConfig);

export const { GET, POST } = echo.handlers;