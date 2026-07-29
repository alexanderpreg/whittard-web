'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/shared/components/shadcn-ui/input';
import { Label } from '@/shared/components/shadcn-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcn-ui/select';
import type { CheckoutSchemaType } from '../schema/checkout-schema';

const DOCUMENT_TYPES = [
  { value: 'dni', label: 'DNI' },
  { value: 'ce', label: 'Carné de Extranjería' },
  { value: 'ruc', label: 'RUC' },
];

export function PersonalInformationCard() {
  const { control } = useFormContext<CheckoutSchemaType>();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          name="customer.firstName"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>
                Nombre <span className="text-red-400">*</span>
              </Label>
              <Input
                id={field.name}
                {...field}
                placeholder="Ej: Juan"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <p className="text-xs text-red-500">{fieldState.error?.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="customer.lastName"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>
                Apellido <span className="text-red-400">*</span>
              </Label>
              <Input
                id={field.name}
                {...field}
                placeholder="Ej: Pérez"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <p className="text-xs text-red-500">{fieldState.error?.message}</p>
              )}
            </div>
          )}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          name="customer.email"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>
                Correo electrónico <span className="text-red-400">*</span>
              </Label>
              <Input
                id={field.name}
                type="email"
                {...field}
                placeholder="ejemplo@correo.com"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <p className="text-xs text-red-500">{fieldState.error?.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="customer.phone"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>
                Celular <span className="text-red-400">*</span>
              </Label>
              <Input
                id={field.name}
                type="tel"
                {...field}
                placeholder="999 999 999"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <p className="text-xs text-red-500">{fieldState.error?.message}</p>
              )}
            </div>
          )}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          name="customer.documentType"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>
                Tipo de documento <span className="text-red-400">*</span>
              </Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full" id={field.name}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map((doc) => (
                    <SelectItem key={doc.value} value={doc.value}>
                      {doc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <p className="text-xs text-red-500">{fieldState.error?.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="customer.documentNumber"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>
                N° de documento <span className="text-red-400">*</span>
              </Label>
              <Input
                id={field.name}
                {...field}
                placeholder="12345678"
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
        name="customer.company"
        control={control}
        render={({ field }) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>Empresa (opcional)</Label>
            <Input id={field.name} {...field} placeholder="Nombre de empresa" />
          </div>
        )}
      />
    </div>
  );
}
