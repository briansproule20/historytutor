import Echo from '@merit-systems/echo-next-sdk';
import { EchoClient } from '@merit-systems/echo-typescript-sdk';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const echoConfig = {
  appId: process.env.NEXT_PUBLIC_ECHO_APP_ID || '',
  basePath: '/api/echo',
  baseEchoUrl: 'https://echo.merit.systems',
};

const echo = Echo(echoConfig);

export async function GET() {
  try {
    const isSignedIn = await echo.isSignedIn();
    
    if (isSignedIn) {
      const user = await echo.getUser();
      
      // Get the access token to create Echo client for balance
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('echo_access_token')?.value;
      
      let balance = null;
      if (accessToken) {
        try {
          const echoClient = new EchoClient({ 
            baseUrl: 'https://echo.merit.systems', 
            apiKey: accessToken 
          });
          
          // Get user's current balance
          const balanceResponse = await echoClient.balance.getBalance();
          balance = balanceResponse.balance;
          
          // Also try to get free tier balance for this specific app
          try {
            const freeBalanceResponse = await echoClient.balance.getFreeBalance(echoConfig.appId);
            // If we have free tier balance, show that instead or in addition
            if (freeBalanceResponse.spendPoolBalance > 0) {
              balance = {
                balance: freeBalanceResponse.spendPoolBalance,
                currency: 'USD',  // Default currency
                description: 'Free tier credits'
              };
            }
          } catch (freeBalanceError) {
            console.log('No free tier balance available:', freeBalanceError);
          }
        } catch (balanceError) {
          console.error('Failed to get balance:', balanceError);
        }
      }
      
      return NextResponse.json({ 
        isSignedIn: true, 
        user: {
          ...user,
          balance
        }
      });
    } else {
      return NextResponse.json({ 
        isSignedIn: false, 
        user: null 
      });
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    return NextResponse.json({ 
      isSignedIn: false, 
      user: null 
    });
  }
}