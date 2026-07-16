'use client';

import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/components/shadcn-ui/button';

import {
  Field,
  FieldError,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from '@/shared/components/shadcn-ui/field';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/components/shadcn-ui/input-group';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';

// 1. Esquema de validación Zod
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { error: 'El email es obligatorio' })
    .pipe(z.email({ error: 'Ingrese un email válido' })),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Instancia de useForm con Zod
  const form = useForm<LoginSchemaType>({
    resolver: standardSchemaResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    setIsLoading(true);
    console.log('Datos enviados:', data);

    setTimeout(() => {
      setIsLoading(false);
      alert('¡Formulario enviado con éxito!');
    }, 1500);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldSet>
          {/* Campo Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-brand-primary block">
                  Email <span className="text-destructive">*</span>
                </FieldLabel>

                {/* Usamos InputGroup opcionalmente también aquí o InputGroupInput directo */}
                <InputGroup className="h-12 rounded-xs">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="ejemplo@correo.com"
                    disabled={isLoading}
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Campo Contraseña refactorizado con InputGroup */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-4">
                <FieldLabel htmlFor={field.name} className="text-brand-primary block">
                  Contraseña <span className="text-destructive">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-xs">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    disabled={isLoading}
                    autoComplete="current-password"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      size="icon-xs"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="bg-transparent!"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldSet>

        {/* Olvidaste tu contraseña */}
        <div className="flex items-center justify-start">
          <Link
            href="/recuperar-contrasena"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:underline"
            scroll
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Botones de Acción */}
        <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
          {/* Botón oficial de Shadcn con icono de Spinner/Loader integrado */}
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-brand-primary hover:bg-brand-primary/90 h-13 w-full rounded-md text-base font-semibold text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Ingresando...
              </>
            ) : (
              'Ingresar'
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-13 w-full rounded-md border-neutral-900 text-base font-semibold text-neutral-900 hover:bg-neutral-50"
            asChild
          >
            <Link href="/registro">Crear Cuenta</Link>
          </Button>
        </div>

        {/* Separador */}
        <FieldSeparator className="my-6">O inicia sesión con</FieldSeparator>

        {/* Botón de Google */}
        <Button
          type="button"
          variant="outline"
          onClick={() => alert('Iniciar sesión con Google (Maqueta)')}
          className="text-brand-primary hover:text-brand-primary h-13 w-full cursor-pointer justify-center gap-3 rounded-sm border text-base font-medium"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continuar con Google
        </Button>
      </form>
    </div>
  );
}
