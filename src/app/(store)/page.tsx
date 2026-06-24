import { formatCurrency, formatDate, formatDateTime, formatTime } from '@/lib/utils';
import { Container } from '@/shared/components/custom-ui/Container';

export default function Page() {
  const createdAt = '2026-06-23T15:30:00';

  return (
    <Container as="main" className="flex flex-1 flex-col gap-4 p-10">
      <h1 className="text-2xl font-bold">Date Utils Demo</h1>

      <div>
        <strong>Fecha:</strong> {formatDate(createdAt)}
      </div>

      <div>
        <strong>Fecha y Hora:</strong> {formatDateTime(createdAt)}
      </div>

      <div>
        <strong>Hora:</strong> {formatTime(createdAt)}
      </div>
      <div>
        <strong>precio:</strong> {formatCurrency(1234.56)}
      </div>
    </Container>
  );
}
