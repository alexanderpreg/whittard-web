'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/shared/components/shadcn-ui/button';
import { Input } from '@/shared/components/shadcn-ui/input';
import { Label } from '@/shared/components/shadcn-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcn-ui/select';
import { Textarea } from '@/shared/components/shadcn-ui/textarea';
import { MOCK_DEPARTMENTS } from '../mocks/locations.mock';
import type { AddressFormData } from '../types/profile';

export function AddressForm() {
  const { control, handleSubmit, reset, watch, setValue } = useForm<AddressFormData>({
    defaultValues: {
      address: '',
      number: '',
      department: '',
      province: '',
      district: '',
      reference: '',
    },
  });

  const [submitted, setSubmitted] = useState(false);

  const selectedDepartment = watch('department');
  const selectedProvince = watch('province');

  const department = MOCK_DEPARTMENTS.find((d) => d.id === selectedDepartment);
  const provinces = department?.provinces ?? [];
  const districts = department?.provinces.find((p) => p.id === selectedProvince)?.districts ?? [];

  const onSubmit = (data: AddressFormData) => {
    console.log('Address submitted:', data);
    setSubmitted(true);
    setTimeout(() => {
      reset();
      setSubmitted(false);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-brand-quaternary/10 mb-4 flex size-14 items-center justify-center rounded-full">
          <MapPinIcon className="text-brand-quaternary size-6" />
        </div>
        <p className="text-brand-primary text-lg font-semibold">Dirección registrada</p>
        <p className="text-brand-secondary mt-1 text-sm">
          Tu dirección se ha guardado correctamente.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-4">
        <Controller
          name="address"
          control={control}
          rules={{ required: 'La dirección es obligatoria' }}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5 md:col-span-3">
              <Label htmlFor={field.name}>
                Dirección <span className="text-red-400">*</span>
              </Label>
              <Input
                id={field.name}
                {...field}
                placeholder="Ej: Av. Principal"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <p className="text-xs text-red-500">{fieldState.error?.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="number"
          control={control}
          rules={{ required: 'El número es obligatorio' }}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>
                Número <span className="text-red-400">*</span>
              </Label>
              <Input
                id={field.name}
                {...field}
                placeholder="Ej: 123"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <p className="text-xs text-red-500">{fieldState.error?.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Controller
          name="department"
          control={control}
          rules={{ required: 'Selecciona un departamento' }}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>
                Departamento <span className="text-red-400">*</span>
              </Label>
              <Select
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val);
                  setValue('province', '');
                  setValue('district', '');
                }}
              >
                <SelectTrigger className="w-full" id={field.name}>
                  <SelectValue placeholder="Seleccionar departamento" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_DEPARTMENTS.map((dep) => (
                    <SelectItem key={dep.id} value={dep.id}>
                      {dep.name}
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
          name="province"
          control={control}
          rules={{ required: 'Selecciona una provincia' }}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>
                Provincia <span className="text-red-400">*</span>
              </Label>
              <Select
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val);
                  setValue('district', '');
                }}
                disabled={!selectedDepartment}
              >
                <SelectTrigger className="w-full" id={field.name}>
                  <SelectValue placeholder="Seleccionar provincia" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((prov) => (
                    <SelectItem key={prov.id} value={prov.id}>
                      {prov.name}
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
          name="district"
          control={control}
          rules={{ required: 'Selecciona un distrito' }}
          render={({ field, fieldState }) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>
                Distrito <span className="text-red-400">*</span>
              </Label>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={!selectedProvince}
              >
                <SelectTrigger className="w-full" id={field.name}>
                  <SelectValue placeholder="Seleccionar distrito" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((dist) => (
                    <SelectItem key={dist.id} value={dist.id}>
                      {dist.name}
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
      </div>

      <Controller
        name="reference"
        control={control}
        render={({ field }) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name}>Referencia (opcional)</Label>
            <Textarea
              id={field.name}
              {...field}
              placeholder="Ej: Cerca al parque, edificio azul"
              className="min-h-20"
            />
          </div>
        )}
      />

      <Button
        type="submit"
        className="bg-brand-primary hover:bg-brand-primary/90 h-12 w-full rounded-xs text-sm font-semibold text-white md:w-auto md:px-10"
      >
        Agregar
      </Button>
    </form>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
