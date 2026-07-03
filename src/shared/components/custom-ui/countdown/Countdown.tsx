'use client';

import { useCountdown } from '@/shared/components/custom-ui/countdown/hooks/useCountdown';

import { useMounted } from '@/lib/hooks/useMounted';
import { CountdownItem } from './CountdownItem';
import { CountdownSkeleton } from './CountdownSkeleton';

interface CountdownProps {
  endDate: Date;
}

export function Countdown({ endDate }: CountdownProps) {
  const mounted = useMounted();
  const { days, hours, minutes, seconds, isExpired } = useCountdown(endDate);

  if (isExpired) {
    return null;
  }

  if (!mounted) {
    return <CountdownSkeleton />;
  }

  return (
    <div className="flex items-center">
      {days > 0 && <CountdownItem value={days.toString().padStart(2, '0')} label="Días" />}

      <CountdownItem value={hours.toString().padStart(2, '0')} label="Horas" />

      <CountdownItem value={minutes.toString().padStart(2, '0')} label="Minutos" />

      <CountdownItem value={seconds.toString().padStart(2, '0')} label="Segundos" />
    </div>
  );
}
