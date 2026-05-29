import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import type { News } from '../../types';
import { FileText, Plus, Trash2, Calendar, Loader2 } from 'lucide-react';

export default function NewsCMS() {
  const [articles, setArticles] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('academic');
  const [tagsInput, setTagsInput] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'news'));
      const list: News[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          ...data,
          publishedAt: data.publishedAt?.toDate() || new Date(),
        } as News);
      });
      list.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
      setArticles(list);
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      setError('Please fill in all required fields');
      return;
    }
    
    setFormLoading(true);
    setError(null);
    try {
      const tags = tagsInput.split(',').map((t) => t.trim()).filter((t) => t.length > 0);
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const newArticle = {
        title,
        slug,
        excerpt,
        content,
        category,
        tags,
        coverImage: 'from-violet-600/30 to-indigo-800/40', // default style
        authorId: 'admin',
        status: 'published' as const,
        publishedAt: new Date(),
        createdAt: new Date(),
      };
      
      const docRef = await addDoc(collection(db, 'news'), newArticle);
      
      setArticles((prev) => [
        { id: docRef.id, ...newArticle },
        ...prev
      ]);
      
      // Reset Form
      setTitle('');
      setExcerpt('');
      setContent('');
      setTagsInput('');
      setCategory('academic');
    } catch (err) {
      console.error('Error adding article:', err);
      setError('Failed to publish article. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteDoc(doc(db, 'news', id));
      setArticles((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting article:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">News & Media CMS</h1>
        <p className="text-sm text-muted-foreground mt-1">Publish news updates, academic articles, and press bulletins.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Create Article Form */}
        <div className="lg:col-span-5 p-6 border rounded-2xl bg-card shadow-sm">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Plus className="h-5 w-5 text-primary" />
            Publish New Article
          </h3>
          
          <form onSubmit={handleAddArticle} className="space-y-4">
            {error && <p className="text-xs text-destructive font-semibold">{error}</p>}
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Article Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. SPSU hosts international research colloquium"
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="academic">Academic & Tech</option>
                <option value="placements">Placements</option>
                <option value="research">Scientific Research</option>
                <option value="campus">Campus Events</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Comma-separated Tags</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="MoU, B.Tech, Research, Udaipur"
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Excerpt / Short Description *</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                placeholder="Short summary displayed in lists..."
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Article Body Content *</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                placeholder="Write full article content here..."
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              disabled={formLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg disabled:opacity-50"
            >
              {formLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Publishing Article...</span>
                </>
              ) : (
                <span>Publish Press Release</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Articles Data List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Active Press Releases
          </h3>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 border rounded-2xl bg-card">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground mt-2">Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 border rounded-2xl bg-card">
              <p className="text-sm text-muted-foreground">No published articles yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {articles.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 border rounded-xl bg-card shadow-sm">
                  <div>
                    <h4 className="font-bold text-foreground line-clamp-1 leading-snug">{item.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1.5">
                      <span className="capitalize text-primary font-semibold">{item.category}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.publishedAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors ml-4 flex-shrink-0"
                    title="Delete Press Release"
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
