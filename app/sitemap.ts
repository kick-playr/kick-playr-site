import type {MetadataRoute} from 'next';
import {locales} from '../intl/locale';
import {getNews} from '../lib/news';

// Re-read published news on each request, including scheduled publication dates.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = new URL(process.env.SITE_URL || 'https://kick-playr.ch');
    const news = (await Promise.all(locales.map(locale => getNews(locale)))).flat();
    const slugs = [...new Set(news.map(post => post.slug))].sort();

    // Translations share URLs: language is selected by cookie/request headers.
    return ['/', '/news', ...slugs.map(slug => `/news/${slug}`)].map(path => ({
        url: new URL(path, baseUrl).href,
    }));
}
