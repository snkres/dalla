import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Import your authentication service functions
import { loginWithGoogle } from '@lib/api/auth/login'

// Google OAuth configuration
const GOOGLE_CLIENT_ID =
  '633251838183-s9eaujn7vg0iv32ovdbg4fql9a5i2o50.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''
const REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
  : 'http://localhost:3000/api/auth/google/callback'

/**
 * Exchange authorization code for tokens
 * This endpoint is called by the callback route to exchange the authorization code for tokens
 */
export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code is required' },
        { status: 400 },
      )
    }

    if (!GOOGLE_CLIENT_SECRET) {
      console.error('GOOGLE_CLIENT_SECRET is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 },
      )
    }

    // Exchange code for tokens with Google
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error('Token exchange failed:', errorData)
      return NextResponse.json(
        { error: 'Failed to exchange authorization code for tokens' },
        { status: 400 },
      )
    }

    const tokenData = await tokenResponse.json()

    // Get user information with the access token
    const userInfoResponse = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      },
    )

    if (!userInfoResponse.ok) {
      console.error('Failed to get user info:', await userInfoResponse.text())
      return NextResponse.json(
        { error: 'Failed to get user information' },
        { status: 400 },
      )
    }

    const userData = await userInfoResponse.json()

    // Process the user data and login the user
    // This depends on your authentication system
    const loginResult = await loginWithGoogle({
      idToken: tokenData.id_token,
      userType: 'user',
    })

    // Handle the result
    if (loginResult.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Login failed' }, { status: 401 })
    }
  } catch (error) {
    console.error('Error exchanging token:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
