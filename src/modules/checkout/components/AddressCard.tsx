'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/shared/components/shadcn-ui/input';
import { Label } from '@/shared/components/shadcn-ui/label';
import type { CheckoutSchemaType } from '../schema/checkout-schema';

export function AddressCard() {
  const { control } = useFormContext<CheckoutSchemaType>();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Controller
          name="address.department"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>
                Departamento <span className="text-red-400">*</span>
              </Label>
              <Input
                id={field.name}
                {...field}
                placeholder="Ej: Lima"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <p className="text-xs text-red-500">{fieldState.error?.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="address.province"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>
                Provincia <span className="text-red-400">*</span>
              </Label>
              <Input
                id={field.name}
                {...field}
                placeholder="Ej: Lima"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <p className="text-xs text-red-500">{fieldState.error?.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="address.district"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>
                Distrito <span className="text-red-400">*</span>
              </Label>
              <Input
                id={field.name}
                {...field}
                placeholder="Ej: Miraflores"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <p className="text-xs text-red-500">{fieldState.error?.message}</p>
              )}
            </div>
          )}
        />
      </div>
      <Controller
        name="address.address"
        control={control}
        render={({ field, fieldState }) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>
              Dirección <span className="text-red-400">*</span>
            </Label>
            <Input
              id={field.name}
              {...field}
              placeholder="Av. / Jr. / Calle y número"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && (
              <p className="text-xs text-red-500">{fieldState.error?.message}</p>
            )}
          </div>
        )}
      />
      <Controller
        name="address.reference"
        control={control}
        render={({ field }) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>Referencia</Label>
            <Input id={field.name} {...field} placeholder="Ej: Cerca al parque, edificio azul" />
          </div>
        )}
      />
    </div>
  );
}
