'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { Container } from '@/shared/components/custom-ui/Container';

import { MegaMenuDesktop } from './desktop/MegaMenuDesktop';
import { useCategoryNavigation } from './hooks/useCategoryNavigation';
import { MobileNavigation } from './mobile/MobileNavigation';

export function CategoryNavigation() {
  const { categories, getCategoryByLabel } = useCategoryNavigation();
  const navRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  const openCategory = openLabel ? getCategoryByLabel(openLabel) : undefined;

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleCloseMenu = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpenLabel(null);
      closeTimerRef.current = null;
    }, 120);
  }, [clearCloseTimer]);

  const openMenuNow = useCallback(
    (label: string) => {
      clearCloseTimer();
      setOpenLabel(label);
    },
    [clearCloseTimer],
  );

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    setOpenLabel(null);
  }, [clearCloseTimer]);

  const handleNavigate = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  useEffect(() => {
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
  }, [closeMenu, clearCloseTimer]);

  return (
    <>
      <MobileNavigation categories={categories} />

      <div ref={navRef} className="relative z-30 hidden lg:block" onMouseLeave={scheduleCloseMenu}>
        <Container
          as="nav"
          size="full"
          aria-label="Navegación de categorías"
          className="bg-brand-primary"
        >
          <div className="mx-auto flex h-10 items-center justify-center overflow-x-auto text-sm font-medium">
            <ul className="text-brand-white flex h-full items-center whitespace-nowrap">
              {categories.map((category) => {
                const isOpen = openLabel === category.name;

                return (
                  <li key={category.id} className="relative h-full">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={isOpen ? `megamenu-${category.slug}` : undefined}
                      onClick={() =>
                        setOpenLabel((current) =>
                          current === category.name ? null : category.name,
                        )
                      }
                      onMouseEnter={() => openMenuNow(category.name)}
                      onFocus={() => openMenuNow(category.name)}
                      onMouseLeave={scheduleCloseMenu}
                      className={cn(
                        'hover:text-brand-white relative inline-flex h-full items-center gap-1.5 border-b-2 px-6 transition-colors',
                        isOpen ? 'border-brand-white text-brand-white' : 'border-transparent',
                      )}
                    >
                      <span>{category.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>

        {openCategory ? (
          <div
            id={`megamenu-${openCategory.slug}`}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleCloseMenu}
          >
            <MegaMenuDesktop category={openCategory} onNavigate={handleNavigate} />
          </div>
        ) : null}
      </div>
    </>
  );
}
