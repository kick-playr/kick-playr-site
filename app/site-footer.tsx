import ThemeLogo from './theme-logo';
import type {Messages} from '../intl/messages';
export default function SiteFooter({messages: t}: {messages: Messages}) {return <>        <footer>
            <div className="wrap footer-inner">
                <div><a className="logo" href="/#top"><ThemeLogo alt="" width={56} height={56}/>kick-playr<span>.</span></a><p>{t.lessAdminMoreFootball}</p></div>
                <div><a href="/#features">{t.features}</a><a href="/#pricing">{t.pricing}</a><a href="/#pilot">{t.joinPilot}</a></div>
            </div>
            <div className="wrap fineprint">{t.copyrightSymbol} {new Date().getFullYear()} {t.kickPlayrConceptWebsiteBrandAndDomainAvailabilityNotYetConfirmed}</div>
        </footer></>;}
