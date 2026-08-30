'use client';

import { Eye, EyeOff, Loader2, Lock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
import { useRouter } from 'next/navigation';

import { useGoogleIdentity } from '@/lib/hooks/useGoogleIdentity';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/useAuthStore';

export const registerSchema = z
  .object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    lastname: z.string().min(1, 'El apellido es obligatorio'),
    email: z
      .string()
      .min(1, 'El email es obligatorio')
      .pipe(z.email({ error: 'Ingrese un email válido' })),
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
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { setUser, isAuthenticated } = useAuthStore();

  const { renderGoogleButton, scriptLoaded } = useGoogleIdentity({
    isAuthenticated,
    disabled: isLoading,
    onSuccess: async (token, picture) => {
      setIsLoading(true);
      setError(null);

      const result = await authService.loginWithGoogle({ token });

      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
        return;
      }

      setUser(result.data!.user, picture);
      router.replace('/');
    },
  });

  useEffect(() => {
    renderGoogleButton('google-btn-register');
  }, [renderGoogleButton, scriptLoaded]);

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

  const onSubmit = async (values: RegisterSchemaType) => {
    setIsLoading(true);
    setError(null);

    const result = await authService.register({
      name: `${values.name} ${values.lastname}`,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    });

    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
      return;
    }

    setUser(result.data!.user);
    router.replace('/');
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldSet className="mb-8">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-brand-primary block">
                  Nombre completo <span className="text-destructive">*</span>
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

          <Controller
            name="lastname"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-4">
                <FieldLabel htmlFor={field.name} className="text-brand-primary block">
                  Apellido completo <span className="text-destructive">*</span>
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

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-4">
                <FieldLabel htmlFor={field.name} className="text-brand-primary block">
                  Email <span className="text-destructive">*</span>
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

          <Controller
            name="password_confirmation"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-4">
                <FieldLabel htmlFor={field.name} className="text-brand-primary block">
                  Repetir Contraseña <span className="text-destructive">*</span>
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

        {error && <p className="text-destructive text-sm">{error}</p>}

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

        <FieldSeparator className="my-8">¿Ya tienes una cuenta?</FieldSeparator>

        <div id="google-btn-register" className="flex w-full justify-center" />

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
