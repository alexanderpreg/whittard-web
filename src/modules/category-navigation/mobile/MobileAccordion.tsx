'use client';

import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/shadcn-ui/accordion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/shadcn-ui/collapsible';
import { Separator } from '@/shared/components/shadcn-ui/separator';
import { ChevronDown } from 'lucide-react';

import type { Category } from '../types/category-navigation.types';
import { buildCategoryNavigationUrl } from '../utils/buildCategoryNavigationUrl';

interface MobileAccordionProps {
  categories: Category[];
  onNavigate?: () => void;
}

function GroupCollapsible({
  group,
  categorySlug,
  onNavigate,
}: {
  group: Category['groups'][number];
  categorySlug: string;
  onNavigate?: () => void;
}) {
  return (
    <Collapsible>
      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-slate-700">{group.name}</span>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="text-slate-400 transition-transform data-open:rotate-180"
            aria-label={`Expandir ${group.name}`}
          >
            <ChevronDown className="size-4" />
          </button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <ul className="ml-2 space-y-2 border-l-2 border-slate-100 pb-2 pl-3">
          {group.items.map((item) => (
            <li key={item.id}>
              <Link
                href={buildCategoryNavigationUrl(categorySlug, item.slug)}
                onClick={onNavigate}
                className="text-[15px] text-slate-600 transition-colors hover:text-slate-900"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function MobileAccordion({ categories, onNavigate }: MobileAccordionProps) {
  return (
    <Accordion type="multiple" className="px-4">
      {categories.map((category) => (
        <AccordionItem key={category.id} value={String(category.id)}>
          <AccordionTrigger className="py-3 text-base font-medium text-slate-800">
            {category.name}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1 pb-2">
              {category.groups.map((group) => (
                <GroupCollapsible
                  key={group.id}
                  group={group}
                  categorySlug={category.slug}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </AccordionContent>
          <Separator />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
