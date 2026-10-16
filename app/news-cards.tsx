import {ArrowRight} from 'lucide-react';
import Image from 'next/image';
import type {NewsSummary} from '../lib/news';
import type {Locale} from '../intl/locale';

export default function NewsCards({articles, locale, readMore}: {articles: NewsSummary[]; locale: Locale; readMore: string}) {
    return <div className="news-grid">{articles.map(post => <article className="news-card" key={post.slug} lang={post.language}>
        {post.image && <Image className="news-club-logo" src={post.image} alt={post.imageAlt ?? ''} width={400} height={400} sizes="96px"/>}
        <time dateTime={post.date}>{new Intl.DateTimeFormat(locale, {dateStyle: 'long', timeZone: 'UTC'}).format(new Date(post.date))}</time>
        <h2><a href={`/news/${post.slug}`}>{post.title}</a></h2>
        <p>{post.description}</p>
        <a className="news-read" href={`/news/${post.slug}`}>{readMore}<ArrowRight size={18}/></a>
    </article>)}</div>;
}
