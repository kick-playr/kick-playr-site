import {getNews} from '../lib/news';
import Home from './home';
import {getTranslations} from '../intl/server';

export default async function Page() {
    const {locale, messages} = await getTranslations();
    return <Home locale={locale} messages={messages} news={(await getNews(locale)).slice(0, 3)}/>;
}
