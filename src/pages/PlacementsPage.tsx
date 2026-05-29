import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Building2, 
  ArrowUpRight, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/shared/AnimatedWrapper';

const statistics = [
  { label: 'Highest Package Offered', value: '18.0 LPA', icon: Award, desc: 'Secured by B.Tech CSE Student' },
  { label: 'Average Package (CSE)', value: '6.8 LPA', icon: TrendingUp, desc: 'Consistent growth year-on-year' },
  { label: 'Overall Placement Rate', value: '95%', icon: Building2, desc: 'Across all engineering streams' },
  { label: 'Corporate Recruiters', value: '150+', icon: Briefcase, desc: 'Active hiring partnerships' }
];

const recruiters = [
  { name: 'JK Cement', sector: 'Manufacturing' },
  { name: 'Synopsys', sector: 'VLSI & Tech' },
  { name: 'TCS', sector: 'IT Services' },
  { name: 'Cognizant', sector: 'Software' },
  { name: 'Wipro', sector: 'Consulting' },
  { name: 'Infosys', sector: 'Technology' },
  { name: 'Tech Mahindra', sector: 'IT Solutions' },
  { name: 'HDFC Bank', sector: 'Finance' }
];

const successStories = [
  {
    name: 'Aarav Sharma',
    program: 'B.Tech Computer Science (Class of 2025)',
    company: 'Synopsys',
    package: '15.0 LPA',
    text: 'SPSU gave me direct access to specialized VLSI training labs and cloud compute servers. The mentorship from faculty helped me clear the multi-round tech assessment and secure early placement.'
  },
  {
    name: 'Ananya Vyas',
    program: 'B.Tech Cloud Computing (Class of 2025)',
    company: 'Cognizant',
    package: '8.5 LPA',
    text: 'The mock interviewing drives organized by the Career Services Desk prepared me perfectly for client interactions. The practical project modules aligned exactly with modern software delivery.'
  },
  {
    name: 'Kabir Mehta',
    program: 'MBA Operations & Logistics (Class of 2024)',
    company: 'JK Cement',
    package: '12.0 LPA',
    text: 'Being partnered with corporate conglomerates like JK Cement allowed us to work on live logistics optimization problems. The case-study methodology was incredibly rewarding.'
  }
];

const historicalData = [
  { year: '2022', highest: '12.5 LPA', average: '5.2 LPA', rate: '92%' },
  { year: '2023', highest: '15.0 LPA', average: '5.9 LPA', rate: '94%' },
  { year: '2024', highest: '16.5 LPA', average: '6.2 LPA', rate: '95%' },
  { year: '2025', highest: '18.0 LPA', average: '6.8 LPA', rate: '95%' }
];

export default function PlacementsPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % successStories.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900/10 via-background to-secondary/20 border-b overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 text-center max-w-3xl space-y-6 relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Placements & Careers</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Bridging Dreams and Destinations
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Discover our placement statistics, top recruitment partners, and the journey of our students transitioning to global professionals.
          </p>
        </div>
      </section>

      {/* 2. Key Metrics Grid */}
      <section className="py-20 bg-background border-b">
        <div className="container mx-auto px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={i} className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-4xl font-extrabold tracking-tight">{stat.value}</h3>
                  <p className="font-bold text-sm text-foreground/80 mt-2">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.desc}</p>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. Recruitment Partners */}
      <section className="py-20 bg-muted/10 border-b">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Our Top Recruiter Network</h2>
            <p className="text-muted-foreground mt-2">Prominent industry leaders regularly hiring candidates from SPSU.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {recruiters.map((company, i) => (
              <FadeIn key={i} delay={i * 0.05} className="p-6 bg-card border rounded-xl text-center flex flex-col justify-center items-center shadow-sm hover:scale-[1.02] transition-transform duration-200">
                <span className="font-black text-xl text-foreground/90">{company.name}</span>
                <span className="text-xs text-primary font-semibold mt-2.5 px-2 py-0.5 rounded-full bg-primary/10">
                  {company.sector}
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Placement Success Stories (Carousel) */}
      <section className="py-20 bg-background border-b overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Success Stories</h2>
            <p className="text-muted-foreground mt-2">Hear directly from our alumni placed at premium organizations.</p>
          </div>

          <div className="relative border rounded-2xl p-8 md:p-12 bg-card shadow-sm">
            <div className="absolute top-8 left-8 text-primary/10">
              <Quote className="h-20 w-20" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 relative z-10"
              >
                <p className="text-base sm:text-lg md:text-xl font-medium text-foreground leading-relaxed italic">
                  "{successStories[currentTestimonial].text}"
                </p>
                <div className="border-t pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-lg text-foreground">{successStories[currentTestimonial].name}</h4>
                    <p className="text-sm text-muted-foreground">{successStories[currentTestimonial].program}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-muted/30 px-4 py-2 rounded-xl border w-fit">
                    <div>
                      <p className="text-xs text-muted-foreground">Placed at</p>
                      <p className="text-sm font-bold text-primary">{successStories[currentTestimonial].company}</p>
                    </div>
                    <div className="border-l pl-4">
                      <p className="text-xs text-muted-foreground">Package</p>
                      <p className="text-sm font-bold text-emerald-600">{successStories[currentTestimonial].package}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={prevTestimonial}
                className="p-2.5 rounded-full border hover:bg-muted transition-colors"
                aria-label="Previous story"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2.5 rounded-full border hover:bg-muted transition-colors"
                aria-label="Next story"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Historical Trends & Table */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Placement Performance Trends</h2>
            <p className="text-muted-foreground mt-2">Track the record and progression of student hiring outcomes over recent years.</p>
          </div>

          <div className="border rounded-2xl bg-card overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="p-5">Academic Year</th>
                    <th className="p-5">Highest Package</th>
                    <th className="p-5">Average Package</th>
                    <th className="p-5 text-right">Placement Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {historicalData.map((data, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="p-5 font-bold text-foreground">{data.year}</td>
                      <td className="p-5 font-semibold text-primary">{data.highest}</td>
                      <td className="p-5 text-muted-foreground">{data.average}</td>
                      <td className="p-5 text-right font-bold text-emerald-600">{data.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <span>Official placement audits compiled by Career Services Desk.</span>
            <a href="#" className="font-semibold text-primary hover:underline inline-flex items-center gap-0.5">
              Download Audit Report
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
