import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Image as ImageIcon, Plus, Trash2, Loader2 } from 'lucide-react';

interface MockGalleryItem {
  id: string;
  title: string;
  category: string;
  style: string;
}

export default function GalleryCMS() {
  const [items, setItems] = useState<MockGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('campus');
  const [style, setStyle] = useState('from-violet-600/30 to-violet-800/40');
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'gallery'));
      const list: MockGalleryItem[] = [];
      querySnapshot.forEach((docSnap) => {
        list.push({
          id: docSnap.id,
          ...docSnap.data()
        } as MockGalleryItem);
      });
      setItems(list);
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setError('Please fill in all required fields');
      return;
    }

    setFormLoading(true);
    setError(null);
    try {
      const newItem = {
        title,
        category,
        style,
        uploadedAt: new Date()
      };

      const docRef = await addDoc(collection(db, 'gallery'), newItem);

      setItems((prev) => [
        { id: docRef.id, ...newItem },
        ...prev
      ]);

      // Reset Form
      setTitle('');
      setCategory('campus');
      setStyle('from-violet-600/30 to-violet-800/40');
    } catch (err) {
      console.error('Error adding gallery item:', err);
      setError('Failed to publish media. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this media?')) return;
    try {
      await deleteDoc(doc(db, 'gallery', id));
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting media:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gallery Media CMS</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload images/videos and configure media albums.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Create Media Form */}
        <div className="lg:col-span-5 p-6 border rounded-2xl bg-card shadow-sm">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Plus className="h-5 w-5 text-primary" />
            Upload Media Highlight
          </h3>

          <form onSubmit={handleAddImage} className="space-y-4">
            {error && <p className="text-xs text-destructive font-semibold">{error}</p>}

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Media Title / Caption *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mechanical workshop laboratory setup"
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Category Album *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="campus">Campus Life & Infra</option>
                <option value="academic">Academic & Tech</option>
                <option value="sports">Sports Events</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Visual Backdrop Theme *</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="from-violet-600/30 to-violet-800/40">Violet Gradient (Default)</option>
                <option value="from-blue-600/30 to-indigo-800/40">Blue Cyberpunk</option>
                <option value="from-emerald-600/30 to-emerald-800/40">Emerald Sports</option>
                <option value="from-amber-600/30 to-amber-800/40">Warm Tech Amber</option>
                <option value="from-rose-600/30 to-rose-800/40">Rose Sunset</option>
                <option value="from-sky-600/30 to-sky-800/40">Sky Blue Library</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={formLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg disabled:opacity-50"
            >
              {formLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Publishing Media...</span>
                </>
              ) : (
                <span>Publish Highlight</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Media Directory Data List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Active Gallery Highlights
          </h3>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 border rounded-2xl bg-card">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground mt-2">Loading highlights...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 border rounded-2xl bg-card">
              <p className="text-sm text-muted-foreground">No media highlights found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 border rounded-xl bg-card shadow-sm">
                  <div className="min-w-0">
                    <h4 className="font-bold text-foreground leading-snug truncate">{item.title}</h4>
                    <span className="inline-block capitalize text-primary font-semibold text-xs mt-1">{item.category}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors ml-4 flex-shrink-0"
                    title="Delete Media"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
