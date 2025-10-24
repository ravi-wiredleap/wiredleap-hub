"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Home, Compass, Users, Book, FileText, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Solutions", href: "/explore", icon: Compass },
  { name: "About", href: "/about", icon: Book },
  { name: "Resources", href: "/resources", icon: FileText },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-dark border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-accent-green" strokeWidth={2} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">WiredLeap AI</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                    isActive
                      ? "text-white"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-4 h-4" strokeWidth={2} />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/10 rounded-lg border border-accent-green/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <Link
            href="/explore"
            className="hidden md:block px-5 py-2.5 bg-gradient-to-r from-accent-green to-accent-blue rounded-lg text-sm font-semibold text-primary-bg hover:scale-105 transition-transform"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
