import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 })
    }

    const cookieStore = await cookies()
    cookieStore.set('_medusa_jwt', token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set token' }, { status: 500 })
  }
}
