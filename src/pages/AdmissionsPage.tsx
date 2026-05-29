import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  Award,
  Send,
  Loader2
} from 'lucide-react';
import { FadeIn } from '../components/shared/AnimatedWrapper';

const enquirySchema = zod.object({
  name: zod.string().min(2, 'Name must be at least 2 characters'),
  email: zod.string().email('Please enter a valid email address'),
  phone: zod.string().regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  programOfInterest: zod.string().min(1, 'Please select a program'),
  message: zod.string().min(10, 'Message must be at least 10 characters'),
});

type EnquiryFormValues = zod.infer<typeof enquirySchema>;

const faqs = [
  {
    q: 'What is the minimum eligibility criteria for B.Tech?',
    a: 'Candidates must have passed 10+2 with Physics, Mathematics, and Chemistry/Computer Science, securing a minimum of 60% aggregate marks.'
  },
  {
    q: 'Are scholarships available for outstanding students?',
    a: 'Yes, SPSU offers scholarships up to 100% tuition fee waiver based on JEE Main percentiles, 12th Board marks, and CUET scores.'
  },
  {
    q: 'How does the direct placement interface work?',
    a: 'SPSU has partnered with companies like JK Cement, Synopsys, and others to design active curriculum modules and host specialized recruitment events.'
  },
  {
    q: 'What is the refund policy for admissions?',
    a: 'Refund policies are governed strictly under the UGC guidelines. Candidates can request cancellation within specified dates for a full/partial refund.'
  }
];

export default function AdmissionsPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (data: EnquiryFormValues) => {
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, 'enquiries'), {
        ...data,
        status: 'new',
        createdAt: new Date(),
      });
      setSuccess(true);
      reset();
    } catch (err: any) {
      console.error('Error saving enquiry to Firestore:', err);
      setError('Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-24 bg-gradient-to-br from-violet-900/10 via-background to-secondary/20 border-b overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 text-center max-w-3xl space-y-6 relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Admissions 2026-2027</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Your Future Starts Here
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Apply online for our engineering, technology, and management programs. Follow our structured guidance to secure your placement.
          </p>
        </div>
      </section>

      {/* Program Details, Fees & Scholarships */}
      <section className="py-20 bg-background border-b">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Academic Criteria & Scholarship info */}
            <div className="space-y-10">
              <FadeIn>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Programs & Qualifications</h2>
                <div className="space-y-4">
                  <div className="p-5 border rounded-xl bg-card">
                    <h3 className="font-bold text-base flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Bachelor of Technology (B.Tech)
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Duration: 4 Years. Eligibility: 10+2 with PCM (Min 60% aggregate). Specializations in CSE, AI & ML, Mechatronics.
                    </p>
                  </div>
                  <div className="p-5 border rounded-xl bg-card">
                    <h3 className="font-bold text-base flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Master of Business Administration (MBA)
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Duration: 2 Years. Eligibility: Graduation in any stream with minimum 50% aggregate marks.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="p-6 border rounded-xl bg-gradient-to-tr from-violet-600/5 to-primary/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      <Award className="h-5 w-5" />
                    </div>
                    <h3 className="font-extrabold text-lg">Scholarship Opportunities</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    SPSU rewards merit. Students scoring above 90% in board exams or top-tier percentiles in JEE Main are eligible for full fee waivers.
                  </p>
                  <div className="flex gap-4 text-xs font-bold text-primary pt-1">
                    <span>JEE Main &gt; 95% = 100% Scholarship</span>
                    <span>Class 12th &gt; 90% = 50% Scholarship</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Admissions Enquiry Form */}
            <div id="enquiry-form" className="p-8 border rounded-2xl bg-card shadow-sm shadow-muted/50">
              <h3 className="text-2xl font-bold tracking-tight">Admission Enquiry</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-6">Enter your details and an advisor will contact you shortly.</p>

              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 rounded-xl text-center space-y-3"
                >
                  <CheckCircle className="h-10 w-10 mx-auto" />
                  <h4 className="font-bold text-lg">Enquiry Submitted!</h4>
                  <p className="text-sm">Thank you for your interest in SPSU. Our admissions desk will reach out via email shortly.</p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="text-xs font-bold underline hover:no-underline pt-2"
                  >
                    Submit another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {error && <p className="text-sm text-destructive font-medium">{error}</p>}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground">Your Name</label>
                      <input 
                        {...register('name')}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2 bg-background border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm transition-all"
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-foreground">Phone Number</label>
                      <input 
                        {...register('phone')}
                        placeholder="9876543210"
                        className="w-full px-3.5 py-2 bg-background border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm transition-all"
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">Email Address</label>
                    <input 
                      {...register('email')}
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2 bg-background border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm transition-all"
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">Program of Interest</label>
                    <select 
                      {...register('programOfInterest')}
                      className="w-full px-3.5 py-2 bg-background border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm transition-all"
                    >
                      <option value="">Select a Program</option>
                      <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                      <option value="B.Tech AI & Machine Learning">B.Tech AI & Machine Learning</option>
                      <option value="MBA Marketing">MBA Marketing</option>
                      <option value="PhD Engineering">PhD Engineering</option>
                    </select>
                    {errors.programOfInterest && <p className="text-xs text-destructive">{errors.programOfInterest.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-foreground">Describe your Enquiry</label>
                    <textarea 
                      {...register('message')}
                      rows={4}
                      placeholder="Tell us about your educational background or questions..."
                      className="w-full px-3.5 py-2 bg-background border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-sm transition-all"
                    />
                    {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md hover:bg-primary/95 transition-all"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Admissions FAQs</h2>
            <p className="text-muted-foreground mt-2">Answers to commonly asked questions about applying to SPSU.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border rounded-xl bg-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left font-semibold text-foreground focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
