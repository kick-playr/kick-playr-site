import type english from './messages/en.json';
import type {Locale} from './locale';
export type Messages = typeof english;

const loaders = {
    en: () => import('./messages/en.json').then(m => m.default),
    de: () => import('./messages/de.json').then(m => m.default),
    fr: () => import('./messages/fr.json').then(m => m.default),
    it: () => import('./messages/it.json').then(m => m.default),
} satisfies Record<Locale, () => Promise<Partial<Messages>>>;

export async function loadMessages(locale: Locale): Promise<Messages> {
    const english = await import('./messages/en.json').then(m => m.default) as Messages;
    if (locale === 'en') return english;
    const translated: Partial<Messages> = await loaders[locale]();
    // Missing or blank translations fall back to the English message per key.
    return Object.fromEntries(Object.entries(english).map(([key, fallback]) => {
        const value = translated[key as keyof Messages];
        return [key, typeof value === 'string' && value.trim() ? value : fallback];
    })) as Messages;
}

