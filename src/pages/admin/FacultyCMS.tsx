import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import type { Faculty } from '../../types';
import { Users, Plus, Trash2, Mail, Loader2 } from 'lucide-react';

export default function FacultyCMS() {
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [departmentId, setDepartmentId] = useState('cse');
  const [bio, setBio] = useState('');
  const [specializationsInput, setSpecializationsInput] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'faculty'));
      const list: Faculty[] = [];
      querySnapshot.forEach((docSnap) => {
        list.push({
          id: docSnap.id,
          ...docSnap.data()
        } as Faculty);
      });
      setFacultyList(list);
    } catch (err) {
      console.error('Error fetching faculty:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleAddFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !designation || !email || !bio) {
      setError('Please fill in all required fields');
      return;
    }

    setFormLoading(true);
    setError(null);
    try {
      const specializations = specializationsInput.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
      const newFaculty = {
        name,
        designation,
        email,
        departmentId,
        bio,
        specializations,
        publications: [],
        achievements: [],
        image: 'bg-violet-500/20 text-violet-500', // default theme
      };

      const docRef = await addDoc(collection(db, 'faculty'), newFaculty);

      setFacultyList((prev) => [
        { id: docRef.id, ...newFaculty },
        ...prev
      ]);

      // Reset Form
      setName('');
      setDesignation('');
      setEmail('');
      setBio('');
      setSpecializationsInput('');
      setDepartmentId('cse');
    } catch (err) {
      console.error('Error adding faculty:', err);
      setError('Failed to add faculty profile. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this faculty member?')) return;
    try {
      await deleteDoc(doc(db, 'faculty', id));
      setFacultyList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting faculty:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Faculty CMS</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage academic staff profiles and map them to their respective departments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Create Faculty Form */}
        <div className="lg:col-span-5 p-6 border rounded-2xl bg-card shadow-sm">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Plus className="h-5 w-5 text-primary" />
            Add Faculty Profile
          </h3>

          <form onSubmit={handleAddFaculty} className="space-y-4">
            {error && <p className="text-xs text-destructive font-semibold">{error}</p>}

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Faculty Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Seema Sen"
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Designation *</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Associate Professor"
                  className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Department *</label>
                <select
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="cse">Computer Science</option>
                  <option value="management">Management Studies</option>
                  <option value="basic-sciences">Basic Sciences</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seema.sen@spsu.ac.in"
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Comma-separated Specializations</label>
              <input
                type="text"
                value={specializationsInput}
                onChange={(e) => setSpecializationsInput(e.target.value)}
                placeholder="Artificial Intelligence, Cryptography"
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Short Biography *</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Write summary of research background or teaching expertise..."
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
                  <span>Saving Profile...</span>
                </>
              ) : (
                <span>Publish Faculty Profile</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Faculty Directory Data List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Active Faculty Directory
          </h3>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 border rounded-2xl bg-card">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground mt-2">Loading profiles...</p>
            </div>
          ) : facultyList.length === 0 ? (
            <div className="text-center py-20 border rounded-2xl bg-card">
              <p className="text-sm text-muted-foreground">No faculty members found in Firestore.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {facultyList.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 border rounded-xl bg-card shadow-sm">
                  <div>
                    <h4 className="font-bold text-foreground leading-snug">{item.name}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1.5">
                      <span className="capitalize text-primary font-semibold">{item.designation}</span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {item.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors ml-4 flex-shrink-0"
                    title="Delete Profile"
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
