'use client';

import { ScrollArea } from '@/shared/components/shadcn-ui/scroll-area';
import { SheetContent, SheetHeader, SheetTitle } from '@/shared/components/shadcn-ui/sheet';

import type { Category } from '../types/category-navigation.types';
import { MobileAccordion } from './MobileAccordion';

interface MobileNavigationProps {
  categories: Category[];
}

export function MobileNavigation({ categories }: MobileNavigationProps) {
  return (
    <SheetContent side="left" className="w-full max-w-sm p-0">
      <SheetHeader className="border-b px-4 py-3">
        <SheetTitle className="text-left text-base">Categorías</SheetTitle>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <MobileAccordion
          categories={categories}
          onNavigate={() => {
            const closeButton = document.querySelector('[data-slot="sheet-close"]');
            if (closeButton instanceof HTMLElement) closeButton.click();
          }}
        />
      </ScrollArea>
    </SheetContent>
  );
}
