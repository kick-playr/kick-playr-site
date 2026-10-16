import type {MetadataRoute} from 'next';

export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = new URL(process.env.SITE_URL || 'https://kick-playr.ch');

    return {
        // All public pages and rendering assets are crawlable, including by AI bots.
        // Never use robots.txt to protect private content or list sensitive paths.
        rules: {userAgent: '*', allow: '/'},
        sitemap: new URL('/sitemap.xml', baseUrl).href,
    };
}
