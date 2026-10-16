import Home from './home';
import {getTranslations} from '../intl/server';

export default async function Page() {
    const {locale, messages} = await getTranslations();
    return <Home locale={locale} messages={messages}/>;
}
