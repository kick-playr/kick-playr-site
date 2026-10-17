'use client';
import {useEffect, useRef, useState, useTransition} from 'react';
import ThemeLogo from './theme-logo';
import {useRouter} from 'next/navigation';
import {setLocale} from '../intl/actions';
import {locales, type Locale} from '../intl/locale';
import type {Messages} from '../intl/messages';
import {ArrowRight, ChevronDown, Monitor, Moon, Sun} from 'lucide-react';

const languageNames: Record<Locale, string> = {en: 'English', de: 'Deutsch', fr: 'Français', it: 'Italiano'};

function LanguageIcon({locale}: {locale: Locale}) {
    return <svg viewBox="0 0 24 16" width="24" height="16" aria-hidden="true" className="language-icon">
        {locale === 'en' ? <>
            <path fill="#21468b" d="M0 0h24v16H0z"/>
            <path stroke="#fff" strokeWidth="4" d="m0 0 24 16M24 0 0 16"/>
            <path stroke="#c8102e" strokeWidth="1.5" d="m0 0 24 16M24 0 0 16"/>
            <path stroke="#fff" strokeWidth="6" d="M12 0v16M0 8h24"/>
            <path stroke="#c8102e" strokeWidth="3" d="M12 0v16M0 8h24"/>
        </> : locale === 'de' ? <>
            <path fill="#171717" d="M0 0h24v6H0z"/>
            <path fill="#d22b33" d="M0 5.33h24v5.34H0z"/>
            <path fill="#ffce32" d="M0 10.67h24V16H0z"/>
        </> : <>
            <path fill={locale === 'fr' ? '#21468b' : '#008c45'} d="M0 0h8v16H0z"/>
            <path fill="#fff" d="M8 0h8v16H8z"/>
            <path fill="#cd263b" d="M16 0h8v16h-8z"/>
        </>}
    </svg>;
}

export default function SiteHeader({locale, messages: t}: {locale: Locale; messages: Messages}) {
const router = useRouter();
const [changingLanguage, startLanguageChange] = useTransition();
const [languageError, setLanguageError] = useState(false);
const [languageOpen, setLanguageOpen] = useState(false);
const languageRef = useRef<HTMLDivElement>(null);
const languageButtonRef = useRef<HTMLButtonElement>(null);
useEffect(() => {
    if (!languageOpen) return;
    const closeOutside = (event: PointerEvent) => {
        if (event.target instanceof Node && !languageRef.current?.contains(event.target)) setLanguageOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setLanguageOpen(false);
            languageButtonRef.current?.focus();
        }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
        document.removeEventListener('pointerdown', closeOutside);
        document.removeEventListener('keydown', closeOnEscape);
    };
}, [languageOpen]);
const [theme, setTheme] = useState('system');
useEffect(() => { setTheme(document.documentElement.dataset.theme ?? 'system'); }, []);
return <>        <header className="nav wrap"><a href="/" className="logo"><ThemeLogo alt="" width={56} height={56} priority/><span className="brand-name">kick-playr<b>.</b></span></a>
            <div className="navigation-row">
            <nav id="primary-nav" className="links"><a
                                                              href="/#features">{t.features}</a><a
                href="/#how">{t.howItWorks}</a><a
                                                                              href="/#pricing">{t.pricing}</a><a
                href="/#pilot">{t.forClubs}</a><a href="/news">{t.news}</a>
            </nav>

                <div ref={languageRef} className="language-control" aria-busy={changingLanguage}
                     onBlur={event => {
                         if (!event.currentTarget.contains(event.relatedTarget)) setLanguageOpen(false);
                     }}>
                    <button ref={languageButtonRef} type="button" className="language-trigger"
                        aria-label={t.language + ': ' + languageNames[locale]} title={languageNames[locale]}
                        aria-expanded={languageOpen} aria-controls="language-options" disabled={changingLanguage}
                        onClick={() => { setLanguageOpen(!languageOpen); }}>
                        <LanguageIcon locale={locale}/><ChevronDown size={14} aria-hidden="true"/>
                    </button>
                    {languageOpen && <div id="language-options" className="language-options" role="group" aria-label={t.language}>
                        {locales.filter(language => language !== locale).map(language => <button key={language}
                            type="button" lang={language} disabled={changingLanguage}
                            onClick={() => {
                                setLanguageError(false);
                                startLanguageChange(async () => {
                                    try {
                                        await setLocale(language);
                                        setLanguageOpen(false);
                                        languageButtonRef.current?.focus();
                                        router.refresh();
                                    } catch {
                                        setLanguageError(true);
                                    }
                                });
                            }}><LanguageIcon locale={language}/><span>{languageNames[language]}</span></button>)}
                    </div>}
                    {languageError && <span className="language-error" role="alert">{t.languageChangeError}</span>}
                </div>
            </div>
            <a className="nav-cta" href="/#pilot">{t.joinThePilot}<ArrowRight size={16}/></a>
                <div className="theme-toggle" role="radiogroup" aria-label={t.theme}
                     onKeyDown={event => {
                         const values = ['system', 'light', 'dark'];
                         const index = values.indexOf(theme);
                         let nextIndex: number;
                         if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % 3;
                         else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index + 2) % 3;
                         else if (event.key === 'Home') nextIndex = 0;
                         else if (event.key === 'End') nextIndex = 2;
                         else return;
                         event.preventDefault();
                         const nextTheme = values[nextIndex];
                         document.documentElement.dataset.theme = nextTheme;
                         document.cookie = `theme=${nextTheme}; Path=/; Max-Age=31536000; SameSite=Lax`;
                         setTheme(nextTheme);
                         event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[nextIndex]?.focus();
                     }}>
                    {([
                        {value: 'system', label: t.themeSystem, Icon: Monitor},
                        {value: 'light', label: t.themeWhite, Icon: Sun},
                        {value: 'dark', label: t.themeBlack, Icon: Moon},
                    ] as const).map(({value, label, Icon}) => <button key={value} type="button" className="preference-icon"
                        role="radio" data-value={value} aria-label={label} title={label} aria-checked={theme === value} tabIndex={theme === value ? 0 : -1}
                        onClick={() => {
                            document.documentElement.dataset.theme = value;
                            document.cookie = `theme=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
                            setTheme(value);
                        }}><Icon size={20} aria-hidden="true"/></button>)}
                </div>
        </header>
</>;
}
