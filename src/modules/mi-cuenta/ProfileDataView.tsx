'use client';

import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { useEffect, useState } from 'react';
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

import { PageHeader } from './components/PageHeader';
import type { PersonalDataFormData } from './types/profile';

const DOCUMENT_TYPES = [
  { value: 'dni', label: 'DNI' },
  { value: 'ce', label: 'Carné de Extranjería' },
  { value: 'ruc', label: 'RUC' },
];

export function ProfileDataView() {
  const { user } = useAuthStore();

  const { control, handleSubmit, reset } = useForm<PersonalDataFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      documentType: '',
      documentNumber: '',
    },
    mode: 'onSubmit',
  });

  // 👇 Sincroniza los valores del formulario cuando el usuario rehidrata desdel store
  useEffect(() => {
    if (user) {
      const nameParts = user.name?.trim().split(' ') ?? [];
      const firstName = nameParts[0] ?? '';
      const lastName = nameParts.slice(1).join(' ') ?? '';

      reset({
        firstName,
        lastName,
        email: user.email ?? '',
        phone: '',
        documentType: '',
        documentNumber: '',
      });
    }
  }, [user, reset]);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const onSubmit = (data: PersonalDataFormData) => {
    setSaving(true);
    console.log('Personal data submitted:', data);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1500);
  };

  return (
    <>
      <PageHeader title="Mis Datos" subtitle="Sobre mi cuenta" />

      <div className="border-brand-200 rounded-lg border bg-white p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'El nombre es obligatorio' }}
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
            name="lastName"
            control={control}
            rules={{ required: 'Los apellidos son obligatorios' }}
            render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name}>
                  Apellidos <span className="text-red-400">*</span>
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

          <div className="grid gap-5 md:grid-cols-2">
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'El correo es obligatorio',
                pattern: { value: /^\S+@\S+$/i, message: 'Correo inválido' },
              }}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <Label htmlFor={field.name}>
                    Correo <span className="text-red-400">*</span>
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
              name="phone"
              control={control}
              rules={{ required: 'El teléfono es obligatorio' }}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <Label htmlFor={field.name}>
                    Teléfono <span className="text-red-400">*</span>
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

          <div className="grid gap-5 md:grid-cols-2">
            <Controller
              name="documentType"
              control={control}
              rules={{ required: 'Selecciona un tipo de documento' }}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <Label htmlFor={field.name}>
                    Tipo Documento <span className="text-red-400">*</span>
                  </Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full" id={field.name}>
                      <SelectValue placeholder="Seleccionar" />
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
              name="documentNumber"
              control={control}
              rules={{ required: 'El número de documento es obligatorio' }}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <Label htmlFor={field.name}>
                    Número Documento <span className="text-red-400">*</span>
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

          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={saving}
              className="bg-brand-primary hover:bg-brand-primary/90 h-12 rounded-xs px-10 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? 'Guardando...' : 'Agregar'}
            </Button>
            {saved && (
              <span className="text-brand-quaternary text-xs font-medium">
                Datos guardados correctamente
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
