import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { getJwtSecretKey } from '@/lib/auth';
// import { IncomingRequest } from 'http';

interface Body {
  username: string;
  password: string;
}

export async function POST(request: {
  json: () => Body | PromiseLike<Body>;
}): Promise<NextResponse> {
  const body: Body = await request.json();

  if (body.username === 'admin' && body.password === 'admin') {
    const token = await new SignJWT({
      username: body.username,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30s')
      .sign(getJwtSecretKey());

    const response = NextResponse.json(
      { success: true },
      { status: 200, headers: { 'content-type': 'application/json' } }
    );

    response.cookies.set({
      name: 'token',
      value: token,
      path: '/',
    });

    return response;
  }

  return NextResponse.json({ success: false });
}
