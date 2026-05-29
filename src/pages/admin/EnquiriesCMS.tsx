import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import type { Enquiry } from '../../types';
import { Mail, Phone, Trash2, Eye, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EnquiriesCMS() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'enquiries'));
      const list: Enquiry[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
        } as Enquiry);
      });
      // Sort by newest first
      list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setEnquiries(list);
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: Enquiry['status']) => {
    setActionLoading(id);
    try {
      const docRef = doc(db, 'enquiries', id);
      await updateDoc(docRef, { status: newStatus });
      setEnquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    setActionLoading(id);
    try {
      await deleteDoc(doc(db, 'enquiries', id));
      setEnquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error('Error deleting enquiry:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredEnquiries = enquiries.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.programOfInterest.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: Enquiry['status']) => {
    const colors = {
      new: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      reviewed: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      contacted: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
      resolved: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    };
    return colors[status] || colors.new;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admissions Enquiries</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and manage course requests submitted by candidates.
          </p>
        </div>
        
        {/* Search bar */}
        <div className="w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search name, program, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3.5 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground mt-2">Loading submissions...</p>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="text-center py-20 border rounded-2xl bg-card">
          <Mail className="h-10 w-10 mx-auto text-muted-foreground" />
          <h3 className="font-bold text-lg mt-4">No Enquiries Received</h3>
          <p className="text-sm text-muted-foreground mt-1">
            New submissions from the Admissions page will automatically appear here.
          </p>
        </div>
      ) : (
        <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-muted/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="p-4">Student</th>
                  <th className="p-4">Program</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Submitted At</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {filteredEnquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.email}</p>
                    </td>
                    <td className="p-4 font-semibold text-foreground/80">{item.programOfInterest}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 border text-xs font-bold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground text-xs">
                      {item.createdAt.toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedEnquiry(item)}
                        className="p-1.5 hover:bg-muted text-foreground rounded-lg transition-colors"
                        title="View Enquiry details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={actionLoading === item.id}
                        className="p-1.5 hover:bg-destructive/10 text-destructive rounded-lg transition-colors disabled:opacity-45"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enquiry Detail Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
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
              className="w-full max-w-lg bg-card border rounded-2xl p-6 shadow-xl relative"
            >
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-xl font-bold">Enquiry Details</h3>
              <span className={`inline-block mt-2 px-2.5 py-0.5 border text-xs font-bold rounded-full ${getStatusColor(selectedEnquiry.status)}`}>
                {selectedEnquiry.status}
              </span>

              <div className="mt-6 space-y-4 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Candidate</p>
                  <p className="font-bold text-foreground text-base mt-0.5">{selectedEnquiry.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</p>
                    <a href={`mailto:${selectedEnquiry.email}`} className="text-primary hover:underline flex items-center gap-1 mt-0.5">
                      <Mail className="h-3.5 w-3.5" /> {selectedEnquiry.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone</p>
                    <a href={`tel:${selectedEnquiry.phone}`} className="text-primary hover:underline flex items-center gap-1 mt-0.5">
                      <Phone className="h-3.5 w-3.5" /> {selectedEnquiry.phone}
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Course Program</p>
                  <p className="font-semibold text-foreground/80 mt-0.5">{selectedEnquiry.programOfInterest}</p>
                </div>

                <div className="p-4 bg-muted/30 border rounded-xl">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Message</p>
                  <p className="text-muted-foreground leading-relaxed italic">"{selectedEnquiry.message}"</p>
                </div>
              </div>

              {/* Status Update Options */}
              <div className="mt-8 border-t pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">Update Submission status:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(['new', 'reviewed', 'contacted', 'resolved'] as Enquiry['status'][]).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedEnquiry.id, status)}
                      disabled={selectedEnquiry.status === status || actionLoading === selectedEnquiry.id}
                      className={`px-3 py-1 text-xs font-bold rounded-lg border transition-colors disabled:opacity-45 ${
                        selectedEnquiry.status === status 
                          ? 'bg-primary text-primary-foreground border-transparent' 
                          : 'bg-background hover:bg-muted text-foreground'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
