import type {Metadata} from 'next';
import {getTranslations} from '../intl/server';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
    const {messages} = await getTranslations();
    return {
        title: messages.metadataTitle,
        icons: {icon: '/favicon.ico', apple: '/kick-playr-logo.png'},
        description: messages.everythingYourFootballClubNeedsTeamsMembersPaymentsSchedulesAndCommunicationAllInOneApp,
    };
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
    const {locale} = await getTranslations();
    return <html lang={locale}><body>{children}</body></html>;
}
