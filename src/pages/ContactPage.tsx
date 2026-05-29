import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/shared/AnimatedWrapper';

const contactSchema = zod.object({
  name: zod.string().min(2, 'Name must be at least 2 characters'),
  email: zod.string().email('Please enter a valid email address'),
  subject: zod.string().min(4, 'Subject must be at least 4 characters'),
  message: zod.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = zod.infer<typeof contactSchema>;

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, 'contact_submissions'), {
        ...data,
        createdAt: new Date()
      });
      setSuccess(true);
      reset();
    } catch (err) {
      console.error('Error saving submission to Firestore:', err);
      setError('Failed to submit message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-24 bg-gradient-to-br from-violet-900/10 via-background to-secondary/20 border-b overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 text-center max-w-3xl space-y-6 relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Get in touch</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            We are here to help
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Contact our advisors, departments, or corporate relations office. Submit your messages directly using the form below.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-8">
              <FadeIn className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Campus Coordinates</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Located in the beautiful city of Udaipur, Rajasthan, our modern residential campus provides a premium environment for science and innovation.
                </p>
              </FadeIn>

              <div className="space-y-6">
                <FadeIn delay={0.1} className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary h-12 w-12 flex-shrink-0 flex items-center justify-center border border-primary/20">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Mailing Address</h3>
                    <p className="text-sm text-muted-foreground mt-1">Udaipur-Chittorgarh Road, Bhatewar, Udaipur, Rajasthan, India - 313601</p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.2} className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary h-12 w-12 flex-shrink-0 flex items-center justify-center border border-primary/20">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Admissions & General Enquiries</h3>
                    <p className="text-sm text-muted-foreground mt-1">Primary: +91 294 2660000</p>
                    <p className="text-sm text-muted-foreground">Toll Free: 1800-300-26555</p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3} className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary h-12 w-12 flex-shrink-0 flex items-center justify-center border border-primary/20">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Admissions Desk Email</h3>
                    <p className="text-sm text-muted-foreground mt-1">admissions@spsu.ac.in</p>
                    <p className="text-sm text-muted-foreground">registrar@spsu.ac.in</p>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 p-8 border rounded-2xl bg-card shadow-sm shadow-muted/50">
              <h3 className="text-2xl font-bold tracking-tight">Send a Direct Message</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-6">Fill in the form details below and we'll route your message to the correct department.</p>

              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 rounded-xl text-center space-y-3"
                >
                  <CheckCircle className="h-12 w-12 mx-auto" />
                  <h4 className="font-bold text-lg">Message Submitted Successfully</h4>
                  <p className="text-sm">We've received your query and will get back to you shortly.</p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="text-xs font-bold underline hover:no-underline pt-3 block mx-auto"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {error && <p className="text-sm text-destructive font-semibold">{error}</p>}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold">Your Name</label>
                      <input 
                        {...register('name')}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      {errors.name && <p className="text-xs text-destructive mt-0.5">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold">Email Address</label>
                      <input 
                        {...register('email')}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      {errors.email && <p className="text-xs text-destructive mt-0.5">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold">Subject</label>
                    <input 
                      {...register('subject')}
                      placeholder="Admissions criteria, Hostels, Fees, etc."
                      className="w-full px-3.5 py-2.5 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {errors.subject && <p className="text-xs text-destructive mt-0.5">{errors.subject.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold">Your Message</label>
                    <textarea 
                      {...register('message')}
                      rows={5}
                      placeholder="Enter detailed message contents..."
                      className="w-full px-3.5 py-2.5 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {errors.message && <p className="text-xs text-destructive mt-0.5">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md hover:bg-primary/95 transition-all"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
