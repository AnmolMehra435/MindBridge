import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart } from 'lucide-react';

export function Header() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <span className="font-heading font-semibold text-lg text-foreground hidden sm:block">
            Parent–Teen Bridge
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.home')}
          </button>
          <button
            onClick={() => scrollToSection('teen')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.teen')}
          </button>
          <button
            onClick={() => scrollToSection('parent')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.parent')}
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.about')}
          </button>
        </nav>

        <LanguageToggle />
      </div>
    </header>
  );
}
