export const locales = ['en', 'de', 'fr', 'it'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';
export const localeCookie = 'kick-playr-locale';

export function isLocale(value: unknown): value is Locale {
    return typeof value === 'string' && locales.includes(value as Locale);
}

export function resolveRequestLocale(preference: string | undefined, header: string | null): Locale {
    return isLocale(preference) ? preference : resolveLocale(header);
}

/** RFC language preferences: highest quality first, stable order for ties. */
export function resolveLocale(header: string | null): Locale {
    if (!header) return defaultLocale;
    const preferences = header.split(',').map((part, index) => {
        const [range, ...parameters] = part.trim().split(';');
        const quality = parameters.find(p => /^\s*q\s*=/i.test(p));
        const raw = quality?.split('=')[1]?.trim();
        const q = raw === undefined ? 1 : /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(raw) ? Number(raw) : 0;
        return {range: range.toLowerCase(), q, index};
    }).filter(p => p.q > 0).sort((a, b) => b.q - a.q || a.index - b.index);
    for (const {range} of preferences) {
        if (range === '*') return defaultLocale;
        if (!/^[a-z]{1,8}(?:-[a-z0-9]{1,8})*$/.test(range)) continue;
        const language = range.split('-')[0];
        if (locales.includes(language as Locale)) return language as Locale;
    }
    return defaultLocale;
}
