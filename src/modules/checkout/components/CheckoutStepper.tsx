'use client';

import { cn } from '@/lib/utils/shadcn-cn';

const STEPS = [
  { id: 1, label: 'DATOS' },
  { id: 2, label: 'PAGO' },
];

interface CheckoutStepperProps {
  currentStep: number;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <nav aria-label="Progreso del checkout" className="w-full">
      <ol className="flex items-center justify-center gap-0 md:gap-2">
        {STEPS.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLast = index === STEPS.length - 1;

          return (
            <li key={step.id} className="flex items-center">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex size-7 items-center justify-center rounded-full text-xs font-semibold transition-colors md:size-8',
                    isActive && 'bg-brand-primary text-white',
                    isCompleted && 'bg-brand-quaternary text-white',
                    !isActive && !isCompleted && 'bg-brand-200 text-brand-secondary',
                  )}
                >
                  {isCompleted ? '✓' : step.id}
                </span>
                <span
                  className={cn(
                    'hidden text-sm font-semibold md:inline',
                    isActive && 'text-brand-primary',
                    isCompleted && 'text-brand-quaternary',
                    !isActive && !isCompleted && 'text-brand-400',
                  )}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'mx-2 h-px w-12 transition-colors md:mx-4 md:w-24',
                    isCompleted ? 'bg-brand-quaternary' : 'bg-brand-200',
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
