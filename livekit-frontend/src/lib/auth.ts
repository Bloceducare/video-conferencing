import { jwtVerify, JWTVerifyResult } from 'jose';

export function getJwtSecretKey(): Uint8Array {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

  if (!secret) {
    throw new Error('JWT Secret key is not matched');
  }

  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string): Promise<any | null> {
  try {
    const { payload }: JWTVerifyResult = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}
