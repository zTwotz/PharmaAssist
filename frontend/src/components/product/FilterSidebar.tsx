'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryNode } from '@/lib/utils/category';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface FilterSidebarProps {
  categoryTree: CategoryNode[];
  brands: any[];
}

export function FilterSidebar({ categoryTree, brands }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category');
  const currentBrands = searchParams.getAll('brand');
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 5000000;

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  const handleBrandChange = (brandCode: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.append('brand', brandCode);
    } else {
      const allBrands = params.getAll('brand');
      params.delete('brand');
      allBrands.filter(b => b !== brandCode).forEach(b => params.append('brand', b));
    }
    // reset to page 1
    params.set('page', '1');
    router.push(`/san-pham?${params.toString()}`);
  };

  const handlePriceCommit = (values: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('minPrice', values[0].toString());
    params.set('maxPrice', values[1].toString());
    params.set('page', '1');
    router.push(`/san-pham?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/san-pham');
  };

  // Helper to check if a category or its children is active
  const isNodeActive = (node: CategoryNode, targetSlug: string | null): boolean => {
    if (!targetSlug) return false;
    if (node.slug === targetSlug) return true;
    if (node.children) {
      return node.children.some(child => isNodeActive(child, targetSlug));
    }
    return false;
  };

  // Get active nodes for default accordion expansion
  const getActiveNodes = (nodes: CategoryNode[]): string[] => {
    const active: string[] = [];
    const checkNodes = (items: CategoryNode[]) => {
      for (const item of items) {
        if (isNodeActive(item, currentCategory)) {
          active.push(item.slug);
        }
        if (item.children) {
          checkNodes(item.children);
        }
      }
    };
    checkNodes(nodes);
    return active;
  };

  const defaultExpanded = getActiveNodes(categoryTree);

  // Render a recursive accordion for categories
  const renderCategoryNode = (node: CategoryNode) => {
    const isActive = currentCategory === node.slug;
    
    if (node.children && node.children.length > 0) {
      return (
        <AccordionItem value={node.slug} key={node.id} className="border-b-0">
          <AccordionTrigger className={`py-2 hover:no-underline hover:text-[#024ad8] ${isActive ? 'text-[#024ad8] font-semibold' : 'text-gray-700'}`}>
            <Link href={`/san-pham?category=${node.slug}`} className="flex-1 text-left" onClick={(e) => e.stopPropagation()}>
              {node.name}
            </Link>
          </AccordionTrigger>
          <AccordionContent className="pb-1 pl-4 border-l border-gray-200 ml-2">
            <Accordion className="w-full" defaultValue={defaultExpanded}>
              {node.children.map(child => renderCategoryNode(child))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <div key={node.id} className="py-2">
        <Link 
          href={`/san-pham?category=${node.slug}`} 
          className={`flex items-center text-sm ${isActive ? 'text-[#024ad8] font-semibold' : 'text-gray-600 hover:text-[#024ad8]'}`}
        >
          <ChevronRight className="w-4 h-4 mr-1 opacity-50" />
          {node.name}
        </Link>
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-900">Bộ lọc tìm kiếm</h3>
        {(currentCategory || currentBrands.length > 0 || minPrice > 0 || maxPrice < 5000000) && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50">
            Xóa lọc
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-gray-500">Danh mục sản phẩm</h4>
          <Accordion className="w-full" defaultValue={defaultExpanded}>
            {categoryTree.map(node => renderCategoryNode(node))}
          </Accordion>
        </div>

        <hr className="border-gray-100" />

        {/* Brands */}
        <div>
          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-gray-500">Thương hiệu</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {brands.map(brand => (
              <div key={brand.code} className="flex items-center space-x-2">
                <Checkbox 
                  id={`brand-${brand.code}`} 
                  checked={currentBrands.includes(brand.code)}
                  onCheckedChange={(checked) => handleBrandChange(brand.code, checked as boolean)}
                />
                <label 
                  htmlFor={`brand-${brand.code}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 cursor-pointer"
                >
                  {brand.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Price Range */}
        <div>
          <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-gray-500">Khoảng giá</h4>
          <div className="px-2 pt-4 pb-2">
            <Slider
              defaultValue={[minPrice, maxPrice]}
              max={5000000}
              step={10000}
              value={priceRange}
              onValueChange={(val) => setPriceRange(val as number[])}
              onValueCommitted={(val) => handlePriceCommit(val as number[])}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[0])}</span>
            <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[1])}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
