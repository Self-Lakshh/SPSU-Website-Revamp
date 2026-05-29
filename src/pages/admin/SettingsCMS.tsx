import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Settings, Save, Loader2, CheckCircle } from 'lucide-react';

export default function SettingsCMS() {
  const [address, setAddress] = useState('Udaipur-Chittorgarh Road, Bhatewar, Udaipur, Rajasthan, India - 313601');
  const [phone, setPhone] = useState('+91 294 2660000');
  const [tollFree, setTollFree] = useState('1800-300-26555');
  const [email, setEmail] = useState('admissions@spsu.ac.in');
  
  // Socials
  const [facebook, setFacebook] = useState('#');
  const [twitter, setTwitter] = useState('#');
  const [instagram, setInstagram] = useState('#');
  const [linkedin, setLinkedin] = useState('#');
  
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      try {
        const docRef = doc(db, 'settings', 'global');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.address) setAddress(data.address);
          if (data.phone) setPhone(data.phone);
          if (data.tollFree) setTollFree(data.tollFree);
          if (data.email) setEmail(data.email);
          if (data.facebook) setFacebook(data.facebook);
          if (data.twitter) setTwitter(data.twitter);
          if (data.instagram) setInstagram(data.instagram);
          if (data.linkedin) setLinkedin(data.linkedin);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setSuccess(false);
    try {
      await setDoc(doc(db, 'settings', 'global'), {
        address,
        phone,
        tollFree,
        email,
        facebook,
        twitter,
        instagram,
        linkedin,
        updatedAt: new Date()
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground mt-2">Loading configurations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Global Site Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure global parameters, contact coordinates and social indicators.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {success && (
          <div className="flex items-center gap-2 p-3 text-sm rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle className="h-4 w-4" />
            <span>Settings successfully saved and persisted to Firestore.</span>
          </div>
        )}

        {/* Contact Coordinates */}
        <div className="p-6 border rounded-2xl bg-card shadow-sm space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-2">
            <Settings className="h-5 w-5 text-primary" />
            Contact & Location Parameters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Campus Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Admissions Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Primary Phone Hotline</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Toll-Free Helpline</label>
              <input
                type="text"
                value={tollFree}
                onChange={(e) => setTollFree(e.target.value)}
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="p-6 border rounded-2xl bg-card shadow-sm space-y-4">
          <h3 className="text-lg font-bold border-b pb-2">Social Network Coordinates</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Facebook URL</label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Twitter / X URL</label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">Instagram URL</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground">LinkedIn URL</label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saveLoading}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg shadow-md hover:bg-primary/95 transition-all disabled:opacity-50"
        >
          {saveLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving Configurations...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save configurations</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
