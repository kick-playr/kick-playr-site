import {cache} from 'react';
import {cookies, headers} from 'next/headers';
import {localeCookie, resolveRequestLocale} from './locale';
import {loadMessages} from './messages';

export const getTranslations = cache(async () => {
    const [cookieStore, requestHeaders] = await Promise.all([cookies(), headers()]);
    const locale = resolveRequestLocale(cookieStore.get(localeCookie)?.value, requestHeaders.get('accept-language'));
    return {locale, messages: await loadMessages(locale)};
});
