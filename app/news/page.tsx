import SiteFooter from '../site-footer';
import {getTranslations} from '../../intl/server';
import {getNews} from '../../lib/news';
import SiteHeader from '../site-header';
import NewsCards from '../news-cards';

export async function generateMetadata() {
    const {messages: t} = await getTranslations();
    return {title: `${t.news} | kick-playr`, description: t.newsDescription};
}

export default async function NewsPage() {
    const {locale, messages: t} = await getTranslations();
    return <><SiteHeader locale={locale} messages={t}/><main className="wrap section news-page">
        <div className="kicker">{t.newsEyebrow}</div><h1>{t.news}</h1><p className="news-intro">{t.newsDescription}</p>
        <NewsCards articles={await getNews(locale)} locale={locale} readMore={t.newsReadMore}/>
        <a className="btn secondary" href="/">{t.newsHome}</a>
    </main><SiteFooter messages={t}/></>;
}
