'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils/shadcn-cn';
import { Container } from '@/shared/components/custom-ui/Container';
import { ActiveLink } from '@/shared/navigation/ActiveLink';
import { categoryMegamenus, categoryNavigationItems } from '@/shared/navigation/routes';

type CategoryNavigationItem = {
  label: string;
  href: string;
  includeSubpath?: boolean;
};

type CategoryNavigationProps = {
  items?: readonly CategoryNavigationItem[];
};

export function CategoryNavigation({ items = categoryNavigationItems }: CategoryNavigationProps) {
  const navRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  const openMenu = useMemo(() => categoryMegamenus[openLabel ?? ''] ?? null, [openLabel]);

  useEffect(() => {
    const clearCloseTimer = () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };

    const closeMenu = () => {
      clearCloseTimer();
      setOpenLabel(null);
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      clearCloseTimer();
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const openMenuNow = (label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setOpenLabel(label);
  };

  const scheduleCloseMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setOpenLabel(null);
      closeTimerRef.current = null;
    }, 120);
  };

  return (
    <div ref={navRef} className="relative z-30" onMouseLeave={scheduleCloseMenu}>
      <Container
        as="nav"
        size="full"
        aria-label="Navegación de categorías"
        className="bg-brand-primary"
      >
        <div className="mx-auto flex h-10 items-center justify-center overflow-x-auto text-sm font-medium">
          <ul className="text-brand-white flex h-full items-center whitespace-nowrap">
            {items.map((item) => {
              const hasMenu = Boolean(categoryMegamenus[item.label]);
              const isOpen = openLabel === item.label;

              return (
                <li key={item.href} className="relative h-full">
                  {hasMenu ? (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={isOpen ? `megamenu-${item.label.toLowerCase()}` : undefined}
                      onClick={() =>
                        setOpenLabel((current) => (current === item.label ? null : item.label))
                      }
                      onMouseEnter={() => openMenuNow(item.label)}
                      onFocus={() => openMenuNow(item.label)}
                      onMouseLeave={scheduleCloseMenu}
                      className={cn(
                        'hover:text-brand-white relative inline-flex h-full items-center gap-1.5 border-b-2 px-6 transition-colors',
                        isOpen ? 'border-brand-white text-brand-white' : 'border-transparent',
                      )}
                    >
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    <ActiveLink
                      href={item.href}
                      className="hover:text-brand-white relative inline-flex h-full items-center border-b-2 border-transparent px-6 transition-colors"
                      activeClassName="border-brand-white text-brand-white"
                      includeSubpath={item.includeSubpath}
                    >
                      {item.label}
                    </ActiveLink>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>

      {openMenu ? (
        <div
          id={`megamenu-${(openLabel ?? '').toLowerCase()}`}
          className="absolute top-full left-0 hidden w-full border-b border-slate-200/80 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] lg:block"
          onMouseEnter={() => {
            if (closeTimerRef.current) {
              clearTimeout(closeTimerRef.current);
              closeTimerRef.current = null;
            }
          }}
          onMouseLeave={scheduleCloseMenu}
        >
          <Container size="container" className="px-4 py-10 lg:max-w-4xl!">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.85fr)]">
              <div className="grid gap-8">
                <div className="grid gap-8 md:grid-cols-3">
                  {openMenu.columns.map((column) => (
                    <div key={column.title}>
                      <h3 className="text-[0.72rem] font-semibold text-slate-500 uppercase">
                        {column.title}
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {column.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="group hover:text-brand-primary inline-flex items-center text-[15px] text-slate-700 transition-colors"
                              onClick={() => setOpenLabel(null)}
                            >
                              <span className="relative">
                                {item.label}
                                <span className="bg-brand-primary absolute -bottom-1 left-0 h-px w-0 transition-all group-hover:w-full" />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex w-full flex-wrap items-start justify-end gap-4">
                {openMenu.promos.map((promo) => (
                  <Link
                    key={promo.href}
                    href={promo.href}
                    onClick={() => setOpenLabel(null)}
                    className={cn(
                      'group relative aspect-video w-full overflow-hidden rounded-sm bg-slate-900',
                    )}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${promo.imageSrc})` }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </div>
  );
}
