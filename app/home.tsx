'use client';
import {useState} from 'react';
import SiteHeader from './site-header';
import SiteFooter from './site-footer';
import NewsCards from './news-cards';
import type {NewsSummary} from '../lib/news';
import ThemeLogo from './theme-logo';
import type {Locale} from '../intl/locale';
import type {Messages} from '../intl/messages';
import {
    ArrowRight,
    CalendarDays,
    Check,
    ChevronDown,
    ClipboardList,
    CreditCard,
    ExternalLink,
    Menu,
    MessageCircle,
    Phone,
    ShieldCheck,
    Users,
    Wallet,
    X
} from 'lucide-react';


export default function Home({locale, messages: t, news}: {locale: Locale; messages: Messages; news: NewsSummary[]}) {
    const linkBexio = (text: string) => text.split(/(\bbexio\b)/gi).map((part, index) =>
        /^bexio$/i.test(part) ? <a key={index} className="bexio-link" href="https://www.bexio.com/"
            target="_blank" rel="noopener noreferrer" aria-label={part + ' — ' + t.externalLinkNewTab}
            title={t.externalLinkNewTab}>{part}<ExternalLink aria-hidden="true"/></a> : part
    );
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

    const [email, setEmail] = useState('');
    const [club, setClub] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(t.pilotEmailSubject + ' — ' + club);
        const body = encodeURIComponent(`${t.pilotEmailClub}: ${club}\n${t.pilotEmailAddress}: ${email}\n\n${t.pilotEmailMessage}`);
        window.location.href = `mailto:pilot@kickplayr.app?subject=${subject}&body=${body}`;
        setSubmitted(true)
    };
    return <>
        <SiteHeader locale={locale} messages={t}/>
        <main id="top">
            <section className="hero">
                <div className="hero-glow"/>
                <div className="wrap hero-grid">
                    <div className="hero-copy">
                        <div className="eyebrow"><span className="dot"/> {linkBexio(t.heroEyebrow)}</div>
                        <h1>{linkBexio(t.lessAdmin)}<br/><em>{linkBexio(t.moreFootball)}</em></h1><p>{linkBexio(t.heroDescription)}</p>
                        <div className="actions"><a className="btn primary" href="#pilot">{t.joinThePilot}<ArrowRight
                            size={18}/></a><a className="btn secondary" href="#features">{t.exploreFeatures}<ArrowRight
                            size={17}/></a></div>
                        <div className="hero-foot"><span>{linkBexio(t.heroFoundation)}</span><span>{linkBexio(t.heroRoles)}</span>
                        </div>
                    </div>
                    <div className="visual">
                        <div className="pitch-lines"/>
                        <div className="dashboard">
                            <div className="dash-top"><ThemeLogo alt="kick-playr" width={40} height={40}/><span
                                className="pill">{linkBexio(t.previewLabel)}</span><span className="avatar">FC</span></div>
                            <div className="dash-hello">{linkBexio(t.previewTitle)}</div>
                            <div className="dash-sub">{linkBexio(t.previewDescription)}</div>
                            <div className="stats workflow-stats">
                                <div><small>{linkBexio(t.previewTeamLabel)}</small><strong>{linkBexio(t.previewTeamValue)}</strong><span>{linkBexio(t.previewTeamDetail)}</span></div>
                                <div><small>{linkBexio(t.previewBillingLabel)}</small><strong>{linkBexio(t.previewBillingValue)}</strong><span>{linkBexio(t.previewBillingDetail)}</span>
                                </div>
                            </div>
                            <div className="dash-panel">
                                <div className="panel-title">{linkBexio(t.previewPanelTitle)}<CalendarDays size={16}/></div>
                                <div className="event">
                                    <div className="date"><CalendarDays size={22}/></div>
                                    <div><b>{linkBexio(t.previewTrainingTitle)}</b><small>{linkBexio(t.previewTrainingDetail)}</small></div>
                                    <ArrowRight size={16}/></div>
                                <div className="event">
                                    <div className="date"><Phone size={22}/></div>
                                    <div><b>{linkBexio(t.previewEmergencyTitle)}</b><small>{linkBexio(t.previewEmergencyDetail)}</small></div>
                                    <ArrowRight size={16}/></div>
                                <div className="event">
                                    <div className="date"><Users size={22}/></div>
                                    <div><b>{linkBexio(t.previewTrialsTitle)}</b><small>{linkBexio(t.previewTrialsDetail)}</small></div>
                                    <ArrowRight size={16}/></div>
                                <div className="event">
                                    <div className="date"><MessageCircle size={22}/></div>
                                    <div><b>{linkBexio(t.previewChatTitle)}</b><small>{linkBexio(t.previewChatDetail)}</small></div>
                                    <ArrowRight size={16}/></div>
                            </div>
                            <div className="dash-bottom"><span><Users size={15}/> {linkBexio(t.teams)}</span><span><Wallet size={15}/> {linkBexio(t.billingLabel)}</span><span><MessageCircle
                                size={15}/> {linkBexio(t.chatLabel)}</span></div>
                        </div>
                        <div className="floating">
                            <div className="float-icon"><Check size={18}/></div>
                            <div><b>{linkBexio(t.floatingTitle)}</b><small>{linkBexio(t.floatingDescription)}</small></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="strip">
                <div className="wrap strip-inner"><span>{linkBexio(t.stripOne)}</span><span>{linkBexio(t.stripTwo)}</span><span>{linkBexio(t.moreTimeOnThePitch)}</span>
                </div>
            </section>
            <section className="wrap pilot-reference" aria-labelledby="origin-title">
                <div className="pilot-reference-card">
                    <div>
                        <div className="kicker">{t.originEyebrow}</div>
                        <h2 id="origin-title">{t.originTitle}</h2>
                        <p>{t.originDescription}</p>
                    </div>
                    <div className="pilot-reference-club">
                        <span className="pricing-label">{t.originBadge}</span>
                        <strong>FC Rot-Weiss Winikon</strong>
                        <span>Uster · FCRWW</span>
                        <a href="https://app.fcrww.ch" target="_blank" rel="noopener noreferrer"
                           className="btn secondary" aria-label={t.originAppLink + ' — ' + t.externalLinkNewTab}
                           title={t.externalLinkNewTab}>{t.originAppLink}<ExternalLink size={17} aria-hidden="true"/></a>
                    </div>
                </div>
            </section>
            <section className="section wrap" id="features">
                <div className="section-top">
                    <div>
                        <div className="kicker">{linkBexio(t.featuresEyebrow)}</div>
                        <h2>{linkBexio(t.featuresTitle)}<br/><span>{linkBexio(t.featuresAccent)}</span></h2></div>
                    <p>{linkBexio(t.featuresDescription)}</p></div>
                <div className="feature-grid">{features.map(f => <article className="feature" key={f.title}>
                    <div className="feature-icon">
                        <f.icon size={23}/>
                    </div>
                    <h3>{linkBexio(f.title)}</h3><p>{linkBexio(f.desc)}</p><ArrowRight className="feature-arrow" size={18}/></article>)}</div>
            </section>
            <section className="section wrap roles" aria-labelledby="roles-title">
                <div className="bexio-note"><h3>{linkBexio(t.bexioTitle)}</h3><p>{linkBexio(t.bexioDescription)}</p></div>
                <div className="kicker">{linkBexio(t.rolesEyebrow)}</div>
                <h2 id="roles-title">{linkBexio(t.rolesTitle)}</h2>
                <p className="roles-intro">{linkBexio(t.rolesDescription)}</p>
                <div className="role-grid">{roles.map(role => <article key={role.title}>
                    <h3>{linkBexio(role.title)}</h3><p>{linkBexio(role.desc)}</p>
                </article>)}</div>
            </section>
            <section className="section wrap member-preview-grid" aria-labelledby="member-preview-title">
                <div>
                    <div className="kicker">{linkBexio(t.memberPreviewEyebrow)}</div>
                    <h2 id="member-preview-title">{linkBexio(t.memberPreviewTitle)}<br/><span>{linkBexio(t.memberPreviewAccent)}</span></h2>
                    <p className="member-preview-description">{linkBexio(t.memberPreviewDescription)}</p>
                </div>
                <div className="member-preview-card">
                    <div className="dash-top">
                        <ThemeLogo alt="" width={48} height={48}/>
                        <span className="pill">{linkBexio(t.memberPreviewLabel)}</span>
                    </div>
                    <h3>{linkBexio(t.memberCardTitle)}</h3>
                    <p className="member-preview-note">{linkBexio(t.memberPreviewNote)}</p>
                    <div className="member-badge">
                        <ShieldCheck size={28} aria-hidden="true"/>
                        <div><b>{linkBexio(t.memberBadgeTitle)}</b><small>{linkBexio(t.memberBadgeDetail)}</small></div>
                    </div>
                    <div className="event">
                        <div className="date"><Users size={22}/></div>
                        <div><b>{linkBexio(t.memberDataTitle)}</b><small>{linkBexio(t.memberDataDetail)}</small></div>
                    </div>
                    <div className="event">
                        <div className="date"><Wallet size={22}/></div>
                        <div><b>{linkBexio(t.memberClubTitle)}</b><small>{linkBexio(t.memberClubDetail)}</small></div>
                    </div>
                    <div className="event">
                        <div className="date"><ClipboardList size={22}/></div>
                        <div><b>{linkBexio(t.memberCorrectionTitle)}</b><small>{linkBexio(t.memberCorrectionDetail)}</small></div>
                    </div>
                    <p className="member-review-note"><Check size={18} aria-hidden="true"/>{linkBexio(t.memberReviewNote)}</p>
                </div>
            </section>
            <section className="section how" id="how">
                <div className="wrap">
                    <div className="kicker">{linkBexio(t.workflowEyebrow)}</div>
                    <h2>{linkBexio(t.workflowTitle)}<br/><span>{linkBexio(t.workflowAccent)}</span></h2>
                    <div className="steps">
                        <div><span>01</span><h3>{linkBexio(t.workflowTrialTitle)}</h3><p>{linkBexio(t.workflowTrialDescription)}</p></div>
                        <div><span>02</span><h3>{linkBexio(t.workflowAdmissionTitle)}</h3><p>{linkBexio(t.workflowAdmissionDescription)}</p></div>
                        <div><span>03</span><h3>{linkBexio(t.workflowVoucherTitle)}</h3><p>{linkBexio(t.workflowVoucherDescription)}</p></div>
                    </div>
                </div>
            </section>
            <section className="section wrap setup" aria-labelledby="setup-title">
                <div className="kicker">{linkBexio(t.setupEyebrow)}</div>
                <h2 id="setup-title">{linkBexio(t.setupTitle)}<br/><span>{linkBexio(t.setupAccent)}</span></h2>
                <p className="setup-intro">{linkBexio(t.setupDescription)}</p>
                <div className="integration-grid">
                    <article className="integration-required">
                        <span className="pricing-label">{linkBexio(t.requiredLabel)}</span>
                        <h3>{linkBexio(t.bexioRequirementTitle)}</h3><p>{linkBexio(t.bexioRequirementDescription)}</p>
                        <a href="https://www.bexio.com/" target="_blank" rel="noopener noreferrer" aria-label={'bexio.com — ' + t.externalLinkNewTab} title={t.externalLinkNewTab}>bexio.com <ExternalLink size={16} aria-hidden="true"/></a>
                    </article>
                    <article>
                        <span className="pricing-label">{linkBexio(t.optionalLabel)}</span>
                        <h3>{linkBexio(t.pingenTitle)}</h3><p>{linkBexio(t.pingenDescription)}</p>
                        <a href="https://www.pingen.com/" target="_blank" rel="noopener noreferrer" aria-label={'pingen.com — ' + t.externalLinkNewTab} title={t.externalLinkNewTab}>pingen.com <ExternalLink size={16} aria-hidden="true"/></a>
                    </article>
                    <article>
                        <span className="pricing-label">{linkBexio(t.optionalLabel)}</span>
                        <h3>{linkBexio(t.mailboxTitle)}</h3><p>{linkBexio(t.mailboxDescription)}</p>
                    </article>
                </div>
                <h3 className="onboarding-title">{linkBexio(t.onboardingTitle)}</h3>
                <ol className="onboarding-grid">{onboarding.map(([title, description]) => <li key={title}>
                    <h4>{linkBexio(title)}</h4><p>{linkBexio(description)}</p>
                </li>)}</ol>
            </section>
            <section className="section wrap" id="pricing">
                <div className="section-top">
                    <div>
                        <div className="kicker">{linkBexio(t.pricingEyebrow)}</div>
                        <h2>{linkBexio(t.pricingTitle)}<br/><span>{linkBexio(t.pricingAccent)}</span></h2></div>
                    <p>{linkBexio(t.pricingDescription)}</p></div>
                <div className="pricing-card">
                    <div><span className="pricing-label">{linkBexio(t.earlyClubAccess)}</span><h3>{linkBexio(t.pricingCardTitle)}</h3><p>{linkBexio(t.pricingCardDescription)}</p>
                        <div className="checks"><span><Check size={16}/><span className="check-copy">{linkBexio(t.pilotCheckSetup)}</span></span><span><Check
                            size={16}/><span className="check-copy">{linkBexio(t.pilotCheckRoles)}</span></span><span><Check size={16}/><span className="check-copy">{linkBexio(t.pilotCheckScope)}</span></span>
                        </div>
                    </div>
                    <div className="pricing-action"><strong>{linkBexio(t.pilot)}</strong><small>{linkBexio(t.termsSharedIndividually)}</small><a
                        className="btn primary" href="#pilot">{t.applyForPilot}<ArrowRight size={17}/></a></div>
                </div>
            </section>
            <section className="section pilot" id="pilot">
                <div className="wrap pilot-grid">
                    <div>
                        <div className="kicker">{linkBexio(t.bePartOfTheFirstTeam)}</div>
                        <h2>{linkBexio(t.yourClubDeserves)}<br/><span>{linkBexio(t.moreFootballContinuation)}</span></h2><p>{linkBexio(t.pilotDescription)}</p>
                        <div className="pilot-note">{linkBexio(t.pilotNote)}</div>
                    </div>
                    <form onSubmit={submit} className="pilot-form"><h3>{linkBexio(t.joinThePilotConversation)}</h3><label
                        htmlFor="club">{linkBexio(t.clubName)}</label><input id="club" required value={club}
                                                               onChange={e => setClub(e.target.value)}
                                                               placeholder={t.eGFcRiverside}/><label htmlFor="email">{linkBexio(t.workEmail)}</label><input id="email" required type="email" value={email}
                                            onChange={e => setEmail(e.target.value)} placeholder={t.youYourclubCh}/>
                        <button className="btn primary" type="submit">{t.contactUsAboutThePilot}<ArrowRight size={17}/>
                        </button>
                        <small>{submitted ? t.yourEmailAppShouldOpenWithAPreparedMessageNoDataHasBeenSubmittedToAServer : t.contactHint}</small>
                    </form>
                </div>
            </section>
            <section className="wrap section" aria-labelledby="news-title"><div className="kicker">{t.newsEyebrow}</div><h2 id="news-title">{t.news}</h2><p className="news-intro">{t.newsDescription}</p><NewsCards articles={news} locale={locale} readMore={t.newsReadMore}/><a className="btn secondary" href="/news">{t.newsAll}<ArrowRight size={18}/></a></section>
            <section className="faq wrap">
                <div className="kicker">{linkBexio(t.goodToKnow)}</div>
                <h2>{linkBexio(t.frequentlyAskedQuestions)}</h2>{questions.map(([q, a]) =>
                <details className="faq-item" name="site-faq" key={q}>
                    <summary><span>{linkBexio(q)}</span><ChevronDown size={20}/></summary>
                    <p>{linkBexio(a)}</p></details>)}</section>
            <section id="contact" className="wrap section contact-section" aria-labelledby="contact-title">
                <div className="kicker">{t.contactEyebrow}</div>
                <h2 id="contact-title">{t.contact}</h2>
                <p className="contact-intro">{t.contactDescription}</p>
                <div className="contact-grid">
                    <div className="contact-card">
                        <h3>kick-playr.ch</h3>
                        <address>Gablerackerstrasse 4<br/>8615 Wermatswil<br/>
                            <a href="mailto:info@kick-playr.ch">info@kick-playr.ch</a>
                        </address>
                        <a className="news-read contact-org-link" href="https://github.com/kick-playr" target="_blank" rel="noopener noreferrer"
                            aria-label={t.contactGitHubOrg + ' — ' + t.externalLinkNewTab}>{t.contactGitHubOrg}<ExternalLink size={17} aria-hidden="true"/></a>
                        <div className="contact-person"><span>{t.contactPerson}</span><strong>Lorenz Hänggi <span>aka Lolo</span></strong></div>
                        <div className="contact-profile-links"><a className="news-read" href="https://ch.linkedin.com/in/lorenzhaenggi" target="_blank" rel="noopener noreferrer"
                            aria-label={t.contactLinkedIn + ' — ' + t.externalLinkNewTab}>{t.contactLinkedIn}<ExternalLink size={17} aria-hidden="true"/></a>
                        <a className="news-read" href="https://github.com/lolo8304" target="_blank" rel="noopener noreferrer"
                            aria-label={t.contactGitHub + ' — ' + t.externalLinkNewTab}>{t.contactGitHub}<ExternalLink size={17} aria-hidden="true"/></a></div>
                    </div>
                    <article className="contact-bio" aria-labelledby="contact-bio-title">
                        <div className="kicker">{t.contactAbout}</div>
                        <h3 id="contact-bio-title">{t.contactTitle}</h3>
                        <p>{t.contactBio}</p><p>{t.contactClubBio.split(/(FC Rot-Weiss Winikon)/).map((part, index) =>
                            part === 'FC Rot-Weiss Winikon' ? <a key={index} className="club-link" href="https://fcrww.ch" target="_blank" rel="noopener noreferrer"
                                aria-label={part + ' — ' + t.externalLinkNewTab}>{part}<ExternalLink size={14} aria-hidden="true"/></a> : part
                        )}</p><p>{t.contactHackathons}</p>

                    </article>
                </div>
            </section>
        </main>
        <SiteFooter messages={t}/>
    </>
}
