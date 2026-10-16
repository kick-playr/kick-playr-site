import type {Metadata} from 'next';
import {getTranslations} from '../intl/server';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
    const {messages} = await getTranslations();
    return {
        title: messages.metadataTitle,
        icons: {icon: '/favicon.ico', apple: '/kick-playr-logo.png'},
        description: messages.heroDescription,
    };
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
    const {locale} = await getTranslations();
    const gtmId = (process.env.GTM_ID ?? 'GTM-5J6GM77L').trim();
    const enableGtm = /^GTM-[A-Z0-9]+$/.test(gtmId);
    return <html lang={locale}>
        <head>
            {enableGtm && <script id="google-tag-manager" dangerouslySetInnerHTML={{__html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}} />}
        </head>
        <body>
            {enableGtm && <noscript><iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0" width="0" style={{display: 'none', visibility: 'hidden'}}
                title="Google Tag Manager"
            /></noscript>}
            {children}
        </body>
    </html>;
}
