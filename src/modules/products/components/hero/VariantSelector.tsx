'use client';

import { cn, formatCurrency } from '@/lib/utils';
import type { VariantGroup } from '@/modules/products/types/productDetail';
import { Check } from 'lucide-react';

interface VariantSelectorProps {
  groups: VariantGroup[];
  selectedOptions: Record<string, string>;
  onOptionChange: (groupId: string, optionId: string) => void;
}

function PillsGroup({
  group,
  selectedId,
  onSelect,
}: {
  group: VariantGroup;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {group.options.map((option) => {
        const isSelected = option.id === selectedId;
        return (
          <button
            key={option.id}
            type="button"
            disabled={!option.isAvailable}
            onClick={() => onSelect(option.id)}
            className={cn(
              'relative min-w-[4rem] cursor-pointer rounded-xs border px-3 py-2 text-sm font-medium transition-all',
              isSelected
                ? 'border-brand-primary bg-brand-primary text-white'
                : 'border-brand-primary/20 text-brand-primary hover:border-brand-primary/60',
              !option.isAvailable && 'cursor-not-allowed opacity-40',
            )}
            aria-pressed={isSelected}
          >
            {option.discountBadge && (
              <span className="absolute -top-2 -right-2 rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] leading-none font-bold text-white">
                {option.discountBadge}
              </span>
            )}
            <span>{option.label}</span>
            {option.sublabel && (
              <span className="mt-0.5 block text-[10px] opacity-70">{option.sublabel}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function IconGridGroup({
  group,
  selectedId,
  onSelect,
}: {
  group: VariantGroup;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {group.options.map((option) => {
        const isSelected = option.id === selectedId;
        return (
          <button
            key={option.id}
            type="button"
            disabled={!option.isAvailable}
            onClick={() => onSelect(option.id)}
            className={cn(
              'flex cursor-pointer flex-col items-center gap-1.5 rounded-xs border p-3 text-center text-sm font-medium transition-all',
              isSelected
                ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                : 'border-brand-primary/20 text-brand-secondary hover:border-brand-primary/60',
              !option.isAvailable && 'cursor-not-allowed opacity-40',
            )}
            aria-pressed={isSelected}
          >
            {option.discountBadge && (
              <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] leading-none font-bold text-white">
                {option.discountBadge}
              </span>
            )}
            {option.iconUrl ? (
              <img src={option.iconUrl} alt="" className="h-8 w-8 object-contain" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-400">
                {option.label.charAt(0)}
              </div>
            )}
            <span className="leading-tight">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function VerticalListGroup({
  group,
  selectedId,
  onSelect,
}: {
  group: VariantGroup;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {group.options.map((option) => {
        const isSelected = option.id === selectedId;
        return (
          <button
            key={option.id}
            type="button"
            disabled={!option.isAvailable}
            onClick={() => onSelect(option.id)}
            className={cn(
              'flex w-full cursor-pointer items-center justify-between rounded-xs border px-4 py-3 text-sm font-medium transition-all',
              isSelected
                ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                : 'border-brand-primary/20 text-brand-secondary hover:border-brand-primary/60',
              !option.isAvailable && 'cursor-not-allowed opacity-40',
            )}
            aria-pressed={isSelected}
          >
            <div className="flex items-center gap-3">
              {isSelected && <Check className="h-4 w-4 shrink-0" />}
              <div className="text-left">
                <span>{option.label}</span>
                {option.sublabel && (
                  <span className="ml-2 text-xs opacity-60">{option.sublabel}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {option.discountBadge && (
                <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-sm leading-none font-bold text-white">
                  {option.discountBadge}
                </span>
              )}
              {option.price !== undefined && (
                <span className="text-sm font-semibold">{formatCurrency(option.price)}</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

const groupRenderers: Record<
  string,
  React.ComponentType<{ group: VariantGroup; selectedId: string; onSelect: (id: string) => void }>
> = {
  pills: PillsGroup,
  'icon-grid': IconGridGroup,
  'vertical-list': VerticalListGroup,
};

export function VariantSelector({ groups, selectedOptions, onOptionChange }: VariantSelectorProps) {
  if (!groups || groups.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => {
        const Renderer = groupRenderers[group.type];
        if (!Renderer) return null;

        return (
          <div key={group.id} className="flex flex-col gap-1.5">
            <label className="text-brand-primary text-sm font-medium tracking-wide">
              {group.name}
            </label>
            <Renderer
              group={group}
              selectedId={selectedOptions[group.id] ?? ''}
              onSelect={(optionId) => onOptionChange(group.id, optionId)}
            />
          </div>
        );
      })}
    </div>
  );
}
