import { BREAKPOINTS } from './breakpoints';

export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  //   tablet: `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`,
  desktop: `(min-width: ${BREAKPOINTS.lg}px)`,
} as const;
