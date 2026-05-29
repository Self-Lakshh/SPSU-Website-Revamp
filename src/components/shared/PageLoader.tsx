import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          className="h-20 w-20 rounded-full border-2 border-primary/20 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner pulsing circle */}
        <motion.div
          className="absolute h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-bold tracking-widest text-primary">SPSU</span>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        Initializing Experience
      </motion.p>
    </div>
  );
}
