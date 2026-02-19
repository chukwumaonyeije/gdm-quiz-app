import { cn } from '@/lib/utils';

/**
 * Container Component
 * Mobile-first responsive wrapper with centered, constrained-width layout
 */
export default function Container({ children, className, maxWidth = 'max-w-3xl' }) {
  return (
    <div className={cn(
      'w-full mx-auto px-4 sm:px-6 lg:px-8',
      maxWidth,
      className
    )}>
      {children}
    </div>
  );
}
