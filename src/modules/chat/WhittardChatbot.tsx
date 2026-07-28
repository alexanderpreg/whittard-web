'use client';

import { MessageSquareText, X } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { ChatbotWindow } from './components/ChatbotWindow';
import { useChatbot } from './hooks/useChatbot';

export function WhittardChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotState = useChatbot();

  return (
    <>
      {/* 1. Ventana del Chat (Posicionada arriba del botón, z-index alto) */}
      {/* <div className="z-drawer fixed right-6 bottom-24">
        <ChatbotWindow isOpen={isOpen} onClose={() => setIsOpen(false)} {...chatbotState} />
      </div> */}

      <div
        className={cn(
          'z-drawer fixed right-6 bottom-24',
          'origin-bottom-right transition-all duration-200 ease-out',
          isOpen
            ? 'pointer-events-auto visible scale-100 opacity-100'
            : 'pointer-events-none invisible scale-95 opacity-0',
        )}
      >
        <ChatbotWindow onClose={() => setIsOpen(false)} {...chatbotState} />
      </div>

      {/* 2. Backdrop transparente (Solo existe si está abierto, z-index medio) */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
          className="z-overlay fixed inset-0 bg-transparent"
        />
      )}

      {/* 3. Botón Flotante (Siempre visible en la esquina, z-index alto) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Cerrar chat de atención' : 'Abrir chat de atención'}
        className="bg-brand-primary hover:bg-brand-primary/90 focus-visible:ring-ring z-drawer fixed right-6 bottom-6 inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-[50%_15%_50%_50%]! text-white shadow-xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquareText className="text-brand-primary h-7 w-7 fill-white" />
        )}
      </button>
    </>
  );
}
