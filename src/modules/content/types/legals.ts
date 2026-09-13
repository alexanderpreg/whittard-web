import { BaseSection } from './common';

export interface ComplaintsBookSection extends BaseSection {
  title?: string;
  paragraph?: string;
  observations?: string;
}

export interface LegalContentSection extends BaseSection {
  title?: string;
  subtitle?: string;
  body?: string;
}

export interface LegalPageContent {
  'privacy-policy'?: LegalContentSection;
  'terms-and-conditions'?: LegalContentSection;
  'cookie-policy'?: LegalContentSection;
  'complaints-book'?: ComplaintsBookSection;
  faq?: BaseSection & {
    title?: string;
    subtitle?: string;
    items?: Array<{ question: string; answer: string }>;
  };
}
