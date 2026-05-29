import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import type { Event } from '../../types';
import { Calendar, Plus, Trash2, MapPin, Loader2 } from 'lucide-react';

export default function EventsCMS() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const list: Event[] = [];
      querySnapshot.forEach((docSnap) => {
        list.push({
          id: docSnap.id,
          ...docSnap.data()
        } as Event);
      });
      list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setEvents(list);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date || !location) {
      setError('Please fill in all required fields');
      return;
    }

    setFormLoading(true);
    setError(null);
    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const newEvent = {
        title,
        slug,
        description,
        date,
        location,
        isRegistrationOpen,
        image: 'from-blue-600/30 to-indigo-600/20', // default style
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'events'), newEvent);

      setEvents((prev) => [
        { id: docRef.id, ...newEvent },
        ...prev
      ]);

      // Reset Form
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setIsRegistrationOpen(true);
    } catch (err) {
      console.error('Error adding event:', err);
      setError('Failed to create event. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await deleteDoc(doc(db, 'events', id));
      setEvents((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Events CMS</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure and publish upcoming university schedules and campus calendars.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Create Event Form */}
        <div className="lg:col-span-5 p-6 border rounded-2xl bg-card shadow-sm">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Plus className="h-5 w-5 text-primary" />
            Schedule New Event
          </h3>

          <form onSubmit={handleAddEvent} className="space-y-4">
            {error && <p className="text-xs text-destructive font-semibold">{error}</p>}

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Event Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. SPSU Annual Alumni Meet 2026"
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Date & Time *</label>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Location Room *</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Seminar Hall 1"
                  className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                id="isRegOpen"
                checked={isRegistrationOpen}
                onChange={(e) => setIsRegistrationOpen(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="isRegOpen" className="text-xs font-semibold text-foreground cursor-pointer">
                Open registration requests for this event
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Event Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Write full event details and schedule overview..."
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
                  <span>Scheduling Event...</span>
                </>
              ) : (
                <span>Publish Event</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Events Data List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Scheduled Campus Events
          </h3>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 border rounded-2xl bg-card">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground mt-2">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20 border rounded-2xl bg-card">
              <p className="text-sm text-muted-foreground">No scheduled events yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 border rounded-xl bg-card shadow-sm">
                  <div>
                    <h4 className="font-bold text-foreground line-clamp-1 leading-snug">{item.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {item.location}
                      </span>
                      <span>
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                      <span className={`font-semibold ${item.isRegistrationOpen ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                        {item.isRegistrationOpen ? 'Registration Open' : 'Registration Closed'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors ml-4 flex-shrink-0"
                    title="Delete Event"
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
