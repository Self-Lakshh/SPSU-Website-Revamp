import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

const loginSchema = zod.object({
  email: zod.string().email('Please enter a valid email address'),
  password: zod.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = zod.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Firebase Auth Error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password combination');
      } else {
        setError(err.message || 'An error occurred during authentication');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 p-8 bg-card border rounded-2xl shadow-xl shadow-muted/50"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">SPSU Admin</h2>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage the university platform</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                {...register('email')}
                type="email"
                placeholder="admin@spsu.ac.in"
                className="w-full pl-10 pr-4 py-2.5 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-foreground">Password</label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-2.5 px-4 bg-primary text-primary-foreground hover:bg-primary/95 font-semibold text-sm rounded-lg shadow-lg shadow-primary/10 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
