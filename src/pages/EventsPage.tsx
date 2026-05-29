import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { Event } from '../types';
import { Calendar, MapPin, Search, ArrowRight, UserPlus, CheckCircle, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '../components/shared/AnimatedWrapper';

const seedEvents: Event[] = [
  {
    id: '1',
    title: 'SPSU TechFest 2026: National Hackathon',
    slug: 'spsu-techfest-2026-national-hackathon',
    description: 'Over 50 teams from premier institutions across India compete in a 36-hour software and hardware prototyping challenge. Industry tech leaders will evaluate prototypes on originality, execution, and presentation.',
    date: '2026-06-15T09:00:00',
    location: 'SPSU Academic block - CSE Wing',
    image: 'from-violet-600/30 to-blue-800/40',
    isRegistrationOpen: true,
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Annual Cultural Festival: Panache 26',
    slug: 'annual-cultural-festival-panache-26',
    description: 'Experience three days of dynamic musical concerts, choreographic battles, theatrical arts, and designer fashion displays featuring renowned guest artists.',
    date: '2026-07-02T16:00:00',
    location: 'Main University Amphitheatre',
    image: 'from-rose-600/30 to-orange-800/40',
    isRegistrationOpen: true,
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Executive Workshop: Supply Chain Operations',
    slug: 'executive-workshop-supply-chain-operations',
    description: 'Specialized panel discussion for MBA graduates and corporate professionals led by operations directors from top shipping and manufacturing conglomerates.',
    date: '2026-06-25T14:30:00',
    location: 'SPSU Seminar Hall 2',
    image: 'from-emerald-600/30 to-teal-800/40',
    isRegistrationOpen: false,
    createdAt: new Date()
  }
];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(seedEvents);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLoading, setRegLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        if (!querySnapshot.empty) {
          const fetched: Event[] = [];
          querySnapshot.forEach((doc) => {
            fetched.push({ id: doc.id, ...doc.data() } as Event);
          });
          setEvents(fetched);
        }
      } catch (err) {
        console.error('Error fetching events from Firestore:', err);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    
    const categoryLower = item.title.toLowerCase();
    let cat = 'academic';
    if (categoryLower.includes('cultural') || categoryLower.includes('panache')) cat = 'cultural';
    if (categoryLower.includes('sports') || categoryLower.includes('cricket')) cat = 'sports';
    
    const matchesCat = activeCategory === 'all' || cat === activeCategory;
    
    return matchesSearch && matchesCat;
  });

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !regName || !regEmail || !regPhone) return;
    
    setRegLoading(true);
    try {
      await addDoc(collection(db, 'event_registrations'), {
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        name: regName,
        email: regEmail,
        phone: regPhone,
        registeredAt: new Date()
      });
      setRegSuccess(true);
      setRegName('');
      setRegEmail('');
      setRegPhone('');
    } catch (err) {
      console.error('Error adding registration:', err);
    } finally {
      setRegLoading(false);
    }
  };

  const getDayMonth = (dateString: string) => {
    const d = new Date(dateString);
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'short' });
    return { day, month };
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900/10 via-background to-secondary/20 border-b overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 text-center max-w-3xl space-y-6 relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">SPSU Events</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Connect, Share & Grow
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Attend research colloquiums, cultural exhibitions, tech prototyping challenges, and professional workshops on campus.
          </p>
        </div>
      </section>

      {/* Filters Panel */}
      <section className="py-12 border-b bg-card">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {['all', 'academic', 'cultural', 'sports'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg capitalize transition-colors focus:outline-none ${
                  activeCategory === cat ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20 border rounded-2xl bg-card">
              <Calendar className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="font-bold text-lg mt-4">No Scheduled Events</h3>
              <p className="text-sm text-muted-foreground mt-1">Check back later or change your selection criteria.</p>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredEvents.map((item) => {
                const { day, month } = getDayMonth(item.date);
                return (
                  <StaggerItem key={item.id} className="flex flex-col bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="h-44 bg-muted relative">
                      <div className={`absolute inset-0 bg-gradient-to-tr ${item.image} flex items-center justify-center`}>
                        <Calendar className="h-12 w-12 text-foreground/10 group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      
                      {/* Date Badge */}
                      <div className="absolute top-4 left-4 bg-background border px-3.5 py-1.5 rounded-xl shadow-md text-center">
                        <span className="block text-lg font-black text-foreground leading-none">{day}</span>
                        <span className="block text-xs font-bold text-primary uppercase mt-0.5">{month}</span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-extrabold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="space-y-3 pt-3 border-t">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>

                        <div className="flex justify-between items-center pt-1">
                          {item.isRegistrationOpen ? (
                            <button 
                              onClick={() => {
                                setSelectedEvent(item);
                                setRegSuccess(false);
                              }}
                              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                            >
                              <UserPlus className="h-3.5 w-3.5" /> Register Seat
                            </button>
                          ) : (
                            <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                              Closed
                            </span>
                          )}
                          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-0.5 cursor-pointer hover:text-foreground">
                            Details <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* Registration Modal Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-card border rounded-2xl p-6 shadow-xl relative"
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-xl font-bold pr-6 line-clamp-2">Register: {selectedEvent.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">Book your seat at Udaipur campus.</p>

              {regSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto" />
                  <h4 className="font-extrabold text-lg">Seat Confirmed!</h4>
                  <p className="text-sm text-muted-foreground px-4">
                    Your registration has been successfully recorded in Firestore. We've sent details to your email.
                  </p>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="mt-4 px-5 py-2 bg-primary text-primary-foreground font-semibold text-sm rounded-lg"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4 mt-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Jane Doe" 
                      className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="jane@example.com" 
                      className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="9876543210" 
                      className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={regLoading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg mt-2 disabled:opacity-50"
                  >
                    {regLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Confirming Seat...</span>
                      </>
                    ) : (
                      <span>Confirm Reservation</span>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
