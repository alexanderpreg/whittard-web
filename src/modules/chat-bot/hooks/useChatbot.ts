'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { chatbotFlow } from '../data';
import type { ChatbotMessage, ChatbotOption } from '../types';

function buildInitialMessages(): ChatbotMessage[] {
  const step = chatbotFlow.welcome;
  return [
    {
      id: 'bot-1',
      sender: 'bot',
      text: step.question,
      options: step.options,
    },
  ];
}

const BOT_FALLBACK_TEXT = '¡Comunícate en el siguiente enlace!';
const TYPING_DELAY = 600;

export function useChatbot() {
  const idCounter = useRef(1);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Guardamos si el componente sigue montado para evitar memory leaks
  const isMountedRef = useRef(true);

  const [messages, setMessages] = useState<ChatbotMessage[]>(buildInitialMessages);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  const selectOption = useCallback(
    (option: ChatbotOption) => {
      // 💡 PREVENCIÓN: Evitamos clics dobles mientras el bot "escribe"
      if (isTyping) return;

      // Limpiamos cualquier timer anterior por seguridad
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

      idCounter.current += 1;
      const userMsg: ChatbotMessage = {
        id: `user-${idCounter.current}`,
        sender: 'user',
        text: option.label,
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      const nextStep = option.nextStepId ? chatbotFlow[option.nextStepId] : null;

      idCounter.current += 1;
      const botMsg: ChatbotMessage = {
        id: `bot-${idCounter.current}`,
        sender: 'bot',
        text: nextStep?.question ?? BOT_FALLBACK_TEXT,
        options: nextStep?.options,
        action: nextStep?.action ?? undefined,
      };

      typingTimerRef.current = setTimeout(() => {
        // 💡 VERIFICACIÓN: Solo actualizamos estado si el componente sigue montado
        if (isMountedRef.current) {
          setIsTyping(false);
          setMessages((prev) => [...prev, botMsg]);
        }
      }, TYPING_DELAY);
    },
    [isTyping], // Se agrega isTyping a las dependencias de useCallback
  );

  const reset = useCallback(() => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    idCounter.current = 1;
    setIsTyping(false);
    setMessages(buildInitialMessages());
  }, []);

  return { messages, isTyping, selectOption, reset };
}
