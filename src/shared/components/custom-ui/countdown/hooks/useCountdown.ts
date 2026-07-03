'use client';

import { TimeLeft } from '@/shared/components/custom-ui/countdown/types';
import { useEffect, useState } from 'react';
import { getRemainingTime } from './getRemainingTime';

export function useCountdown(targetDate: Date | string | number): TimeLeft {
  const [timeLeft, setTimeLeft] = useState(() => getRemainingTime(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = getRemainingTime(targetDate);

      setTimeLeft(remainingTime);

      if (remainingTime.isExpired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}
