import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-24 text-center">
      <h1 className="text-9xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-[500px]">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        Return Home
      </Link>
    </div>
  );
}
