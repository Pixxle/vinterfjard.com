"use client";

import { useRef } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationTabsProps {
  contributions: number | string;
  gistCount: number;
}

interface NavItem {
  href: string;
  label: string;
  count?: number | string;
  active?: boolean;
}

export default function NavigationTabs({ contributions, gistCount }: NavigationTabsProps) {
  const isMobile = useIsMobile();
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Determine which tab should be active based on current pathname
  const isGistsPage = pathname.startsWith('/gists');
  const isHomePage = pathname === '/';

  const navItems: NavItem[] = [
    { href: "#overview", label: "Overview", active: isHomePage },
    { href: "#experience", label: "Experience", count: 7 },
    { href: "#contributions", label: "Contributions", count: contributions },
    { href: "#projects", label: "Projects", count: 2 },
    { href: "/gists", label: "Gists", count: gistCount, active: isGistsPage },
  ];

  const handleNavClick = (href: string) => {
    // Close dropdown if it's open
    if (dropdownRef.current) {
      dropdownRef.current.click();
    }

    // Only handle scroll for hash links (internal page sections)
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 200); // Small delay to allow the dropdown to close
      }
    }
    // Route links (like /gists) will be handled by Next.js Link component
  };

  return (
    <div className="border-b border-gray-700 mb-6">
      {isMobile ? (
        <div className="py-2">
          <DropdownMenu>
            <div className="flex justify-end">
              <DropdownMenuTrigger
                ref={dropdownRef}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-800"
              >
                <Menu className="h-5 w-5" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent>
              {navItems.map((item) => {
                const dropdownContent = (
                  <>
                    {item.label}
                    {item.count !== undefined && (
                      <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-700">
                        {item.count}
                      </span>
                    )}
                  </>
                );

                // Use Link component for route navigation
                if (item.href.startsWith('/')) {
                  return (
                    <Link key={item.href} href={item.href}>
                      <DropdownMenuItem className="cursor-pointer">
                        {dropdownContent}
                      </DropdownMenuItem>
                    </Link>
                  );
                } else {
                  return (
                    <DropdownMenuItem
                      key={item.href}
                      className="cursor-pointer"
                      onClick={() => handleNavClick(item.href)}
                    >
                      {dropdownContent}
                    </DropdownMenuItem>
                  );
                }
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <nav className="flex overflow-x-auto">
          {navItems.map((item) => {
            const linkContent = (
              <>
                {item.label}{" "}
                {item.count !== undefined && (
                  <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-700">
                    {item.count}
                  </span>
                )}
              </>
            );
            
            const linkClasses = `px-4 py-2 ${
              item.active
                ? "border-b-2 border-[#f78166] font-medium"
                : "text-gray-400 hover:text-gray-200"
            }`;

            // Use Link component for route navigation, anchor tag for hash links
            if (item.href.startsWith('/')) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClasses}
                >
                  {linkContent}
                </Link>
              );
            } else {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={linkClasses}
                >
                  {linkContent}
                </a>
              );
            }
          })}
        </nav>
      )}
    </div>
  );
}
