'use client';
import {useState} from 'react';
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

const features = [{
    icon: Users,
    title: 'Teams & members',
    desc: 'Every player, parent and coach connected in one place.'
}, {
    icon: CalendarDays,
    title: 'Schedules',
    desc: 'Training, matches and events — always up to date.'
}, {
    icon: CreditCard,
    title: 'Payments',
    desc: 'Manage club fees and see what is still outstanding.'
}, {
    icon: MessageCircle,
    title: 'Communication',
    desc: 'Keep the entire club in the loop, without the chaos.'
}, {
    icon: ClipboardList,
    title: 'Club operations',
    desc: 'A clearer overview for volunteers and administrators.'
}, {icon: ShieldCheck, title: 'Roles & access', desc: 'Give each member the information they actually need.'}];
export default function Home() {
    const [menu, setMenu] = useState(false);
    const [email, setEmail] = useState('');
    const [club, setClub] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [faq, setFaq] = useState<number | null>(null);
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent('kick-playr pilot interest — ' + club);
        const body = encodeURIComponent(`Club: ${club}\nEmail: ${email}\n\nI'd like to hear about the kick-playr pilot.`);
        window.location.href = `mailto:pilot@kickplayr.app?subject=${subject}&body=${body}`;
        setSubmitted(true)
    };
    return <>
        <header className="nav wrap"><a href="#top" className="logo">kick-playr<span>.</span></a>
            <nav className={menu ? 'links open' : 'links'}><a onClick={() => setMenu(false)}
                                                              href="#features">Features</a><a
                onClick={() => setMenu(false)} href="#how">How it works</a><a onClick={() => setMenu(false)}
                                                                              href="#pricing">Pricing</a><a
                onClick={() => setMenu(false)} href="#pilot">For clubs</a></nav>
            <a className="nav-cta" href="#pilot">Join the pilot <ArrowRight size={16}/></a>
            <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X/> :
                <Menu/>}</button>
        </header>
        <main id="top">
            <section className="hero">
                <div className="hero-glow"/>
                <div className="wrap hero-grid">
                    <div className="hero-copy">
                        <div className="eyebrow"><span className="dot"/> THE NEW HOME FOR FOOTBALL CLUBS</div>
                        <h1>Less admin.<br/><em>More football.</em></h1><p>Everything your football club needs. Teams,
                        members, payments, schedules and communication — all in one app.</p>
                        <div className="actions"><a className="btn primary" href="#pilot">Join the pilot <ArrowRight
                            size={18}/></a><a className="btn secondary" href="#features">Explore features <ArrowRight
                            size={17}/></a></div>
                        <div className="hero-foot"><span>BUILT FOR GRASSROOTS FOOTBALL</span><span>DESIGNED FOR EVERY ROLE</span>
                        </div>
                    </div>
                    <div className="visual">
                        <div className="pitch-lines"/>
                        <div className="dashboard">
                            <div className="dash-top"><span className="dash-mark">kp<span>.</span></span><span
                                className="pill">Club overview</span><span className="avatar">FC</span></div>
                            <div className="dash-hello">Good morning, Coach <span>☀</span></div>
                            <div className="dash-sub">Here's what's happening at your club.</div>
                            <div className="stats">
                                <div><small>ACTIVE TEAMS</small><strong>8</strong><span>↗ Growing together</span></div>
                                <div><small>CLUB MEMBERS</small><strong>124</strong><span>Players & families</span>
                                </div>
                            </div>
                            <div className="dash-panel">
                                <div className="panel-title">Upcoming activity <CalendarDays size={16}/></div>
                                <div className="event">
                                    <div className="date">SAT<strong>24</strong></div>
                                    <div><b>Junior training</b><small>Main pitch · 10:00 AM</small></div>
                                    <span className="status">Confirmed</span></div>
                                <div className="event">
                                    <div className="date">SUN<strong>25</strong></div>
                                    <div><b>FC Riverside vs FC United</b><small>Home match · 2:00 PM</small></div>
                                    <ArrowRight size={16}/></div>
                            </div>
                            <div className="dash-bottom"><span><Users size={15}/> Teams</span><span><Wallet size={15}/> Payments</span><span><MessageCircle
                                size={15}/> Messages</span></div>
                        </div>
                        <div className="floating">
                            <div className="float-icon"><Check size={18}/></div>
                            <div><b>All in one place</b><small>One club. One connected team.</small></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="strip">
                <div className="wrap strip-inner"><span>LESS SPREADSHEETS.</span><span>FEWER GROUP CHATS.</span><span>MORE TIME ON THE PITCH.</span>
                </div>
            </section>
            <section className="section wrap" id="features">
                <div className="section-top">
                    <div>
                        <div className="kicker">EVERYTHING CONNECTED</div>
                        <h2>One club.<br/><span>One powerful app.</span></h2></div>
                    <p>From the boardroom to the touchline, bring every part of your football club together.</p></div>
                <div className="feature-grid">{features.map(f => <article className="feature" key={f.title}>
                    <div className="feature-icon">
                        <f.icon size={23}/>
                    </div>
                    <h3>{f.title}</h3><p>{f.desc}</p><ArrowRight className="feature-arrow" size={18}/></article>)}</div>
            </section>
            <section className="section how" id="how">
                <div className="wrap">
                    <div className="kicker">BUILT FOR REAL CLUB LIFE</div>
                    <h2>Football is a team sport.<br/><span>Running a club should be too.</span></h2>
                    <div className="steps">
                        <div><span>01</span><h3>Set up your club</h3><p>Bring your teams, members and roles together in
                            one workspace.</p></div>
                        <div><span>02</span><h3>Keep everyone in sync</h3><p>Make schedules, information and
                            communication easy to find.</p></div>
                        <div><span>03</span><h3>Focus on the game</h3><p>Spend less time coordinating admin and more
                            time on football.</p></div>
                    </div>
                </div>
            </section>
            <section className="section wrap" id="pricing">
                <div className="section-top">
                    <div>
                        <div className="kicker">SIMPLE FROM DAY ONE</div>
                        <h2>Made for clubs.<br/><span>Not complicated budgets.</span></h2></div>
                    <p>We’re shaping kick-playr with grassroots clubs. Final pricing will be announced after the
                        pilot.</p></div>
                <div className="pricing-card">
                    <div><span className="pricing-label">EARLY CLUB ACCESS</span><h3>Join the founding clubs</h3><p>Help
                        shape a better way to run grassroots football.</p>
                        <div className="checks"><span><Check size={16}/> Product feedback sessions</span><span><Check
                            size={16}/> Early feature previews</span><span><Check size={16}/> Pilot onboarding discussions</span>
                        </div>
                    </div>
                    <div className="pricing-action"><strong>Pilot</strong><small>Terms shared individually</small><a
                        className="btn primary" href="#pilot">Apply for pilot <ArrowRight size={17}/></a></div>
                </div>
            </section>
            <section className="section pilot" id="pilot">
                <div className="wrap pilot-grid">
                    <div>
                        <div className="kicker">BE PART OF THE FIRST TEAM</div>
                        <h2>Your club deserves<br/><span>more football.</span></h2><p>We’re looking for grassroots
                        football clubs to help shape the first release of kick-playr.</p>
                        <div className="pilot-note">Starting with clubs in Switzerland.</div>
                    </div>
                    <form onSubmit={submit} className="pilot-form"><h3>Join the pilot conversation</h3><label
                        htmlFor="club">Club name</label><input id="club" required value={club}
                                                               onChange={e => setClub(e.target.value)}
                                                               placeholder="e.g. FC Riverside"/><label htmlFor="email">Work
                        email</label><input id="email" required type="email" value={email}
                                            onChange={e => setEmail(e.target.value)} placeholder="you@yourclub.ch"/>
                        <button className="btn primary" type="submit">Contact us about the pilot <ArrowRight size={17}/>
                        </button>
                        <small>{submitted ? 'Your email app should open with a prepared message. No data has been submitted to a server.' : 'This demo opens your email app. Connect a CRM or API before launch.'}</small>
                    </form>
                </div>
            </section>
            <section className="faq wrap">
                <div className="kicker">GOOD TO KNOW</div>
                <h2>Frequently asked
                    questions</h2>{[['Who is kick-playr for?', 'kick-playr is being designed for grassroots football clubs, especially small volunteer-led clubs.'], ['Is the product available now?', 'The product is in the pilot-planning stage. This page is a design prototype, not a live product announcement.'], ['How much will it cost?', 'Pricing has not been finalized. Pilot terms will be discussed directly with interested clubs.']].map(([q, a], i) =>
                <div className="faq-item" key={q}>
                    <button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}>{q}<ChevronDown
                        size={20}/></button>
                    {faq === i && <p>{a}</p>}</div>)}</section>
        </main>
        <footer>
            <div className="wrap footer-inner">
                <div><a className="logo" href="#top">kick-playr<span>.</span></a><p>Less admin. More football.</p></div>
                <div><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#pilot">Join pilot</a></div>
            </div>
            <div className="wrap fineprint">© {new Date().getFullYear()} kick-playr. Concept website · Brand and domain
                availability not yet confirmed.
            </div>
        </footer>
    </>
}
