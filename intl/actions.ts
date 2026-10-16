'use server';

import {cookies} from 'next/headers';
import {isLocale, localeCookie} from './locale';

export async function setLocale(locale: string): Promise<void> {
    if (!isLocale(locale)) throw new Error('Unsupported language');
    (await cookies()).set(localeCookie, locale, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
    });
}
