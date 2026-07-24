'use client';

import { Button } from '@/shared/components/shadcn-ui/button';
import { Input } from '@/shared/components/shadcn-ui/input';

interface CouponSectionProps {
  coupon: string;
  couponState: 'idle' | 'valid' | 'invalid';
  onCouponChange: (coupon: string) => void;
  onApplyCoupon: () => void;
}

export function CouponSection({
  coupon,
  couponState,
  onCouponChange,
  onApplyCoupon,
}: CouponSectionProps) {
  return (
    <div className="max-w-sm space-y-2">
      <label htmlFor="coupon" className="block text-sm tracking-wide text-gray-500">
        Agrega tu cupón de descuento
      </label>
      <div className="flex gap-2">
        <Input
          id="coupon"
          value={coupon}
          onChange={(event) => onCouponChange(event.target.value)}
          placeholder="Agregar aquí"
          className="h-10 rounded-xs"
        />
        <Button
          type="button"
          className="bg-brand-primary hover:bg-brand-primary/90 h-10 rounded-xs px-8 text-white"
          onClick={onApplyCoupon}
        >
          Aplicar
        </Button>
      </div>
      {couponState === 'valid' && <p className="text-sm text-emerald-600">Cupón Válido</p>}
      {couponState === 'invalid' && <p className="text-sm text-red-500">Cupón Inválido</p>}
    </div>
  );
}
