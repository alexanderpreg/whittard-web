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
import { useRouter, useSearchParams } from 'next/navigation';

import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/useAuthStore';
import { GoogleLoginButton } from './GoogleLoginButton';

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
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/';

  const { setUser } = useAuthStore();
  const { handleGoogle, loading: googleLoading, error: googleError } = useGoogleAuth(redirect);

  const isBusy = isLoading || googleLoading;
  const shownError = error ?? googleError;

  const form = useForm<LoginSchemaType>({
    resolver: standardSchemaResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginSchemaType) => {
    setIsLoading(true);
    setError(null);

    const result = await authService.login(values);

    if (!result.success) {
      setError(result.message);
      setIsLoading(false);
      return;
    }

    setUser(result.data!.user);
    router.replace(redirect);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldSet>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-brand-primary block">
                  Email <span className="text-destructive">*</span>
                </FieldLabel>
                <InputGroup className="h-12 rounded-xs">
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="ejemplo@correo.com"
                    disabled={isBusy}
                    autoComplete="off"
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
                    placeholder="••••••••"
                    disabled={isBusy}
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
                      disabled={isBusy}
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

        {shownError && <p className="text-destructive text-sm">{shownError}</p>}

        <div className="flex items-center justify-start">
          <Link
            href="/recuperar-contrasena"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
          <Button
            type="submit"
            disabled={isBusy}
            className="bg-brand-primary hover:bg-brand-primary/90 h-13 w-full rounded-md text-base font-semibold text-white"
          >
            {isBusy ? (
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

        <FieldSeparator className="my-6">O inicia sesión con</FieldSeparator>

        <GoogleLoginButton onSuccess={handleGoogle} />
      </form>
    </div>
  );
}
