'use client';

import { Eye, EyeOff, Loader2, Lock } from 'lucide-react';
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
import Link from 'next/link';

export const registerSchema = z
  .object({
    name: z.string().min(1, 'El nombre es obligatorio'),

    lastname: z.string().min(1, 'El apellido es obligatorio'),

    email: z
      .string()
      .min(1, 'El email es obligatorio')
      .pipe(
        z.email({
          error: 'Ingrese un email válido',
        }),
      ),

    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),

    password_confirmation: z.string().min(1, 'Repita la contraseña'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation'],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterSchemaType>({
    resolver: standardSchemaResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const onSubmit = (data: RegisterSchemaType) => {
    setIsLoading(true);

    console.log(data);

    setTimeout(() => {
      setIsLoading(false);
      alert('Registro exitoso');
    }, 1500);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldSet className="mb-8">
          {/* Nombre */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-brand-primary block">
                  Nombre completo
                  <span className="text-destructive">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-xs">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    placeholder="Escribe aquí"
                    disabled={isLoading}
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Apellido */}
          <Controller
            name="lastname"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-4">
                <FieldLabel htmlFor={field.name} className="text-brand-primary block">
                  Apellido completo
                  <span className="text-destructive">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-xs">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    placeholder="Escribe aquí"
                    disabled={isLoading}
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-4">
                <FieldLabel htmlFor={field.name} className="text-brand-primary block">
                  Email
                  <span className="text-destructive">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-xs">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="Email"
                    disabled={isLoading}
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-4">
                <FieldLabel htmlFor={field.name} className="text-brand-primary block">
                  Contraseña
                  <span className="text-destructive">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-xs">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña"
                    disabled={isLoading}
                  />

                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      size="icon-xs"
                      className="bg-transparent!"
                      disabled={isLoading}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Confirmar Password */}
          <Controller
            name="password_confirmation"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-4">
                <FieldLabel htmlFor={field.name} className="text-brand-primary block">
                  Repetir Contraseña
                  <span className="text-destructive">*</span>
                </FieldLabel>

                <InputGroup className="h-12 rounded-xs">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    placeholder="Repetir Contraseña"
                    disabled={isLoading}
                  />

                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      size="icon-xs"
                      className="bg-transparent!"
                      disabled={isLoading}
                      onClick={() => setShowPasswordConfirmation((prev) => !prev)}
                    >
                      {showPasswordConfirmation ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldSet>

        <Button
          type="submit"
          disabled={isLoading}
          className="mb-0 h-13 w-full rounded-md bg-neutral-900 text-base font-semibold text-white hover:bg-neutral-800"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Registrando...
            </>
          ) : (
            'Registrarme'
          )}
        </Button>
        <FieldSeparator className="my-8"> ¿Ya tienes una cuenta?</FieldSeparator>

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

        <Button
          type="button"
          variant="outline"
          className="text-brand-primary hover:text-brand-primary h-13 w-full rounded-sm border bg-transparent text-base font-medium"
          asChild
        >
          <Link href="/login" className="flex items-center gap-2.5">
            <Lock className="size-5" />
            Inicia Sesión con Contraseña
          </Link>
        </Button>
      </form>
    </div>
  );
}
