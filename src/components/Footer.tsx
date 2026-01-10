import { useLanguage } from '@/contexts/LanguageContext';
import { Heart } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 bg-muted border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <span className="font-heading font-semibold text-foreground">
              Parent–Teen Bridge
            </span>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-muted-foreground text-center max-w-xl">
            ⚠️ {t('footer.disclaimer')}
          </p>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © 2026 Parent–Teen Bridge. Made with ❤️ for better family connections.
          </p>
        </div>
      </div>
    </footer>
  );
}
