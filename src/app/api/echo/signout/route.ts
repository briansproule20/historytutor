import { NextResponse } from 'next/server';

export async function POST() {
  try {
    
    // Clear all Echo authentication cookies
    const response = NextResponse.json({ success: true });
    
    response.cookies.delete('echo_access_token');
    response.cookies.delete('echo_refresh_token');
    response.cookies.delete('echo_refresh_token_expires');
    response.cookies.delete('echo_code_verifier');
    
    return response;
  } catch (error) {
    console.error('Sign out failed:', error);
    return NextResponse.json({ error: 'Sign out failed' }, { status: 500 });
  }
}