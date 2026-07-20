'use client';

import { Text } from '@/shared/components/custom-ui/Text';
import { Button } from '@/shared/components/shadcn-ui/button';
import { Checkbox } from '@/shared/components/shadcn-ui/checkbox';
import { Field, FieldError } from '@/shared/components/shadcn-ui/field';
import { Input } from '@/shared/components/shadcn-ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcn-ui/select';
import { Textarea } from '@/shared/components/shadcn-ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod/v4';
import type { ClaimsBookContent } from '../types/claims-book';

const MAX_CHARS = 700;

const formSchema = z
  .object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.string().email('El correo electrónico no es válido'),
    document_type_id: z.string().min(1, 'El tipo de documento es obligatorio'),
    document_number: z.string().min(1, 'El número de documento es obligatorio'),
    address: z.string().min(1, 'La dirección es obligatoria'),
    district: z.string().min(1, 'El distrito es obligatorio'),
    phone_number: z.string().min(1, 'El número de celular es obligatorio'),
    well_hired_id: z.string().min(1, 'El producto o servicio es obligatorio'),
    type_of_service_id: z.string().min(1, 'El nombre del producto es obligatorio'),
    type_of_claim_id: z.string().min(1, 'El tipo de reclamo es obligatorio'),
    description: z.string().min(1, 'La descripción es obligatoria'),
    terms_conditions: z.boolean().refine((val) => val === true, {
      message: 'Debes aceptar los términos y condiciones',
    }),
    file_attached: z
      .instanceof(File)
      .nullable()
      .refine((file) => !file || file.size <= 20 * 1024 * 1024, {
        message: 'El archivo no debe pesar más de 20MB',
      }),
  })
  .refine(
    (data) => {
      const type = data.document_type_id;
      const num = data.document_number;
      if (type === 'DNI') return /^[0-9]{8}$/.test(num);
      if (type === 'RUC') return /^[0-9]{11}$/.test(num);
      if (type === 'CE') return /^[a-zA-Z0-9]{4,15}$/.test(num);
      if (type === 'razon_social') return /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.]{3,255}$/.test(num);
      return true;
    },
    {
      message: 'El formato o longitud del documento no es válido para el tipo seleccionado',
      path: ['document_number'],
    },
  );

type FormValues = z.infer<typeof formSchema>;

const INITIAL_STATE: FormValues = {
  name: '',
  email: '',
  document_type_id: '',
  document_number: '',
  address: '',
  district: '',
  phone_number: '',
  well_hired_id: '',
  type_of_service_id: '',
  type_of_claim_id: '',
  description: '',
  terms_conditions: false,
  file_attached: null,
};

interface ClaimsBookFormProps {
  content: ClaimsBookContent;
}

export function ClaimsBookForm({ content }: ClaimsBookFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { subtitle, paragraph, info_definitions = [] } = content;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: INITIAL_STATE,
    mode: 'onSubmit',
  });

  const fileValue = useWatch({ control, name: 'file_attached' });
  const descriptionValue = useWatch({ control, name: 'description' });
  const termsValue = useWatch({ control, name: 'terms_conditions' });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      console.log('Form values:', values);
    } catch (error) {
      console.error('Error al enviar el reclamo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Fila 1: Nombre y Email */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field>
          <Input
            placeholder="Nombres y Apellidos"
            className="border-brand-200 h-12 rounded-md text-sm"
            {...register('name')}
          />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field>
          <Input
            type="email"
            placeholder="Correo"
            className="border-brand-200 h-12 rounded-md text-sm"
            {...register('email')}
          />
          <FieldError errors={[errors.email]} />
        </Field>
      </div>

      {/* Fila 2: Tipo doc, N° doc, Fecha (Alineados en h-12) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Field>
          <Select
            onValueChange={(val) => setValue('document_type_id', val, { shouldValidate: true })}
          >
            <SelectTrigger
              size="xl"
              className="border-brand-200 text-brand-secondary bg-brand-white focus:ring-brand-primary flex w-full items-center justify-between rounded-md px-4 text-sm focus:ring-1"
            >
              <SelectValue placeholder="Tipo de Documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo de Documento</SelectLabel>
                <SelectItem value="DNI">DNI</SelectItem>
                <SelectItem value="RUC">RUC</SelectItem>
                <SelectItem value="CE">CE</SelectItem>
                <SelectItem value="razon_social">Razón Social</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldError errors={[errors.document_type_id]} />
        </Field>
        <Field>
          <Input
            placeholder="N° de Documento"
            className="border-brand-200 h-12 rounded-md text-sm"
            {...register('document_number')}
          />
          <FieldError errors={[errors.document_number]} />
        </Field>
        <Input
          type="text"
          defaultValue={format(new Date(), 'yyyy-MM-dd')}
          className="border-brand-200 bg-brand-50 h-12 rounded-md text-sm"
          readOnly
        />
      </div>

      {/* Fila 3: Dirección, Distrito, Teléfono */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Field>
          <Input
            placeholder="Dirección"
            className="border-brand-200 h-12 rounded-md text-sm"
            {...register('address')}
          />
          <FieldError errors={[errors.address]} />
        </Field>
        <Field>
          <Input
            placeholder="Distrito"
            className="border-brand-200 h-12 rounded-md text-sm"
            {...register('district')}
          />
          <FieldError errors={[errors.district]} />
        </Field>
        <Field>
          <Input
            type="tel"
            placeholder="Número de Celular"
            className="border-brand-200 h-12 rounded-md text-sm"
            {...register('phone_number')}
          />
          <FieldError errors={[errors.phone_number]} />
        </Field>
      </div>

      {/* Fila 4: Producto/Servicio y Nombre */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field>
          <Select onValueChange={(val) => setValue('well_hired_id', val, { shouldValidate: true })}>
            <SelectTrigger
              size="xl"
              className="border-brand-200 text-brand-secondary bg-brand-white focus:ring-brand-primary flex w-full items-center justify-between rounded-md px-4 text-sm focus:ring-1"
            >
              <SelectValue placeholder="Producto o Servicio" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Producto o Servicio</SelectLabel>
                <SelectItem value="Producto">Producto</SelectItem>
                <SelectItem value="Servicio">Servicio</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldError errors={[errors.well_hired_id]} />
        </Field>
        <Field>
          <Input
            placeholder="Nombre del Producto o Servicio"
            className="border-brand-200 h-12 rounded-md text-sm"
            {...register('type_of_service_id')}
          />
          <FieldError errors={[errors.type_of_service_id]} />
        </Field>
      </div>

      {/* Tipo de reclamo / queja */}
      <div className="space-y-3">
        <p className="text-brand-primary text-sm font-medium">
          ¿Deseas presentar un reclamo o una queja?
        </p>
        <div className="max-w-md">
          <Field>
            <Select
              onValueChange={(val) => setValue('type_of_claim_id', val, { shouldValidate: true })}
            >
              <SelectTrigger
                size="xl"
                className="border-brand-200 text-brand-secondary bg-brand-white focus:ring-brand-primary flex w-full items-center justify-between rounded-md px-4 text-sm focus:ring-1"
              >
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Opciones</SelectLabel>
                  {info_definitions.map((item, idx) => (
                    <SelectItem key={idx} value={item.label.toLowerCase()}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError errors={[errors.type_of_claim_id]} />
          </Field>
        </div>

        <div className="text-brand-secondary space-y-1.5 text-sm leading-relaxed">
          {info_definitions.map((item, idx) => (
            <p key={idx}>
              <strong className="text-brand-primary">{item.label}:</strong> {item.value}
            </p>
          ))}
        </div>
      </div>

      {/* Detalle del Reclamo */}
      <Field className="flex flex-col justify-start">
        <div className="relative w-full">
          <Textarea
            placeholder="Detalle del reclamo o queja"
            maxLength={MAX_CHARS}
            className="border-brand-200 text-brand-primary bg-brand-white focus-visible:ring-brand-primary placeholder:text-brand-secondary/50 h-42 w-full resize-none rounded-md border p-4 text-left text-sm outline-hidden transition-all placeholder:font-light placeholder-shown:pt-[72px] placeholder-shown:text-center focus-visible:ring-1"
            {...register('description')}
          />

          {/* Contador flotando perfectamente en la esquina inferior derecha interna */}
          <div className="text-brand-400 font-brand-avenir-lt pointer-events-none absolute right-4 bottom-4 text-xs select-none">
            {descriptionValue?.length || 0} / {MAX_CHARS}
          </div>
        </div>
        <FieldError errors={[errors.description]} />
      </Field>

      {/* Observaciones del proveedor */}
      <div className="border-brand-100 text-brand-secondary space-y-3 border-t pt-4 text-xs leading-relaxed md:text-sm">
        {subtitle && <h3 className="text-brand-primary font-bold tracking-wider">{subtitle}</h3>}
        {paragraph && (
          <div className="space-y-2 [&_p]:mb-2" dangerouslySetInnerHTML={{ __html: paragraph }} />
        )}
      </div>

      {/* Términos y condiciones */}
      <Field className="pt-2">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={termsValue}
            onCheckedChange={(checked) =>
              setValue('terms_conditions', checked === true, { shouldValidate: true })
            }
            className="border-brand-300 focus-visible:ring-brand-primary mt-0.5 size-4 rounded"
          />
          <p className="text-brand-secondary text-sm leading-normal">
            Declaro que he leído y acepto los{' '}
            <a href="/terms" className="text-brand-primary font-medium underline">
              Términos y Condiciones
            </a>
            , que la información consignada es verdadera, y autorizo el tratamiento de mis datos
            personales conforme a la Ley N.º 29733 y su reglamento.
          </p>
        </div>
        <FieldError errors={[errors.terms_conditions]} />
      </Field>

      {/* Adjuntos: Ajustado a 100% de ancho según el Figma */}

      <div className="font-brand-avenir-lt space-y-3 pt-2">
        <div>
          <Text variant="small" className="text-brand-primary mb-1 text-xs font-bold">
            Adjuntos
          </Text>

          <Text variant="caption" className="text-brand-secondary text-xs leading-normal">
            Puede incluir a su reclamo ó queja un documento de hasta 20 MB. Formatos admitidos: JPG,
            PNG Y PDF
          </Text>
        </div>

        <Field className="flex flex-col items-start justify-start">
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,image/jpeg,image/png"
            className="hidden"
            onChange={(e) =>
              setValue('file_attached', e.target.files?.[0] ?? null, { shouldValidate: true })
            }
          />
          <Button
            type="button"
            variant="outline"
            className="border-brand-primary text-brand-primary bg-brand-white hover:bg-brand-100 h-11 w-full max-w-[200px] cursor-pointer rounded-md border text-sm font-light transition-colors"
            onClick={() => inputRef.current?.click()}
          >
            Elegir archivos
          </Button>

          {fileValue && (
            <Text variant="caption" className="text-brand-secondary mt-1.5 text-xs">
              Archivo seleccionado:{' '}
              <span className="text-brand-primary font-semibold">{fileValue.name}</span>
            </Text>
          )}
          <FieldError errors={[{ message: errors.file_attached?.message }]} />
        </Field>
      </div>

      <div className="flex justify-center pt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-[48px] w-full max-w-[280px] rounded-lg bg-[#435764] text-sm font-medium tracking-wider text-white transition-colors hover:bg-[#34444f]"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </div>
    </form>
  );
}
