import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import type { News } from '../types';
import { Search, FileText, Calendar, ArrowRight } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/shared/AnimatedWrapper';

const seedNews: News[] = [
  {
    id: '1',
    title: 'SPSU Partners with Global Research Networks for Tech Innovation',
    slug: 'spsu-partners-global-research-tech-innovation',
    content: 'Sir Padampat Singhania University (SPSU) has signed a Memorandum of Understanding (MoU) with leading international technology groups to enhance collaborative scientific developments. The joint effort aims to create a streamlined pipeline for exchange of research scholars and shared high-performance computing resources. Students will gain access to direct sandbox areas in advanced machine learning models and cloud security architecture testing.',
    excerpt: 'Collaboration enables research scholar exchange and shared access to supercomputing infrastructure.',
    category: 'academic',
    tags: ['MoU', 'Research', 'Collaboration'],
    authorId: 'admin',
    coverImage: 'from-violet-600/30 to-indigo-800/40',
    status: 'published',
    publishedAt: new Date('2026-05-28'),
    createdAt: new Date('2026-05-28')
  },
  {
    id: '2',
    title: 'Engineering Stream Clinches Record Placements in Early Recruitment Drive',
    slug: 'engineering-clinches-record-placements-early-recruitment',
    content: 'The recruitment season at SPSU began on an exceptionally high note with B.Tech Computer Science and Cloud Computing streams registering over 80% placement in the first week. Leading tech corporations, including VLSI and core consulting conglomerates, visited the campus offering premium starting salaries. The highest package registered stands at a record 18 LPA.',
    excerpt: 'Over 80% B.Tech candidates placed in week one of the annual campus hiring drive.',
    category: 'placements',
    tags: ['Placement', 'Recruitment', 'B.Tech'],
    authorId: 'admin',
    coverImage: 'from-emerald-600/30 to-teal-800/40',
    status: 'published',
    publishedAt: new Date('2026-05-25'),
    createdAt: new Date('2026-05-25')
  },
  {
    id: '3',
    title: 'SPSU Faculty Receives Prestigious Government Grant for Material Sciences',
    slug: 'faculty-receives-prestigious-grant-material-sciences',
    content: 'Dr. Neha Malhotra, Assistant Professor in the Applied Chemistry department at SPSU, has been awarded a major research grant by the Department of Science and Technology (DST-SERB). The funding will support a three-year study on biodegradable polymers and their industrial applications in green packaging solutions.',
    excerpt: 'Dr. Neha Malhotra receives DST-SERB funding for research into green packaging polymers.',
    category: 'research',
    tags: ['Research Grant', 'DST', 'Chemistry'],
    authorId: 'admin',
    coverImage: 'from-rose-600/30 to-orange-800/40',
    status: 'published',
    publishedAt: new Date('2026-05-20'),
    createdAt: new Date('2026-05-20')
  }
];

export default function NewsPage() {
  const [news, setNews] = useState<News[]>(seedNews);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function fetchNews() {
      try {
        const querySnapshot = await getDocs(collection(db, 'news'));
        if (!querySnapshot.empty) {
          const fetched: News[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            fetched.push({ 
              id: doc.id, 
              ...data,
              publishedAt: data.publishedAt?.toDate() || new Date(),
              createdAt: data.createdAt?.toDate() || new Date()
            } as News);
          });
          setNews(fetched);
        }
      } catch (err) {
        console.error('Error fetching news from Firestore:', err);
      }
    }
    fetchNews();
  }, []);

  const filteredNews = news.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase());
    
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    
    return matchesSearch && matchesCat;
  });

  const featured = filteredNews[0];
  const listNews = filteredNews.slice(1);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-24 bg-gradient-to-br from-violet-900/10 via-background to-secondary/20 border-b overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 text-center max-w-3xl space-y-6 relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">SPSU Newsroom</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            University Press & Updates
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Read corporate announcements, academic publications, research updates, and placement milestones.
          </p>
        </div>
      </section>

      {/* Categories & Search Panel */}
      <section className="py-12 border-b bg-card">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Categories Selector */}
          <div className="flex flex-wrap gap-2">
            {['all', 'academic', 'placements', 'research'].map((cat) => (
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

          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search news articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>
      </section>

      {/* Main News Content grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          {filteredNews.length === 0 ? (
            <div className="text-center py-20 border rounded-2xl bg-card">
              <FileText className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="font-bold text-lg mt-4">No Press Articles Found</h3>
              <p className="text-sm text-muted-foreground mt-1">Try resetting your category filter or editing your search query.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Featured News layout */}
              {featured && (
                <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-8 border rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
                  {/* Photo representation */}
                  <div className="lg:col-span-7 h-64 lg:h-96 relative bg-muted">
                    <div className={`absolute inset-0 bg-gradient-to-tr ${featured.coverImage} flex items-center justify-center`}>
                      <FileText className="h-16 w-16 text-foreground/10" />
                    </div>
                  </div>

                  {/* Text representation */}
                  <div className="lg:col-span-5 p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase">
                        <span>Featured</span>
                        <span>•</span>
                        <span>{featured.category}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black leading-tight text-foreground">
                        {featured.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {featured.excerpt}
                      </p>
                    </div>
                    
                    <div className="pt-6 border-t mt-8 flex justify-between items-center text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {featured.publishedAt.toLocaleDateString()}
                      </span>
                      <span className="font-bold text-primary hover:underline cursor-pointer flex items-center gap-0.5">
                        Read Story <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* News list grid */}
              {listNews.length > 0 && (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {listNews.map((item) => (
                    <StaggerItem key={item.id} className="flex flex-col bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-48 bg-muted relative">
                        <div className={`absolute inset-0 bg-gradient-to-tr ${item.coverImage} flex items-center justify-center`}>
                          <FileText className="h-12 w-12 text-foreground/10" />
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="text-xs font-bold text-primary uppercase">{item.category}</span>
                          <h3 className="font-bold text-lg leading-snug line-clamp-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{item.excerpt}</p>
                        </div>
                        <div className="pt-4 border-t mt-6 flex justify-between items-center text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {item.publishedAt.toLocaleDateString()}
                          </span>
                          <span className="font-bold text-primary hover:underline cursor-pointer">
                            Read Story
                          </span>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
