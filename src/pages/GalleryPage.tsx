import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../components/shared/AnimatedWrapper';

const galleryItems = [
  { id: 1, title: 'Main Academic Block', category: 'campus', style: 'from-violet-600/30 to-violet-800/40' },
  { id: 2, title: 'Annual TechFest Hackathon', category: 'academic', style: 'from-blue-600/30 to-indigo-800/40' },
  { id: 3, title: 'Inter-University Cricket Finals', category: 'sports', style: 'from-emerald-600/30 to-emerald-800/40' },
  { id: 4, title: 'Mechanical Workshop Facility', category: 'academic', style: 'from-amber-600/30 to-amber-800/40' },
  { id: 5, title: 'Boys & Girls Student Hostels', category: 'campus', style: 'from-rose-600/30 to-rose-800/40' },
  { id: 6, title: 'SPSU Central Library Study Rooms', category: 'campus', style: 'from-sky-600/30 to-sky-800/40' },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-24 bg-gradient-to-br from-violet-900/10 via-background to-secondary/20 border-b overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 text-center max-w-3xl space-y-6 relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Media Gallery</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Life at SPSU in Pixels
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Take a visual tour through our infrastructure, annual festivals, academic milestones, and sporting achievements.
          </p>
        </div>
      </section>

      {/* Filter Options & Floating Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['all', 'campus', 'academic', 'sports'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 text-sm font-semibold rounded-full capitalize transition-colors focus:outline-none ${
                  activeFilter === filter 
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10' 
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {filter === 'all' ? 'All Highlights' : `${filter} life`}
              </button>
            ))}
          </div>

          {/* Photos Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <StaggerItem key={item.id}>
                <div 
                  onClick={() => setSelectedItem(item)}
                  className="group relative h-72 border rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Abstract Simulated High-Quality Visual Block */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${item.style} flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-105`}>
                    <div className="p-4 rounded-full bg-background/80 backdrop-blur text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                      <ZoomIn className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Gradient Overlay for Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{item.category}</span>
                    <h3 className="text-white font-extrabold text-lg mt-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl bg-card border rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background border hover:bg-muted text-foreground transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Visual Area */}
                <div className="md:col-span-8 h-96 md:h-[500px] bg-muted relative">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${selectedItem.style} flex items-center justify-center`}>
                    <ImageIcon className="h-20 w-20 text-foreground/10" />
                  </div>
                </div>

                {/* Details Area */}
                <div className="md:col-span-4 p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-extrabold text-primary uppercase tracking-widest">
                      {selectedItem.category} Media
                    </span>
                    <h2 className="text-2xl font-black text-foreground leading-tight">
                      {selectedItem.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Captured at the Udaipur main campus. This showcase outlines the premium learning infrastructure offered to SPSU candidates.
                    </p>
                  </div>

                  <div className="pt-6 border-t mt-8 text-xs text-muted-foreground">
                    <span>Uploaded: Academic Year 2025-2026</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
