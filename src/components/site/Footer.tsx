import { Mail, Globe } from "lucide-react";
import { useApp } from "@/contexts/AppProviders";
import Logo from "./Logo";

const Footer = () => {
  const { t } = useApp();
  return (
    <footer className="border-t border-border py-10 mt-10">
      <div className="container grid gap-8 md:grid-cols-3 items-start">
        <div>
          <a href="#" className="inline-flex items-center" aria-label="Mujeb home">
            <Logo className="h-16 sm:h-20 w-auto" />
          </a>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            {t("footer.tagline")}
          </p>
        </div>

        <div className="text-sm">
          <h4 className="font-display font-semibold mb-3">{t("footer.contact")}</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="https://mujeb.online" className="inline-flex items-center gap-2 hover:text-foreground transition-colors" dir="ltr">
                <Globe className="h-4 w-4 text-primary" />
                mujeb.online
              </a>
            </li>
            <li>
              <a href="#try-agent" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                {t("footer.bookDemo")}
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm md:text-end">
          <h4 className="font-display font-semibold mb-3">{t("footer.explore")}</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#how" className="hover:text-foreground transition-colors">{t("nav.how")}</a></li>
            <li><a href="#demos" className="hover:text-foreground transition-colors">{t("nav.demos")}</a></li>
            <li><a href="#try-agent" className="hover:text-foreground transition-colors">{t("nav.tryAgent")}</a></li>
            <li><a href="#pricing" className="hover:text-foreground transition-colors">{t("nav.pricing")}</a></li>
          </ul>
        </div>
      </div>

      <div className="container mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Mujeb. {t("footer.rights")}</p>
        <p>mujeb.online</p>
      </div>
    </footer>
  );
};

export default Footer;
