import SiteFooter from '../../site-footer';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {getTranslations} from '../../../intl/server';
import {getArticle} from '../../../lib/news';
import SiteHeader from '../../site-header';

type Props = {params: Promise<{slug: string}>};
export async function generateMetadata({params}: Props) {
    const {locale} = await getTranslations();
    const post = await getArticle((await params).slug, locale);
    if (!post) notFound();
    return {title: `${post.title} | kick-playr`, description: post.description, openGraph: {type: 'article', title: post.title, description: post.description, publishedTime: post.date}};
}

export default async function ArticlePage({params}: Props) {
    const {locale, messages: t} = await getTranslations();
    const post = await getArticle((await params).slug, locale);
    if (!post) notFound();
    return <><SiteHeader locale={locale} messages={t}/><main className="wrap section news-page">
        <a className="news-read" href="/news">← {t.newsBack}</a>
        <article className="news-article" lang={post.language}>
            {post.image && <Image className="news-club-logo news-club-logo-article" src={post.image} alt={post.imageAlt ?? ''} width={400} height={400} sizes="(max-width: 620px) 112px, 144px"/>}
            <div className="kicker">{t.newsEyebrow}</div>
            <h1>{post.title}</h1><time dateTime={post.date}>{new Intl.DateTimeFormat(locale, {dateStyle: 'long', timeZone: 'UTC'}).format(new Date(post.date))}</time>
            <p className="news-intro">{post.description}</p>
            <div className="news-body" dangerouslySetInnerHTML={{__html: post.html}}/>
        </article>
        <a className="btn primary" href="/#pilot">{t.joinThePilot}</a>
    </main><SiteFooter messages={t}/></>;
}
