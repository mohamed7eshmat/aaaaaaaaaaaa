import { Button } from "@/components/ui/button";
import { Languages, Sun, Moon } from "lucide-react";
import { useApp } from "@/contexts/AppProviders";
import Logo from "./Logo";

const Navbar = () => {
  const { t, toggleLocale, theme, toggleTheme, locale } = useApp();
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-border">
        <div className="container flex h-24 sm:h-32 items-center justify-between gap-3">
          <a href="#" className="flex items-center gap-2 shrink-0" aria-label="Mujeb home">
            <Logo className="h-16 sm:h-20 w-auto" priority />
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#how" className="hover:text-foreground transition-colors">{t("nav.how")}</a>
            <a href="#demos" className="hover:text-foreground transition-colors">{t("nav.demos")}</a>
            <a href="#try-agent" className="hover:text-foreground transition-colors">{t("nav.tryAgent")}</a>
            <a href="#calculator" className="hover:text-foreground transition-colors">{t("nav.calculator")}</a>
            <a href="#why" className="hover:text-foreground transition-colors">{t("nav.why")}</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">{t("nav.pricing")}</a>
            <a href="#faq" className="hover:text-foreground transition-colors">{t("nav.faq")}</a>
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={toggleLocale}
              aria-label="Toggle language"
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              <Languages className="h-4 w-4" />
              <span className="hidden sm:inline">{locale === "en" ? "العربية" : "English"}</span>
            </button>
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t("nav.toggleTheme.light") : t("nav.toggleTheme.dark")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
              <a href="#try-agent">{t("nav.bookDemo")}</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
