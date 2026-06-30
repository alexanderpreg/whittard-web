'use client';

import * as React from 'react';

import type { CarouselContextProps } from './types';

export const CarouselContext = React.createContext<CarouselContextProps | null>(null);
