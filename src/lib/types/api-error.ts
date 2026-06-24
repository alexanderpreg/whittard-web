export type ValidationErrors = Record<string, string[]>;

export interface ApiError {
  message: string;
  status: number;
  errors?: ValidationErrors | null;
}
