'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationTabsProps {
  contributions: number | string;
}

interface NavItem {
  href: string;
  label: string;
  count?: number | string;
}

export default function NavigationTabs({ contributions }: NavigationTabsProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: '/', label: 'Overview' },
    { href: '/experience', label: 'Experience', count: 7 },
    { href: '/projects', label: 'Projects', count: 7 },
    { href: '/contributions', label: 'Contributions', count: contributions },
  ];

  return (
    <div className="mb-6 border-b border-gray-700">
      {isMobile ? (
        <div className="py-2">
          <DropdownMenu>
            <div className="flex justify-end">
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800">
                <Menu className="h-5 w-5" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent>
              {navItems.map(item => (
                <Link key={item.href} href={item.href}>
                  <DropdownMenuItem className="cursor-pointer">
                    {item.label}
                    {item.count !== undefined && (
                      <span className="ml-1 rounded-full bg-gray-700 px-2 py-0.5 text-xs">
                        {item.count}
                      </span>
                    )}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <nav className="flex overflow-x-auto">
          {navItems.map(item => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 ${
                  isActive
                    ? 'border-b-2 border-[#f78166] font-medium'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {item.label}{' '}
                {item.count !== undefined && (
                  <span className="ml-1 rounded-full bg-gray-700 px-2 py-0.5 text-xs">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
