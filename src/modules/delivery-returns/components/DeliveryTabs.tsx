'use client';

import { useState } from 'react';
import { DeliveryContent } from './DeliveryContent';
import { DevolucionesContent } from './DevolucionesContent';

type Tab = 'delivery' | 'devoluciones';

const TABS: { id: Tab; label: string }[] = [
  { id: 'delivery', label: 'Delivery' },
  { id: 'devoluciones', label: 'Devoluciones' },
];

export function DeliveryTabs() {
  const [active, setActive] = useState<Tab>('delivery');

  return (
    <div className="w-full">
      <div className="border-brand-200 grid grid-cols-2 border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`py-3 text-sm font-medium tracking-widest uppercase transition-colors ${
              active === tab.id
                ? 'bg-brand-primary text-brand-white'
                : 'bg-brand-white text-brand-primary hover:bg-brand-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-10">
        {active === 'delivery' ? <DeliveryContent /> : <DevolucionesContent />}
      </div>
    </div>
  );
}
