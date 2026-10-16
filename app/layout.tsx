import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'kick-playr. | Less admin. More football.',
    description: 'Everything your football club needs. Teams, members, payments, schedules and communication – all in one app.'
};
export default function RootLayout({children}: { children: React.ReactNode }) {
    return <html lang="en">
    <body>{children}</body>
    </html>
}
