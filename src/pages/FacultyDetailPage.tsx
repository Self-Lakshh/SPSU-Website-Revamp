import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { Faculty } from '../types';
import { ArrowLeft, Mail, Award, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import PageLoader from '../components/shared/PageLoader';
import { FadeIn } from '../components/shared/AnimatedWrapper';

const seedFaculty: Record<string, Faculty> = {
  'sadananda-prusty': {
    id: 'sadananda-prusty',
    departmentId: 'mgmt',
    name: 'Prof. (Dr.) Sadananda Prusty',
    designation: 'Dean - Faculty of Management',
    email: 'sadananda.prusty@spsu.ac.in',
    phone: '+91-294-2760100',
    bio: 'Prof. Sadananda Prusty has over 25 years of rich experience in academic leadership, corporate training, and research in Management, Applied Economics, and Public Finance. He has published extensively in peer-reviewed journals.',
    image: 'bg-emerald-500/20 text-emerald-500',
    specializations: ['Applied Economics', 'Corporate Finance', 'Business Strategy'],
    publications: [
      { title: 'Efficacy of Monetary Policy Transmission in Emerging Markets', journal: 'International Journal of Finance & Economics', year: 2023, url: 'https://doi.org/10.1002/ijfe.281' },
      { title: 'Infrastructure Investment and Regional Development', journal: 'Journal of Economic Development', year: 2022 }
    ],
    achievements: ['Outstanding Educator Award (AIMS International, 2023)', 'Advisory Board Member, REA']
  },
  'amit-goel': {
    id: 'amit-goel',
    departmentId: 'cse',
    name: 'Dr. Amit Kumar Goel',
    designation: 'Professor & Dean (Computing & Informatics)',
    email: 'amit.goel@spsu.ac.in',
    phone: '+91-294-2760101',
    bio: 'Dr. Amit Kumar Goel specializes in Soft Computing, Artificial Intelligence, Machine Learning, and Big Data Warehouses. He drives the IBM Academic Initiative at SPSU to train students in Cloud Technologies.',
    image: 'bg-violet-500/20 text-violet-500',
    specializations: ['Machine Learning', 'Soft Computing', 'Big Data Analytics'],
    publications: [
      { title: 'A Hybrid Deep Learning Model for Climate Prediction in Arid Zones', journal: 'IEEE Transactions on SMC', year: 2024 }
    ],
    achievements: ['Best Research Paper Award (IEEE CloudCon, 2024)', 'Senior Member, Computer Society of India']
  },
  'naveen-kumar': {
    id: 'naveen-kumar',
    departmentId: 'fiat',
    name: 'Dr. Naveen Kumar',
    designation: 'Professor & Deputy Dean (FIAT)',
    email: 'naveen.kumar@spsu.ac.in',
    phone: '+91-294-2760102',
    bio: 'Dr. Naveen Kumar directs CAD/CAM labs and mechanical engineering research at SPSU. His work targets solid mechanics, vibration analysis, and modern fabrication techniques.',
    image: 'bg-blue-500/20 text-blue-500',
    specializations: ['CAD/CAM Systems', 'Vibration Analysis', 'Automotive Design'],
    publications: [
      { title: 'Finite Element Analysis of Stress Distributions in Mining Drills', journal: 'International Journal of Mining Science', year: 2023 }
    ],
    achievements: ["Patent holder for 'Adaptive Shock-Absorbing Mechanics'", 'L&T EduTech Excellence Mentor Award']
  },
  'deepak-vyas': {
    id: 'deepak-vyas',
    departmentId: 'sciences',
    name: 'Dr. Deepak Vyas',
    designation: 'Associate Professor & Deputy Dean (Sciences)',
    email: 'deepak.vyas@spsu.ac.in',
    phone: '+91-294-2760103',
    bio: 'Dr. Deepak Vyas focuses on applied engineering physics and semiconductor thin-films. He leads the materials research laboratory at SPSU, investigating green energy storage devices.',
    image: 'bg-rose-500/20 text-rose-500',
    specializations: ['Semiconductor Physics', 'Green Energy Devices', 'Thin-Film Characterization'],
    publications: [
      { title: 'Synthesis of Transition Metal Oxide Nanoparticles for Supercapacitors', journal: 'Journal of Power Sources', year: 2024 }
    ],
    achievements: ['Principal Investigator, DST-SERB Core Research Grant', 'Fellow of the Physics Academy of India']
  }
};

export default function FacultyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [member, setMember] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Try to load from route state first to avoid extra fetching
    if (location.state?.member) {
      setMember(location.state.member);
      setLoading(false);
      return;
    }

    // 2. Otherwise fetch from Firestore
    async function fetchMember() {
      try {
        if (!id) return;
        const docRef = doc(db, 'faculty', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setMember({ id: docSnap.id, ...docSnap.data() } as Faculty);
        } else if (seedFaculty[id]) {
          // Fallback to seed data for testing
          setMember(seedFaculty[id]);
        }
      } catch (err) {
        console.error('Error fetching member details:', err);
        // Fallback to seed data on error/offline
        if (id && seedFaculty[id]) setMember(seedFaculty[id]);
      } finally {
        setLoading(false);
      }
    }
    fetchMember();
  }, [id, location.state]);

  if (loading) {
    return <PageLoader />;
  }

  if (!member) {
    return (
      <div className="container py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold">Faculty Member Not Found</h2>
        <p className="text-muted-foreground">The requested faculty profile does not exist.</p>
        <Link to="/faculty" className="inline-flex items-center gap-1 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-24 max-w-6xl mx-auto px-4">
      {/* Back button */}
      <Link 
        to="/faculty" 
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Directory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column - Card Profile Overview */}
        <div className="lg:col-span-4 space-y-6">
          <FadeIn className="bg-card border rounded-2xl p-6 text-center space-y-4 shadow-sm">
            <div className={`h-28 w-28 rounded-full ${member.image} mx-auto flex items-center justify-center border-2 border-background shadow-md`}>
              <span className="text-3xl font-black">{member.name.split(' ').pop()?.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-foreground">{member.name}</h2>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">{member.designation}</p>
            </div>
            
            <div className="border-t pt-4 space-y-3.5 text-left text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="capitalize">{member.departmentId.replace('-', ' ')} Department</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="bg-card border rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">Specializations</h3>
            <div className="flex flex-wrap gap-1.5">
              {member.specializations.map((spec, i) => (
                <span key={i} className="text-xs bg-muted px-2.5 py-1 rounded-md font-semibold text-foreground/80">
                  {spec}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Right Column - Comprehensive Credentials */}
        <div className="lg:col-span-8 space-y-10">
          {/* Biography */}
          <FadeIn delay={0.2} className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2">Biography</h3>
            <p className="text-muted-foreground leading-relaxed text-base">
              {member.bio}
            </p>
          </FadeIn>

          {/* Publications */}
          <FadeIn delay={0.3} className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Research Publications
            </h3>
            {member.publications.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No listed publications.</p>
            ) : (
              <div className="space-y-4">
                {member.publications.map((pub, idx) => (
                  <div key={idx} className="p-4 border rounded-xl bg-card shadow-sm hover:border-primary/20 transition-colors">
                    <h4 className="font-bold text-base text-foreground leading-tight">{pub.title}</h4>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                      <span>{pub.journal}</span>
                      <span className="font-bold text-primary">{pub.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </FadeIn>

          {/* Achievements */}
          <FadeIn delay={0.4} className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-foreground border-b pb-2 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Honors & Achievements
            </h3>
            {member.achievements.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No listed achievements.</p>
            ) : (
              <ul className="space-y-2">
                {member.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            )}
          </FadeIn>
        </div>

      </div>
    </div>
  );
}
