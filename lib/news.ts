import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';
import type {Locale} from '../intl/locale';

export type NewsSummary = {slug: string; title: string; description: string; date: string; language: Locale; image?: string; imageAlt?: string};
const directory = path.join(process.cwd(), 'news');

export async function getNews(locale: Locale): Promise<NewsSummary[]> {
    const files = (await readdir(directory)).filter(file => /^[a-z0-9]+(?:-[a-z0-9]+)*\.(en|de|fr|it)\.md$/.test(file));
    const posts = await Promise.all(files.map(async file => {
        const {data, content} = matter(await readFile(path.join(directory, file), 'utf8'));
        if (data.draft === true) return null;
        const slug = file.replace(/\.(en|de|fr|it)\.md$/, '').replace(/\.md$/, '');
        if (typeof data.title !== 'string' || typeof data.description !== 'string' ||
            typeof data.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
            Number.isNaN(Date.parse(data.date)) || !['en', 'de', 'fr', 'it'].includes(data.language)) {
            throw new Error(`Invalid news front matter: ${file}`);
        }
        if (data.date > new Date().toISOString().slice(0, 10)) return null;
        const image = typeof data.image === 'string' && data.image.startsWith('/news/') ? data.image : undefined;
        const imageAlt = typeof data.imageAlt === 'string' ? data.imageAlt : '';
        return {slug, title: data.title, description: data.description, date: data.date, language: data.language as Locale, image, imageAlt, content};
    }));
    const selected = new Map<string, NonNullable<typeof posts[number]>>();
    for (const post of posts) {
        if (post && (post.language === locale || (post.language === 'en' && !selected.has(post.slug)))) selected.set(post.slug, post);
    }
    return [...selected.values()].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)).map(({content, ...post}) => post);
}

export async function getArticle(slug: string, locale: Locale) {
    const post = (await getNews(locale)).find(post => post.slug === slug);
    if (!post) return null;
    const file = path.join(directory, `${post.slug}.${post.language}.md`);
    const {content} = matter(await readFile(file, 'utf8'));
    // Raw HTML is discarded; remark-html sanitizes its output by default.
    const rendered = String(await remark().use(html).process(content));
    // Add navigation attributes after sanitization so remark's safe HTML policy stays intact.
    const articleHtml = rendered.replace(
        /<a href="((?:[a-z][a-z0-9+.-]*:|\/\/)[^"]*)"/gi,
        '<a href="$1" target="_blank" rel="noopener noreferrer"',
    );
    return {...post, html: articleHtml};
}
