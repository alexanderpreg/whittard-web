import { createSocialIcon } from './createSocialIcon';

const iconNode = [
  [
    'path',
    {
      d: 'M36.653 4h6.96L28.36 21.337 46 44.615H32.258L21.527 30.448 9.337 44.615H2.373l17.65-20.259L3.096 4h17.017l10.767 14.292L36.653 4zm-2.65 36.496h3.857L14.864 7.912h-4.14l23.28 32.584z',
    },
  ] as const,
];

export const Twitter = createSocialIcon('twitter', iconNode);
