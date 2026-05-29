import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Award, 
  Users, 
  Building2, 
  Briefcase,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FileText,
  Calendar
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, TextReveal } from '../components/shared/AnimatedWrapper';

// Mock Data for Slides
const heroSlides = [
  {
    id: 1,
    title: 'Nurturing Innovation, Building Futures',
    subtitle: 'Sir Padampat Singhania University provides a pathway to extraordinary engineering, management, and research excellence.',
    badge: 'Admissions Open 2026-27',
    ctaText: 'Apply Now',
    ctaLink: '/admissions',
    bgGradient: 'from-violet-900/60 via-background/90 to-background',
    themeColor: 'text-violet-500'
  },
  {
    id: 2,
    title: 'Industry-Integrated Learning Experiences',
    subtitle: 'Partnered with top corporate leaders to provide students with live internship modules and direct career pipelines.',
    badge: '100% Placement Record',
    ctaText: 'Explore Placements',
    ctaLink: '/placements',
    bgGradient: 'from-blue-900/60 via-background/90 to-background',
    themeColor: 'text-blue-500'
  },
  {
    id: 3,
    title: 'Distinguished Mentors and Global Scholars',
    subtitle: 'Learn from research-driven professors with specialized Ph.Ds and strong backgrounds in global academics.',
    badge: 'World-Class Faculty',
    ctaText: 'Meet Faculty',
    ctaLink: '/faculty',
    bgGradient: 'from-emerald-900/60 via-background/90 to-background',
    themeColor: 'text-emerald-500'
  }
];

// Stats Section
const stats = [
  { label: 'Highest Package', value: '18 LPA', sub: 'Placement High', icon: Briefcase },
  { label: 'Placements Rate', value: '95%', sub: 'Class of 2025', icon: TrendingUp },
  { label: 'Distinguished Faculty', value: '80+', sub: 'PhD & Research Leads', icon: Users },
  { label: 'Accreditation & Partners', value: '35+', sub: 'Corporate Affiliates', icon: Award },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Carousel */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b">
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
        <AnimatePresence mode="wait">
          {heroSlides.map((slide, idx) => idx === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} flex items-center`}
            >
              {/* Dynamic Abstract Art Graphics */}
              <div className="absolute top-1/4 right-1/10 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
              <div className="absolute bottom-1/4 left-1/10 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
              
              <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-3xl space-y-6">
                  {/* Badge */}
                  <motion.span 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 text-primary"
                  >
                    {slide.badge}
                  </motion.span>
                  
                  {/* Title */}
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-foreground">
                    <TextReveal text={slide.title} delay={0.3} />
                  </h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-xl"
                  >
                    {slide.subtitle}
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap gap-4 pt-2"
                  >
                    <Link
                      to={slide.ctaLink}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg shadow-primary/20 hover:bg-primary/95 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      {slide.ctaText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-border bg-background/50 hover:bg-muted font-semibold rounded-full transition-all duration-200"
                    >
                      Contact Advisory
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Carousel Navigation Controllers */}
        <div className="absolute bottom-10 right-10 flex space-x-3 z-20">
          <button 
            onClick={handlePrev} 
            className="p-2.5 rounded-full border border-border bg-background/30 backdrop-blur hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={handleNext} 
            className="p-2.5 rounded-full border border-border bg-background/30 backdrop-blur hover:bg-muted transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* 2. Achievements Statistics */}
      <section className="py-16 md:py-24 bg-card border-b">
        <div className="container mx-auto px-6">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={i} className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-muted/30 transition-colors duration-300">
                  <div className="p-3 bg-primary/10 rounded-full text-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">{stat.value}</h3>
                  <p className="text-sm font-bold mt-2 text-foreground/90">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. University Overview & Vision */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden border-b">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <FadeIn>
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary">SPSU Overview</span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                  Where Education Meets Real-World Legacy
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Sir Padampat Singhania University (SPSU), established under the legacy of the JK Cement Group, brings industry-grade pedagogy to the beautiful city of Udaipur. We align classroom syllabus with active research programs and modern engineering pipelines to groom career-ready visionaries.
                </p>
              </FadeIn>
              <FadeIn delay={0.3} className="space-y-4 pt-2">
                <div className="flex gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-violet-600/10 text-violet-600 h-10 w-10 flex-shrink-0 flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base">State-of-the-Art Infrastructure</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">Equipped with specialized fabrication labs, chemical testing areas, and fully modernized computer networks.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 p-2 rounded-lg bg-emerald-600/10 text-emerald-600 h-10 w-10 flex-shrink-0 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base">Personalized Faculty Mentoring</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">Maintains a premium student-to-teacher ratio allowing for intensive academic project support.</p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Illustrative Graphics Container */}
            <div className="lg:col-span-6 flex justify-center relative">
              <FadeIn direction="left" delay={0.3} className="w-full max-w-lg aspect-video lg:aspect-square bg-gradient-to-br from-primary/10 to-violet-600/20 rounded-2xl border flex items-center justify-center p-8 overflow-hidden relative shadow-lg shadow-muted/50">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background/0 via-background/40 to-background" />
                
                {/* Simulated Modern Campus Blueprint Vector Graphic */}
                <div className="relative text-center space-y-4 z-10">
                  <div className="inline-block p-4 rounded-2xl bg-background border shadow-md">
                    <Building2 className="h-10 w-10 text-primary animate-pulse" />
                  </div>
                  <h3 className="font-bold text-lg">Academic Excellence Centers</h3>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto">Providing practical training systems in Advanced Computing, Mechatronics, and Entrepreneurship.</p>
                  <Link to="/academics" className="inline-flex items-center text-xs font-bold text-primary hover:underline">
                    Learn about Departments <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Upcoming Events & News Feed preview */}
      <section className="py-20 md:py-32 bg-muted/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Stay Updated</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-2">News & Campus Events</h2>
            </div>
            <Link to="/news" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-background border rounded-full text-sm font-semibold hover:bg-muted transition-all">
              Go to Newsroom
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News Post 1 */}
            <FadeIn delay={0.1} className="flex flex-col bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-tr from-violet-600/30 to-primary/20 border-b flex items-center justify-center p-4">
                <FileText className="h-12 w-12 text-primary" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-primary uppercase">Academic Press</span>
                  <h3 className="font-bold text-lg mt-2 line-clamp-2">SPSU Partners with Global Research Networks for Tech Innovation</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    Collaboration enables faculty exchange and direct research access to cloud and AI training clusters.
                  </p>
                </div>
                <div className="pt-6 border-t mt-6 flex justify-between items-center text-xs text-muted-foreground">
                  <span>May 28, 2026</span>
                  <span className="font-semibold text-primary hover:underline cursor-pointer">Read Article</span>
                </div>
              </div>
            </FadeIn>

            {/* News Post 2 */}
            <FadeIn delay={0.2} className="flex flex-col bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-tr from-emerald-600/30 to-teal-600/20 border-b flex items-center justify-center p-4">
                <TrendingUp className="h-12 w-12 text-emerald-600" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase">Placements</span>
                  <h3 className="font-bold text-lg mt-2 line-clamp-2">Engineering Stream Clinches Record Placements in Early Recruitment</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    Over 80% of final year computer science students placed in top tech companies within week one of hiring drive.
                  </p>
                </div>
                <div className="pt-6 border-t mt-6 flex justify-between items-center text-xs text-muted-foreground">
                  <span>May 25, 2026</span>
                  <span className="font-semibold text-primary hover:underline cursor-pointer">Read Article</span>
                </div>
              </div>
            </FadeIn>

            {/* Event Post 3 */}
            <FadeIn delay={0.3} className="flex flex-col bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-tr from-blue-600/30 to-indigo-600/20 border-b flex items-center justify-center p-4">
                <Calendar className="h-12 w-12 text-blue-600" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase">Upcoming Event</span>
                  <h3 className="font-bold text-lg mt-2 line-clamp-2">SPSU TechFest 2026: National Level Hackathon Registration Opens</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    Over 50 teams from premier institutions across the country compete in 36-hour software and hardware prototyping hackathon.
                  </p>
                </div>
                <div className="pt-6 border-t mt-6 flex justify-between items-center text-xs text-muted-foreground">
                  <span>June 15, 2026</span>
                  <span className="font-semibold text-primary hover:underline cursor-pointer">Register Now</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. Final CTA Callout */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-violet-600/60 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 text-center max-w-4xl space-y-6 relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary-foreground/80">Begin Your Journey</span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Ready to Shape the Future of Science & Business?
          </h2>
          <p className="text-base sm:text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Our admissions portal is currently processing early applications. Speak directly with an expert counsellor or configure your admissions enquiry today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground font-bold rounded-full shadow-lg shadow-black/10 hover:bg-muted transition-all duration-200 hover:-translate-y-0.5"
            >
              Get Prospectus
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary-foreground/20 hover:bg-primary-foreground/10 font-bold rounded-full transition-all duration-200"
            >
              Admissions Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
