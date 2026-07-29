export interface ChatbotAction {
  type: 'whatsapp' | 'url';
  url: string;
  label: string;
}

export interface ChatbotOption {
  id: string;
  label: string;
  nextStepId: string | null;
}

export interface ChatbotStep {
  id: string;
  question: string;
  options?: ChatbotOption[];
  action?: ChatbotAction;
}

export interface ChatbotMessage {
  id: string;
  sender: 'bot' | 'user';
  text?: string;
  options?: ChatbotOption[];
  action?: ChatbotAction;
}

export type ChatbotFlow = Record<string, ChatbotStep>;
