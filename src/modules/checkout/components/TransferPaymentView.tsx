'use client';

import { Building2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { formatCurrency } from '@/lib/utils';
import { Button } from '@/shared/components/shadcn-ui/button';
import { Input } from '@/shared/components/shadcn-ui/input';
import { Label } from '@/shared/components/shadcn-ui/label';
import type { CheckoutSummaryData } from '../types/checkout';

interface TransferPaymentViewProps {
  summary: CheckoutSummaryData;
}

export function TransferPaymentView({ summary }: TransferPaymentViewProps) {
  const router = useRouter();
  const [operationCode, setOperationCode] = useState('');
  const [voucherFile, setVoucherFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = useCallback(() => {
    if (!operationCode.trim() || sending) return;
    setSending(true);
    setTimeout(() => router.push('/checkout/success'), 1500);
  }, [operationCode, sending, router]);

  return (
    <div className="space-y-8">
      <BankTransferInfo total={summary.total} />

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="operationCode">
            Código de operación <span className="text-red-400">*</span>
          </Label>
          <Input
            id="operationCode"
            value={operationCode}
            onChange={(e) => setOperationCode(e.target.value)}
            placeholder="Ingresa el código de tu transferencia"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="voucher">Comprobante de pago (opcional)</Label>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('voucherInput')?.click()}
              className="flex items-center gap-2 rounded-xs"
            >
              <Upload className="size-4" />
              {voucherFile ? 'Cambiar archivo' : 'Subir voucher'}
            </Button>
            <input
              id="voucherInput"
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => setVoucherFile(e.target.files?.[0] ?? null)}
            />
            {voucherFile && (
              <span className="text-brand-secondary truncate text-xs">{voucherFile.name}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="h-12 flex-1 rounded-xs"
        >
          Volver
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!operationCode.trim() || sending}
          className="bg-brand-primary hover:bg-brand-primary/90 h-12 flex-1 rounded-xs text-white"
        >
          {sending ? 'Enviando...' : 'Enviar comprobante'}
        </Button>
      </div>
    </div>
  );
}

function BankTransferInfo({ total }: { total: number }) {
  return (
    <div className="space-y-3">
      <div className="border-brand-200 bg-brand-100/30 rounded-lg border p-5">
        <Building2 className="text-brand-primary mb-2 size-10" />
        <p className="text-brand-primary mb-3 text-sm font-medium">Transferencia Bancaria</p>
        <div className="text-brand-secondary space-y-1.5 text-sm">
          <p>
            <span className="text-brand-primary font-medium">Banco:</span> Interbank
          </p>
          <p>
            <span className="text-brand-primary font-medium">Cuenta Corriente:</span> 000-123456789
          </p>
          <p>
            <span className="text-brand-primary font-medium">CCI:</span> 003-000-00123456789-00
          </p>
          <p>
            <span className="text-brand-primary font-medium">RUC:</span> 20123456789
          </p>
          <p className="text-brand-primary">
            <span className="font-medium">Titular:</span> Whittard Perú S.A.C.
          </p>
        </div>
      </div>
      <div className="rounded-md bg-amber-50 p-3 text-xs text-amber-700">
        El monto a transferir es <span className="font-semibold">{formatCurrency(total)}</span>.
        Ingresa el código de operación y envía tu comprobante para validar el pago.
      </div>
    </div>
  );
}
