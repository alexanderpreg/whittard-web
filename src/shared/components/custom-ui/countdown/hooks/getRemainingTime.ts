import { TimeLeft } from '@/shared/components/custom-ui/countdown/types';

export function getRemainingTime(targetDate: Date | string | number): TimeLeft {
  const target = new Date(targetDate);

  if (Number.isNaN(target.getTime())) {
    throw new Error('Invalid target date.');
  }

  const difference = target.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}
