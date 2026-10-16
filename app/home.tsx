'use client';
import {useState, useTransition} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {setLocale} from '../intl/actions';
import {locales, type Locale} from '../intl/locale';
import type {Messages} from '../intl/messages';
import {
    ArrowRight,
    CalendarDays,
    Check,
    ChevronDown,
    ClipboardList,
    CreditCard,
    Menu,
    MessageCircle,
    Phone,
    ShieldCheck,
    Users,
    Wallet,
    X
} from 'lucide-react';

const languageNames: Record<Locale, string> = {en: 'English', de: 'Deutsch', fr: 'Français', it: 'Italiano'};

export default function Home({locale, messages: t}: {locale: Locale; messages: Messages}) {
    const router = useRouter();
    const [changingLanguage, startLanguageChange] = useTransition();
    const [languageError, setLanguageError] = useState(false);
    const features = [
        {icon: Users, title: t.featureTeamsTitle, desc: t.featureTeamsDescription},
        {icon: ClipboardList, title: t.featureTrialsTitle, desc: t.featureTrialsDescription},
        {icon: CalendarDays, title: t.featureTrainingTitle, desc: t.featureTrainingDescription},
        {icon: CreditCard, title: t.featureBillingTitle, desc: t.featureBillingDescription},
        {icon: Wallet, title: t.featureVouchersTitle, desc: t.featureVouchersDescription},
        {icon: MessageCircle, title: t.featureChatTitle, desc: t.featureChatDescription},
        {icon: ShieldCheck, title: t.featureOperationsTitle, desc: t.featureOperationsDescription},
        {icon: Users, title: t.featureSelfServiceTitle, desc: t.featureSelfServiceDescription},
    ];
    const roles = [
        {title: t.roleAdminTitle, desc: t.roleAdminDescription},
        {title: t.roleCoachTitle, desc: t.roleCoachDescription},
        {title: t.roleMemberTitle, desc: t.roleMemberDescription},
    ];
    const questions = [
        [t.faqAudienceQuestion, t.faqAudienceAnswer],
        [t.faqAvailabilityQuestion, t.faqAvailabilityAnswer],
        [t.faqBexioQuestion, t.faqBexioAnswer],
        [t.faqDeliveryQuestion, t.faqDeliveryAnswer],
        [t.faqSetupQuestion, t.faqSetupAnswer],
        [t.faqIntegrationsQuestion, t.faqIntegrationsAnswer],
        [t.faqLanguagesQuestion, t.faqLanguagesAnswer],
        [t.faqPricingQuestion, t.faqPricingAnswer],
    ];
    const onboarding = [
        [t.onboardingIdentityTitle, t.onboardingIdentityDescription],
        [t.onboardingEmailTitle, t.onboardingEmailDescription],
        [t.onboardingConnectTitle, t.onboardingConnectDescription],
        [t.onboardingMappingsTitle, t.onboardingMappingsDescription],
        [t.onboardingShopTitle, t.onboardingShopDescription],
        [t.onboardingPeopleTitle, t.onboardingPeopleDescription],
    ];

    const [menu, setMenu] = useState(false);
    const [email, setEmail] = useState('');
    const [club, setClub] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [faq, setFaq] = useState<number | null>(null);
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(t.pilotEmailSubject + ' — ' + club);
        const body = encodeURIComponent(`${t.pilotEmailClub}: ${club}\n${t.pilotEmailAddress}: ${email}\n\n${t.pilotEmailMessage}`);
        window.location.href = `mailto:pilot@kickplayr.app?subject=${subject}&body=${body}`;
        setSubmitted(true)
    };
    return <>
        <header className="nav wrap"><a href="#top" className="logo"><Image src="/kick-playr-logo.png" alt="" width={88} height={88} priority/>kick-playr<span>.</span></a>
            <nav id="primary-nav" className={menu ? 'links open' : 'links'}><a onClick={() => setMenu(false)}
                                                              href="#features">{t.features}</a><a
                onClick={() => setMenu(false)} href="#how">{t.howItWorks}</a><a onClick={() => setMenu(false)}
                                                                              href="#pricing">{t.pricing}</a><a
                onClick={() => setMenu(false)} href="#pilot">{t.forClubs}</a></nav>
            <a className="nav-cta" href="#pilot">{t.joinThePilot}<ArrowRight size={16}/></a>
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
        <main id="top">
            <section className="hero">
                <div className="hero-glow"/>
                <div className="wrap hero-grid">
                    <div className="hero-copy">
                        <div className="eyebrow"><span className="dot"/> {t.heroEyebrow}</div>
                        <h1>{t.lessAdmin}<br/><em>{t.moreFootball}</em></h1><p>{t.heroDescription}</p>
                        <div className="actions"><a className="btn primary" href="#pilot">{t.joinThePilot}<ArrowRight
                            size={18}/></a><a className="btn secondary" href="#features">{t.exploreFeatures}<ArrowRight
                            size={17}/></a></div>
                        <div className="hero-foot"><span>{t.heroFoundation}</span><span>{t.heroRoles}</span>
                        </div>
                    </div>
                    <div className="visual">
                        <div className="pitch-lines"/>
                        <div className="dashboard">
                            <div className="dash-top"><Image src="/kick-playr-logo.png" alt="kick-playr" width={40} height={40}/><span
                                className="pill">{t.previewLabel}</span><span className="avatar">FC</span></div>
                            <div className="dash-hello">{t.previewTitle}</div>
                            <div className="dash-sub">{t.previewDescription}</div>
                            <div className="stats workflow-stats">
                                <div><small>{t.previewTeamLabel}</small><strong>{t.previewTeamValue}</strong><span>{t.previewTeamDetail}</span></div>
                                <div><small>{t.previewBillingLabel}</small><strong>{t.previewBillingValue}</strong><span>{t.previewBillingDetail}</span>
                                </div>
                            </div>
                            <div className="dash-panel">
                                <div className="panel-title">{t.previewPanelTitle}<CalendarDays size={16}/></div>
                                <div className="event">
                                    <div className="date"><CalendarDays size={22}/></div>
                                    <div><b>{t.previewTrainingTitle}</b><small>{t.previewTrainingDetail}</small></div>
                                    <ArrowRight size={16}/></div>
                                <div className="event">
                                    <div className="date"><Phone size={22}/></div>
                                    <div><b>{t.previewEmergencyTitle}</b><small>{t.previewEmergencyDetail}</small></div>
                                    <ArrowRight size={16}/></div>
                                <div className="event">
                                    <div className="date"><Users size={22}/></div>
                                    <div><b>{t.previewTrialsTitle}</b><small>{t.previewTrialsDetail}</small></div>
                                    <ArrowRight size={16}/></div>
                                <div className="event">
                                    <div className="date"><MessageCircle size={22}/></div>
                                    <div><b>{t.previewChatTitle}</b><small>{t.previewChatDetail}</small></div>
                                    <ArrowRight size={16}/></div>
                            </div>
                            <div className="dash-bottom"><span><Users size={15}/> {t.teams}</span><span><Wallet size={15}/> {t.billingLabel}</span><span><MessageCircle
                                size={15}/> {t.chatLabel}</span></div>
                        </div>
                        <div className="floating">
                            <div className="float-icon"><Check size={18}/></div>
                            <div><b>{t.floatingTitle}</b><small>{t.floatingDescription}</small></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="strip">
                <div className="wrap strip-inner"><span>{t.stripOne}</span><span>{t.stripTwo}</span><span>{t.moreTimeOnThePitch}</span>
                </div>
            </section>
            <section className="section wrap" id="features">
                <div className="section-top">
                    <div>
                        <div className="kicker">{t.featuresEyebrow}</div>
                        <h2>{t.featuresTitle}<br/><span>{t.featuresAccent}</span></h2></div>
                    <p>{t.featuresDescription}</p></div>
                <div className="feature-grid">{features.map(f => <article className="feature" key={f.title}>
                    <div className="feature-icon">
                        <f.icon size={23}/>
                    </div>
                    <h3>{f.title}</h3><p>{f.desc}</p><ArrowRight className="feature-arrow" size={18}/></article>)}</div>
            </section>
            <section className="section wrap roles" aria-labelledby="roles-title">
                <div className="bexio-note"><h3>{t.bexioTitle}</h3><p>{t.bexioDescription}</p></div>
                <div className="kicker">{t.rolesEyebrow}</div>
                <h2 id="roles-title">{t.rolesTitle}</h2>
                <p className="roles-intro">{t.rolesDescription}</p>
                <div className="role-grid">{roles.map(role => <article key={role.title}>
                    <h3>{role.title}</h3><p>{role.desc}</p>
                </article>)}</div>
            </section>
            <section className="section wrap member-preview-grid" aria-labelledby="member-preview-title">
                <div>
                    <div className="kicker">{t.memberPreviewEyebrow}</div>
                    <h2 id="member-preview-title">{t.memberPreviewTitle}<br/><span>{t.memberPreviewAccent}</span></h2>
                    <p className="member-preview-description">{t.memberPreviewDescription}</p>
                </div>
                <div className="member-preview-card">
                    <div className="dash-top">
                        <Image src="/kick-playr-logo.png" alt="" width={48} height={48}/>
                        <span className="pill">{t.memberPreviewLabel}</span>
                    </div>
                    <h3>{t.memberCardTitle}</h3>
                    <p className="member-preview-note">{t.memberPreviewNote}</p>
                    <div className="member-badge">
                        <ShieldCheck size={28} aria-hidden="true"/>
                        <div><b>{t.memberBadgeTitle}</b><small>{t.memberBadgeDetail}</small></div>
                    </div>
                    <div className="event">
                        <div className="date"><Users size={22}/></div>
                        <div><b>{t.memberDataTitle}</b><small>{t.memberDataDetail}</small></div>
                    </div>
                    <div className="event">
                        <div className="date"><Wallet size={22}/></div>
                        <div><b>{t.memberClubTitle}</b><small>{t.memberClubDetail}</small></div>
                    </div>
                    <div className="event">
                        <div className="date"><ClipboardList size={22}/></div>
                        <div><b>{t.memberCorrectionTitle}</b><small>{t.memberCorrectionDetail}</small></div>
                    </div>
                    <p className="member-review-note"><Check size={18} aria-hidden="true"/>{t.memberReviewNote}</p>
                </div>
            </section>
            <section className="section how" id="how">
                <div className="wrap">
                    <div className="kicker">{t.workflowEyebrow}</div>
                    <h2>{t.workflowTitle}<br/><span>{t.workflowAccent}</span></h2>
                    <div className="steps">
                        <div><span>01</span><h3>{t.workflowTrialTitle}</h3><p>{t.workflowTrialDescription}</p></div>
                        <div><span>02</span><h3>{t.workflowAdmissionTitle}</h3><p>{t.workflowAdmissionDescription}</p></div>
                        <div><span>03</span><h3>{t.workflowVoucherTitle}</h3><p>{t.workflowVoucherDescription}</p></div>
                    </div>
                </div>
            </section>
            <section className="section wrap setup" aria-labelledby="setup-title">
                <div className="kicker">{t.setupEyebrow}</div>
                <h2 id="setup-title">{t.setupTitle}<br/><span>{t.setupAccent}</span></h2>
                <p className="setup-intro">{t.setupDescription}</p>
                <div className="integration-grid">
                    <article className="integration-required">
                        <span className="pricing-label">{t.requiredLabel}</span>
                        <h3>{t.bexioRequirementTitle}</h3><p>{t.bexioRequirementDescription}</p>
                        <a href="https://www.bexio.com/" target="_blank" rel="noopener noreferrer">bexio.com <ArrowRight size={16}/></a>
                    </article>
                    <article>
                        <span className="pricing-label">{t.optionalLabel}</span>
                        <h3>{t.pingenTitle}</h3><p>{t.pingenDescription}</p>
                        <a href="https://www.pingen.com/" target="_blank" rel="noopener noreferrer">pingen.com <ArrowRight size={16}/></a>
                    </article>
                    <article>
                        <span className="pricing-label">{t.optionalLabel}</span>
                        <h3>{t.mailboxTitle}</h3><p>{t.mailboxDescription}</p>
                    </article>
                </div>
                <h3 className="onboarding-title">{t.onboardingTitle}</h3>
                <ol className="onboarding-grid">{onboarding.map(([title, description]) => <li key={title}>
                    <h4>{title}</h4><p>{description}</p>
                </li>)}</ol>
            </section>
            <section className="section wrap" id="pricing">
                <div className="section-top">
                    <div>
                        <div className="kicker">{t.pricingEyebrow}</div>
                        <h2>{t.pricingTitle}<br/><span>{t.pricingAccent}</span></h2></div>
                    <p>{t.pricingDescription}</p></div>
                <div className="pricing-card">
                    <div><span className="pricing-label">{t.earlyClubAccess}</span><h3>{t.pricingCardTitle}</h3><p>{t.pricingCardDescription}</p>
                        <div className="checks"><span><Check size={16}/> {t.pilotCheckSetup}</span><span><Check
                            size={16}/> {t.pilotCheckRoles}</span><span><Check size={16}/> {t.pilotCheckScope}</span>
                        </div>
                    </div>
                    <div className="pricing-action"><strong>{t.pilot}</strong><small>{t.termsSharedIndividually}</small><a
                        className="btn primary" href="#pilot">{t.applyForPilot}<ArrowRight size={17}/></a></div>
                </div>
            </section>
            <section className="section pilot" id="pilot">
                <div className="wrap pilot-grid">
                    <div>
                        <div className="kicker">{t.bePartOfTheFirstTeam}</div>
                        <h2>{t.yourClubDeserves}<br/><span>{t.moreFootballContinuation}</span></h2><p>{t.pilotDescription}</p>
                        <div className="pilot-note">{t.pilotNote}</div>
                    </div>
                    <form onSubmit={submit} className="pilot-form"><h3>{t.joinThePilotConversation}</h3><label
                        htmlFor="club">{t.clubName}</label><input id="club" required value={club}
                                                               onChange={e => setClub(e.target.value)}
                                                               placeholder={t.eGFcRiverside}/><label htmlFor="email">{t.workEmail}</label><input id="email" required type="email" value={email}
                                            onChange={e => setEmail(e.target.value)} placeholder={t.youYourclubCh}/>
                        <button className="btn primary" type="submit">{t.contactUsAboutThePilot}<ArrowRight size={17}/>
                        </button>
                        <small>{submitted ? t.yourEmailAppShouldOpenWithAPreparedMessageNoDataHasBeenSubmittedToAServer : t.contactHint}</small>
                    </form>
                </div>
            </section>
            <section className="faq wrap">
                <div className="kicker">{t.goodToKnow}</div>
                <h2>{t.frequentlyAskedQuestions}</h2>{questions.map(([q, a], i) =>
                <div className="faq-item" key={q}>
                    <button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}>{q}<ChevronDown
                        size={20}/></button>
                    {faq === i && <p>{a}</p>}</div>)}</section>
        </main>
        <footer>
            <div className="wrap footer-inner">
                <div><a className="logo" href="#top"><Image src="/kick-playr-logo.png" alt="" width={56} height={56}/>kick-playr<span>.</span></a><p>{t.lessAdminMoreFootball}</p></div>
                <div><a href="#features">{t.features}</a><a href="#pricing">{t.pricing}</a><a href="#pilot">{t.joinPilot}</a></div>
            </div>
            <div className="wrap fineprint">{t.copyrightSymbol} {new Date().getFullYear()} {t.kickPlayrConceptWebsiteBrandAndDomainAvailabilityNotYetConfirmed}</div>
        </footer>
    </>
}
