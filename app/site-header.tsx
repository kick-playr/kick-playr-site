'use client';
import {useState, useTransition} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {setLocale} from '../intl/actions';
import {locales, type Locale} from '../intl/locale';
import type {Messages} from '../intl/messages';
import {ArrowRight, Menu, X} from 'lucide-react';

const languageNames: Record<Locale, string> = {en: 'English', de: 'Deutsch', fr: 'Français', it: 'Italiano'};

export default function SiteHeader({locale, messages: t}: {locale: Locale; messages: Messages}) {
const router = useRouter();
const [changingLanguage, startLanguageChange] = useTransition();
const [languageError, setLanguageError] = useState(false);
const [menu, setMenu] = useState(false);
return <>        <header className="nav wrap"><a href="/" className="logo"><Image src="/kick-playr-logo.png" alt="" width={88} height={88} priority/>kick-playr<span>.</span></a>
            <nav id="primary-nav" className={menu ? 'links open' : 'links'}><a onClick={() => setMenu(false)}
                                                              href="/#features">{t.features}</a><a
                onClick={() => setMenu(false)} href="/#how">{t.howItWorks}</a><a onClick={() => setMenu(false)}
                                                                              href="/#pricing">{t.pricing}</a><a
                onClick={() => setMenu(false)} href="/#pilot">{t.forClubs}</a><a onClick={() => setMenu(false)} href="/news">{t.news}</a></nav>
            <a className="nav-cta" href="/#pilot">{t.joinThePilot}<ArrowRight size={16}/></a>
            <div className="language-control">
                <select className="language-select" aria-label={t.language} value={locale}
                        disabled={changingLanguage} aria-busy={changingLanguage}
                        onChange={event => {
                            const nextLocale = event.target.value;
                            setLanguageError(false);
                            startLanguageChange(async () => {
                                try {
                                    await setLocale(nextLocale);
                                    router.refresh();
                                } catch {
                                    setLanguageError(true);
                                }
                            });
                        }}>
                    {locales.map(language => <option key={language} value={language} lang={language}>{languageNames[language]}</option>)}
                </select>
                {languageError && <span className="language-error" role="alert">{t.languageChangeError}</span>}
            </div>
            <button className="menu" onClick={() => setMenu(!menu)} aria-label={t.toggleMenu} aria-expanded={menu} aria-controls="primary-nav">{menu ? <X/> :
                <Menu/>}</button>
        </header>
</>;
}