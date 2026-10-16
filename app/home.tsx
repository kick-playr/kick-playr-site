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
    const features = [{
    icon: Users,
    title: t.teamsMembers,
    desc: t.everyPlayerParentAndCoachConnectedInOnePlace
}, {
    icon: CalendarDays,
    title: t.schedules,
    desc: t.trainingMatchesAndEventsAlwaysUpToDate
}, {
    icon: CreditCard,
    title: t.payments,
    desc: t.manageClubFeesAndSeeWhatIsStillOutstanding
}, {
    icon: MessageCircle,
    title: t.communication,
    desc: t.keepTheEntireClubInTheLoopWithoutTheChaos
}, {
    icon: ClipboardList,
    title: t.clubOperations,
    desc: t.aClearerOverviewForVolunteersAndAdministrators
}, {icon: ShieldCheck, title: t.rolesAccess, desc: t.giveEachMemberTheInformationTheyActuallyNeed}];

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
        <header className="nav wrap"><a href="#top" className="logo"><Image src="/kick-playr-logo.png" alt="" width={56} height={56} priority/>kick-playr<span>.</span></a>
            <nav className={menu ? 'links open' : 'links'}><a onClick={() => setMenu(false)}
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
            <button className="menu" onClick={() => setMenu(!menu)} aria-label={t.toggleMenu}>{menu ? <X/> :
                <Menu/>}</button>
        </header>
        <main id="top">
            <section className="hero">
                <div className="hero-glow"/>
                <div className="wrap hero-grid">
                    <div className="hero-copy">
                        <div className="eyebrow"><span className="dot"/> {t.theNewHomeForFootballClubs}</div>
                        <h1>{t.lessAdmin}<br/><em>{t.moreFootball}</em></h1><p>{t.everythingYourFootballClubNeedsTeamsMembersPaymentsSchedulesAndCommunicationAllInOneApp}</p>
                        <div className="actions"><a className="btn primary" href="#pilot">{t.joinThePilot}<ArrowRight
                            size={18}/></a><a className="btn secondary" href="#features">{t.exploreFeatures}<ArrowRight
                            size={17}/></a></div>
                        <div className="hero-foot"><span>{t.builtForGrassrootsFootball}</span><span>{t.designedForEveryRole}</span>
                        </div>
                    </div>
                    <div className="visual">
                        <div className="pitch-lines"/>
                        <div className="dashboard">
                            <div className="dash-top"><Image src="/kick-playr-logo.png" alt="kick-playr" width={40} height={40}/><span
                                className="pill">{t.clubOverview}</span><span className="avatar">FC</span></div>
                            <div className="dash-hello">{t.goodMorningCoach} <span>☀</span></div>
                            <div className="dash-sub">{t.hereSWhatSHappeningAtYourClub}</div>
                            <div className="stats">
                                <div><small>{t.activeTeams}</small><strong>8</strong><span>{t.growingTogether}</span></div>
                                <div><small>{t.clubMembers}</small><strong>124</strong><span>{t.playersFamilies}</span>
                                </div>
                            </div>
                            <div className="dash-panel">
                                <div className="panel-title">{t.upcomingActivity}<CalendarDays size={16}/></div>
                                <div className="event">
                                    <div className="date">{t.sat}<strong>24</strong></div>
                                    <div><b>{t.juniorTraining}</b><small>{t.mainPitch1000Am}</small></div>
                                    <span className="status">{t.confirmed}</span></div>
                                <div className="event">
                                    <div className="date">{t.sun}<strong>25</strong></div>
                                    <div><b>{t.fcRiversideVsFcUnited}</b><small>{t.homeMatch200Pm}</small></div>
                                    <ArrowRight size={16}/></div>
                            </div>
                            <div className="dash-bottom"><span><Users size={15}/> {t.teams}</span><span><Wallet size={15}/> {t.payments}</span><span><MessageCircle
                                size={15}/> {t.messages}</span></div>
                        </div>
                        <div className="floating">
                            <div className="float-icon"><Check size={18}/></div>
                            <div><b>{t.allInOnePlace}</b><small>{t.oneClubOneConnectedTeam}</small></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="strip">
                <div className="wrap strip-inner"><span>{t.lessSpreadsheets}</span><span>{t.fewerGroupChats}</span><span>{t.moreTimeOnThePitch}</span>
                </div>
            </section>
            <section className="section wrap" id="features">
                <div className="section-top">
                    <div>
                        <div className="kicker">{t.everythingConnected}</div>
                        <h2>{t.oneClub}<br/><span>{t.onePowerfulApp}</span></h2></div>
                    <p>{t.fromTheBoardroomToTheTouchlineBringEveryPartOfYourFootballClubTogether}</p></div>
                <div className="feature-grid">{features.map(f => <article className="feature" key={f.title}>
                    <div className="feature-icon">
                        <f.icon size={23}/>
                    </div>
                    <h3>{f.title}</h3><p>{f.desc}</p><ArrowRight className="feature-arrow" size={18}/></article>)}</div>
            </section>
            <section className="section how" id="how">
                <div className="wrap">
                    <div className="kicker">{t.builtForRealClubLife}</div>
                    <h2>{t.footballIsATeamSport}<br/><span>{t.runningAClubShouldBeToo}</span></h2>
                    <div className="steps">
                        <div><span>01</span><h3>{t.setUpYourClub}</h3><p>{t.bringYourTeamsMembersAndRolesTogetherInOneWorkspace}</p></div>
                        <div><span>02</span><h3>{t.keepEveryoneInSync}</h3><p>{t.makeSchedulesInformationAndCommunicationEasyToFind}</p></div>
                        <div><span>03</span><h3>{t.focusOnTheGame}</h3><p>{t.spendLessTimeCoordinatingAdminAndMoreTimeOnFootball}</p></div>
                    </div>
                </div>
            </section>
            <section className="section wrap" id="pricing">
                <div className="section-top">
                    <div>
                        <div className="kicker">{t.simpleFromDayOne}</div>
                        <h2>{t.madeForClubs}<br/><span>{t.notComplicatedBudgets}</span></h2></div>
                    <p>{t.weReShapingKickPlayrWithGrassrootsClubsFinalPricingWillBeAnnouncedAfterThePilot}</p></div>
                <div className="pricing-card">
                    <div><span className="pricing-label">{t.earlyClubAccess}</span><h3>{t.joinTheFoundingClubs}</h3><p>{t.helpShapeABetterWayToRunGrassrootsFootball}</p>
                        <div className="checks"><span><Check size={16}/> {t.productFeedbackSessions}</span><span><Check
                            size={16}/> {t.earlyFeaturePreviews}</span><span><Check size={16}/> {t.pilotOnboardingDiscussions}</span>
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
                        <h2>{t.yourClubDeserves}<br/><span>{t.moreFootballContinuation}</span></h2><p>{t.weReLookingForGrassrootsFootballClubsToHelpShapeTheFirstReleaseOfKickPlayr}</p>
                        <div className="pilot-note">{t.startingWithClubsInSwitzerland}</div>
                    </div>
                    <form onSubmit={submit} className="pilot-form"><h3>{t.joinThePilotConversation}</h3><label
                        htmlFor="club">{t.clubName}</label><input id="club" required value={club}
                                                               onChange={e => setClub(e.target.value)}
                                                               placeholder={t.eGFcRiverside}/><label htmlFor="email">{t.workEmail}</label><input id="email" required type="email" value={email}
                                            onChange={e => setEmail(e.target.value)} placeholder={t.youYourclubCh}/>
                        <button className="btn primary" type="submit">{t.contactUsAboutThePilot}<ArrowRight size={17}/>
                        </button>
                        <small>{submitted ? t.yourEmailAppShouldOpenWithAPreparedMessageNoDataHasBeenSubmittedToAServer : t.thisDemoOpensYourEmailAppConnectACrmOrApiBeforeLaunch}</small>
                    </form>
                </div>
            </section>
            <section className="faq wrap">
                <div className="kicker">{t.goodToKnow}</div>
                <h2>{t.frequentlyAskedQuestions}</h2>{[[t.whoIsKickPlayrFor, t.kickPlayrIsBeingDesignedForGrassrootsFootballClubsEspeciallySmallVolunteerLedClubs], [t.isTheProductAvailableNow, t.theProductIsInThePilotPlanningStageThisPageIsADesignPrototypeNotALiveProductAnnouncement], [t.howMuchWillItCost, t.pricingHasNotBeenFinalizedPilotTermsWillBeDiscussedDirectlyWithInterestedClubs]].map(([q, a], i) =>
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
