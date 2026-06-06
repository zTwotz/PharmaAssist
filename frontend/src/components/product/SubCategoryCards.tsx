'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronRight, Pill, Heart, Shield, Eye, Activity, Baby, Sparkles, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to assign a random icon based on index or name
const getIcon = (index: number) => {
  const icons = [Pill, Heart, Shield, Eye, Activity, Baby, Sparkles, Smile];
  const IconComponent = icons[index % icons.length];
  return <IconComponent className="w-8 h-8 text-[#024ad8] mb-3" strokeWidth={1.5} />;
};

interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

interface SubCategoryCardsProps {
  subCategories: SubCategory[];
  parentName?: string;
  parentPath: string;
}

export function SubCategoryCards({ subCategories, parentName, parentPath }: SubCategoryCardsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const currentCategorySlug = searchParams.get('category');

  if (!subCategories || subCategories.length === 0) return null;

  return (
    <div className="mb-8">
      {parentName && (
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{parentName}</h2>
      )}
      
      <div className="relative group">
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {subCategories.map((cat, index) => {
            const isActive = currentCategorySlug === cat.slug;
            
            return (
              <Link
                key={cat.id}
                href={`${parentPath}/${cat.slug}`}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[160px] h-[120px] bg-white rounded-2xl border transition-all duration-200 snap-start hover:shadow-md hover:border-[#024ad8]/30 group/card",
                  isActive ? "border-[#024ad8] shadow-sm ring-1 ring-[#024ad8]/10" : "border-gray-100 shadow-sm"
                )}
              >
                <div className={cn("transition-transform duration-300 group-hover/card:scale-110", isActive && "scale-110")}>
                  {getIcon(index)}
                </div>
                <span className={cn(
                  "text-sm font-medium text-center px-4 line-clamp-2",
                  isActive ? "text-[#024ad8]" : "text-gray-700"
                )}>
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
        
        {/* Optional scroll button could go here */}
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-[#024ad8] opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hidden md:flex"
          onClick={() => {
            if (scrollRef.current) {
              scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            }
          }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
