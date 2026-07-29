import { z } from 'zod';

export const checkoutSchema = z
  .object({
    deliveryMethod: z.enum(['delivery', 'pickup']),
    customer: z.object({
      firstName: z.string().min(2, 'Mínimo 2 caracteres'),
      lastName: z.string().min(2, 'Mínimo 2 caracteres'),
      email: z.string().min(1, 'El email es obligatorio').pipe(z.email('Email inválido')),
      phone: z
        .string()
        .min(1, 'El celular es obligatorio')
        .regex(/^[0-9]{9}$/, 'Debe tener 9 dígitos'),
      documentType: z.enum(['dni', 'ce', 'ruc']),
      documentNumber: z.string().min(1, 'El documento es obligatorio'),
      company: z.string().optional().default(''),
    }),
    address: z.object({
      department: z.string(),
      province: z.string(),
      district: z.string(),
      address: z.string(),
      reference: z.string().optional().default(''),
    }),
    payment: z.object({
      method: z.enum(['card', 'transfer']),
    }),
    notes: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    const docNum = data.customer.documentNumber;
    const docType = data.customer.documentType;

    if (docType === 'dni' && !/^[0-9]{8}$/.test(docNum)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El DNI debe tener 8 dígitos',
        path: ['customer', 'documentNumber'],
      });
    }
    if (docType === 'ce' && !/^[0-9]{12}$/.test(docNum)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El CE debe tener 12 dígitos',
        path: ['customer', 'documentNumber'],
      });
    }
    if (docType === 'ruc' && !/^[0-9]{11}$/.test(docNum)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El RUC debe tener 11 dígitos',
        path: ['customer', 'documentNumber'],
      });
    }

    if (data.deliveryMethod === 'delivery') {
      if (!data.address.department) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Selecciona un departamento',
          path: ['address', 'department'],
        });
      }
      if (!data.address.province) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Selecciona una provincia',
          path: ['address', 'province'],
        });
      }
      if (!data.address.district) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Selecciona un distrito',
          path: ['address', 'district'],
        });
      }
      if (!data.address.address) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Ingresa una dirección',
          path: ['address', 'address'],
        });
      }
    }
  });

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;
