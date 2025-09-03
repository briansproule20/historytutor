import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    
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