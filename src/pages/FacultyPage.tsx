import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import type { Faculty } from '../types';
import { Search, Mail, User } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../components/shared/AnimatedWrapper';

// Seed Fallback Data (so the website looks fully loaded on first launch)
const seedFaculty: Faculty[] = [
  {
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
  {
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
  {
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
  {
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
];


export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>(seedFaculty);
  const [search, setSearch] = useState('');
  const [activeDept, setActiveDept] = useState('all');

  useEffect(() => {
    async function fetchFaculty() {
      try {
        const querySnapshot = await getDocs(collection(db, 'faculty'));
        if (!querySnapshot.empty) {
          const fetched: Faculty[] = [];
          querySnapshot.forEach((doc) => {
            fetched.push({ id: doc.id, ...doc.data() } as Faculty);
          });
          setFaculty(fetched);
        }
      } catch (err) {
        console.error('Error fetching faculty from Firestore:', err);
      }
    }
    fetchFaculty();
  }, []);

  const filteredFaculty = faculty.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.specializations.some((spec) => spec.toLowerCase().includes(search.toLowerCase()));
    
    const matchesDept = activeDept === 'all' || member.departmentId === activeDept;
    
    return matchesSearch && matchesDept;
  });

  return (
    <div className="container py-12 md:py-24 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">SPSU Faculty</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-2">Distinguished Mentors</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Meet the academic leaders, researchers, and global scholars who drive intellectual excellence at SPSU.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or field..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl bg-card text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b">
        <button
          onClick={() => setActiveDept('all')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            activeDept === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          All Departments
        </button>
        <button
          onClick={() => setActiveDept('cse')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            activeDept === 'cse' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          Computing & Informatics
        </button>
        <button
          onClick={() => setActiveDept('mgmt')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            activeDept === 'mgmt' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          Management Studies
        </button>
        <button
          onClick={() => setActiveDept('fiat')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            activeDept === 'fiat' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          Integrated & Advanced Tech
        </button>
        <button
          onClick={() => setActiveDept('sciences')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            activeDept === 'sciences' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          Applied Sciences
        </button>
        <button
          onClick={() => setActiveDept('design')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            activeDept === 'design' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          Design & Liberal Studies
        </button>
        <button
          onClick={() => setActiveDept('law')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
            activeDept === 'law' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          Faculty of Law
        </button>
      </div>

      {/* Faculty Grid */}
      {filteredFaculty.length === 0 ? (
        <div className="text-center py-20 border rounded-xl bg-card">
          <User className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="font-bold text-lg mt-4">No Faculty Found</h3>
          <p className="text-sm text-muted-foreground mt-1">Try expanding your search query or choosing another department.</p>
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFaculty.map((member) => (
            <StaggerItem key={member.id}>
              <Link 
                to={`/faculty/${member.id}`} 
                state={{ member }} // Pass member details to avoid extra fetch if needed
                className="flex flex-col h-full bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Header Profile graphic */}
                <div className={`h-36 ${member.image} flex items-center justify-center p-6 border-b transition-colors duration-300 group-hover:bg-primary/5`}>
                  <div className="h-20 w-20 rounded-full bg-background border flex items-center justify-center shadow-sm">
                    <User className="h-10 w-10 text-muted-foreground" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-lg text-foreground group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
                      {member.designation}
                    </p>
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-3 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t">
                    <div className="flex flex-wrap gap-1.5">
                      {member.specializations.slice(0, 2).map((spec, i) => (
                        <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded-md font-medium text-foreground/80">
                          {spec}
                        </span>
                      ))}
                      {member.specializations.length > 2 && (
                        <span className="text-xs text-muted-foreground font-medium flex items-center pl-1">
                          +{member.specializations.length - 2} more
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {member.email}
                      </span>
                      <span className="font-semibold text-primary hover:underline group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        View Profile
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
