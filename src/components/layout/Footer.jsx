import { cn } from '@/lib/utils';

/**
 * Footer Component
 * Attribution footer for the app
 */
export default function Footer({ className }) {
  return (
    <footer className={cn('text-center p-4 text-xs text-gray-600/80', className)}>
      <p>Created by Chukwuma I. Onyeije, MD, FACOG</p>
      <p>Atlanta Perinatal Associates</p>
    </footer>
  );
}
