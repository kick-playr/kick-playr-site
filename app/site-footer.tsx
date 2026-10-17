import ThemeLogo from './theme-logo';
import type {Messages} from '../intl/messages';

export default function SiteFooter({messages: t}: {messages: Messages}) {
    return <footer>
        <div className="wrap footer-inner">
            <div className="footer-brand">
                <a className="logo" href="/#top"><ThemeLogo alt="" width={40} height={40}/>kick-playr<span>.</span></a>
                <p>{t.lessAdminMoreFootball}<br/>{t.copyrightSymbol} {new Date().getFullYear()} {t.kickPlayrConceptWebsiteBrandAndDomainAvailabilityNotYetConfirmed}</p>
            </div>
            <div><a href="/#features">{t.features}</a><a href="/#pricing">{t.pricing}</a><a href="/#pilot">{t.joinPilot}</a><a href="/#contact">{t.contact}</a></div>
        </div>
    </footer>;
}
