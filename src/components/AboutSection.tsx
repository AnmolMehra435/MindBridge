import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Users, Shield, MessageCircleHeart } from 'lucide-react';

export function AboutSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Heart,
      title: 'Empathy First',
      description: 'Every feature is designed with understanding and compassion at its core.',
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'No raw messages are ever shared. Only translated, empathetic insights.',
    },
    {
      icon: Users,
      title: 'Bridge Building',
      description: 'Helping parents and teens connect through better understanding.',
    },
    {
      icon: MessageCircleHeart,
      title: 'Simple Communication',
      description: 'Easy-to-use interface for all ages and technical abilities.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* GDG Badge */}
          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/5 rounded-full border border-primary/20">
              <span className="text-sm font-medium text-primary">
                🏆 Built for GDG Hackathon – Social Impact & Mental Health
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
