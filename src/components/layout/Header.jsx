import { cn } from '@/lib/utils';
import Container from './Container';

/**
 * Header Component
 * Sticky header with glassmorphism effect
 * Supports progress bar, title, and action buttons
 */
export default function Header({ 
  title = 'GDM Quiz App',
  children,
  showProgress = false,
  progress = 0,
  className 
}) {
  return (
    <header className={cn(
      'bg-white/30 backdrop-blur-lg border-b border-white/50 shadow-sm sticky top-0 z-10',
      className
    )}>
      <Container>
        <div className="py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            {children}
          </div>
          
          {showProgress && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-clinical-500 to-indigo-600 h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
