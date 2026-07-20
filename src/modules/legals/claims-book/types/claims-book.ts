export interface ClaimsBookDefinition {
  label: string;
  value: string;
}

export interface ClaimsBookContent {
  subtitle?: string;
  paragraph?: string;
  info_definitions?: ClaimsBookDefinition[];
}

export type ClaimsFormErrors = {
  file_attached?: { message?: string };
};
