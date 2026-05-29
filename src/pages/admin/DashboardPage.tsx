import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards */}
        <div className="p-6 bg-card border rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">News Published</p>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
        <div className="p-6 bg-card border rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Upcoming Events</p>
          <p className="text-3xl font-bold mt-2">4</p>
        </div>
        <div className="p-6 bg-card border rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Faculty Members</p>
          <p className="text-3xl font-bold mt-2">45</p>
        </div>
        <div className="p-6 bg-card border rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Enquiries</p>
          <p className="text-3xl font-bold mt-2">8</p>
        </div>
      </div>
    </div>
  );
}
