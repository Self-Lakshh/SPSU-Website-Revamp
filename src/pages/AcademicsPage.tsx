import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Layers, 
  GraduationCap, 
  ChevronDown, 
  Download, 
  ArrowRight,
  BookOpen,
  Wrench,
  Palette,
  Scale
} from 'lucide-react';

const departments = [
  {
    id: 'cse',
    name: 'Department of Computing and Informatics',
    icon: Cpu,
    desc: 'Offering cutting-edge education in Computer Science and Engineering, Artificial Intelligence, Machine Learning, Cloud Computing, and Information Security in partnership with global industry leaders like IBM and Xebia.',
    labs: ['Advanced Computations Lab', 'AI & Deep Learning Fab', 'Network & Security Cyber-Range'],
    programs: [
      { name: 'B.Tech in Computer Science and Engineering', duration: '4 Years', eligibility: '10+2 with Physics, Mathematics, and Chemistry/Computer Science with minimum 60% aggregate marks. Admission based on JEE Main / SPSAT scores.', fee: '₹1.2L / semester', syllabus: 'https://spsu.ac.in/downloads/syllabus/btech-cse-2024.pdf' },
      { name: 'Master of Computer Applications (MCA)', duration: '2 Years', eligibility: 'Passed BCA/Bachelor Degree in Computer Science Engineering or equivalent degree with minimum 50% marks.', fee: '₹70K / semester', syllabus: 'https://spsu.ac.in/downloads/syllabus/mca-2024.pdf' },
      { name: 'Ph.D in Computer Science and Engineering', duration: '3-6 Years', eligibility: 'Master\'s degree in Engineering/Technology with minimum 55% marks.', fee: '₹40K / semester', syllabus: 'https://spsu.ac.in/downloads/syllabus/phd-cse.pdf' }
    ]
  },
  {
    id: 'fiat',
    name: 'Department of Integrated and Advanced Technology',
    icon: Wrench,
    desc: 'Fostering engineering innovators across Mechanical, Mining, Civil, Electrical, and Biotechnology disciplines, equipped with advanced laboratories and industry training programs by L&T EduTech.',
    labs: ['CAD/CAM Testing Lab', 'Advanced Machinery Workshop', 'Biotechnology Fabrication Cell'],
    programs: [
      { name: 'B.Tech in Mining Engineering', duration: '4 Years', eligibility: '10+2 with Physics, Mathematics, and Chemistry with minimum 55% aggregate marks. Direct entry options for JK Cement sponsored candidates.', fee: '₹95K / semester', syllabus: 'https://spsu.ac.in/downloads/syllabus/btech-mining.pdf' },
      { name: 'B.Tech in Biotechnology', duration: '4 Years', eligibility: '10+2 with Physics, Chemistry, and Biology/Mathematics with minimum 55% aggregate marks.', fee: '₹95K / semester', syllabus: 'https://spsu.ac.in/downloads/syllabus/btech-biotech.pdf' }
    ]
  },
  {
    id: 'sciences',
    name: 'Department of Sciences',
    icon: BookOpen,
    desc: 'Providing strong foundational knowledge in Applied Engineering Physics, Materials Chemistry, Analytics, and Mathematics to prepare students for core technical and research-oriented careers.',
    labs: ['Applied Physics Lab', 'Optics & Measurement Studio', 'Analytical Chemistry Lab'],
    programs: [
      { name: 'B.Sc in Applied Sciences', duration: '3 Years', eligibility: '10+2 in science stream with minimum 50% aggregate marks.', fee: '₹45K / semester', syllabus: 'https://spsu.ac.in/downloads/syllabus/bsc-applied.pdf' },
      { name: 'M.Sc in Applied Physics', duration: '2 Years', eligibility: 'B.Sc with Physics and Mathematics with minimum 50% aggregate marks.', fee: '₹35K / semester', syllabus: 'https://spsu.ac.in/downloads/syllabus/msc-physics.pdf' }
    ]
  },
  {
    id: 'mgmt',
    name: 'Department of Management Studies',
    icon: Layers,
    desc: 'Shaping future business leaders through specialized MBA and BBA programs with focus areas in Business Analytics, Fintech, HR, Marketing, and Supply Chain Logistics.',
    labs: ['Corporate Simulation Room', 'Business Analytics Lab', 'Logistics Operations Hub'],
    programs: [
      { name: 'Bachelor of Business Administration (BBA)', duration: '3 Years', eligibility: '10+2 in any stream from a recognized board with minimum 50% aggregate marks. Admission based on SPSAT.', fee: '₹65K / semester', syllabus: 'https://spsu.ac.in/downloads/syllabus/bba-handbook.pdf' },
      { name: 'Master of Business Administration (MBA)', duration: '2 Years', eligibility: 'Bachelor\'s Degree in any discipline from a recognized university with minimum 50% marks. CAT/MAT/CMAT/XAT or SPSAT score required.', fee: '₹1.1L / semester', syllabus: 'https://spsu.ac.in/downloads/syllabus/mba-curriculum.pdf' }
    ]
  },
  {
    id: 'design',
    name: 'Department of Design and Liberal Studies',
    icon: Palette,
    desc: 'Empowering students in creative problem-solving, UI/UX interaction design, and liberal humanities to meet the demands of modern creative industries.',
    labs: ['Interaction Design Studio', 'Digital Prototyping Workshop', 'Humanities Language Center'],
    programs: [
      { name: 'Bachelor of Design (B.Des)', duration: '4 Years', eligibility: '10+2 in any stream with minimum 50% aggregate marks. Creative portfolio review and design aptitude evaluation required.', fee: '₹90K / semester', syllabus: 'https://spsu.ac.in/downloads/syllabus/bdes-design.pdf' }
    ]
  },
  {
    id: 'law',
    name: 'Faculty of Law',
    icon: Scale,
    desc: 'Providing a comprehensive legal curriculum that bridges theory with practical advocacy skills through mock trials, moot courts, and legal aid societies.',
    labs: ['Moot Court Hall', 'Legal Aid Consultation Center', 'Law Library Reference Desk'],
    programs: [
      { name: 'Bachelor of Laws (LL.B)', duration: '3 Years', eligibility: 'Graduation in any discipline with minimum 45% aggregate marks.', fee: '₹50K / semester', syllabus: 'https://spsu.ac.in/downloads/syllabus/llb-course.pdf' }
    ]
  }
];

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState('cse');
  const [openProgram, setOpenProgram] = useState<number | null>(null);

  const selectedDept = departments.find((d) => d.id === activeTab) || departments[0];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-24 bg-gradient-to-br from-violet-900/10 via-background to-secondary/20 border-b overflow-hidden">
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 text-center max-w-3xl space-y-6 relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Academic Offerings</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Syllabus Engineered for Impact
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Explore our specialized departments, comprehensive programs, and state-of-the-art laboratory systems built for real-world application.
          </p>
        </div>
      </section>

      {/* Main Department Tab interface */}
      <section id="programs" className="py-20 bg-background border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Tabs header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {departments.map((dept) => {
              const Icon = dept.icon;
              const isActive = activeTab === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => {
                    setActiveTab(dept.id);
                    setOpenProgram(null);
                  }}
                  className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all duration-300 focus:outline-none ${
                    isActive 
                      ? 'border-primary bg-primary/5 shadow-md shadow-primary/5 ring-1 ring-primary' 
                      : 'border-border bg-card hover:bg-muted'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${
                    isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">{dept.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Explore Offerings</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              
              {/* Department Overview */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Overview</span>
                  <h2 className="text-3xl font-extrabold tracking-tight text-foreground mt-2">
                    {selectedDept.name}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {selectedDept.desc}
                </p>

                {/* Labs / Facilities */}
                <div className="space-y-3">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">Featured Labs</h4>
                  <ul className="space-y-2">
                    {selectedDept.labs.map((lab, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        {lab}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Programs and Syllabus details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Academic Programs</span>
                  <h3 className="text-xl font-bold tracking-tight text-foreground mt-1 mb-4">Degrees Offered</h3>
                </div>

                <div className="space-y-3">
                  {selectedDept.programs.map((prog, idx) => (
                    <div key={idx} className="border rounded-xl bg-card overflow-hidden">
                      <button
                        onClick={() => setOpenProgram(openProgram === idx ? null : idx)}
                        className="flex w-full items-center justify-between p-5 text-left font-semibold text-foreground focus:outline-none"
                      >
                        <span className="flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-primary flex-shrink-0" />
                          {prog.name}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                          openProgram === idx ? 'rotate-180' : ''
                        }`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {openProgram === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-5 pb-5 border-t pt-4 bg-muted/20 space-y-3 text-xs md:text-sm text-muted-foreground">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="font-semibold text-foreground">Duration</p>
                                  <p className="mt-0.5">{prog.duration}</p>
                                </div>
                                <div>
                                  <p className="font-semibold text-foreground">Tuition Fee</p>
                                  <p className="mt-0.5">{prog.fee}</p>
                                </div>
                              </div>
                              <div className="pt-2">
                                <p className="font-semibold text-foreground">Eligibility Criteria</p>
                                <p className="mt-0.5 leading-relaxed">{prog.eligibility}</p>
                              </div>
                              <div className="pt-3 flex gap-4">
                                <a 
                                  href={prog.syllabus} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline text-xs"
                                >
                                  <Download className="h-3.5 w-3.5" />
                                  Download Syllabus
                                </a>
                                <a 
                                  href="#enquiry-form" 
                                  className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline text-xs"
                                >
                                  Apply/Inquire
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
