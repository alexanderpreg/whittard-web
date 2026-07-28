'use client';

import { RotateCcw, X } from 'lucide-react';

import { UserAvatar } from '@/shared/components/custom-ui/UserAvatar';
import { Button } from '@/shared/components/shadcn-ui/button';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/shared/components/shadcn-ui/message-scroller';

import { ChatbotMessage, ChatbotOption } from '../types';

interface ChatbotWindowProps {
  messages: ChatbotMessage[];
  isTyping: boolean;
  selectOption: (option: ChatbotOption) => void;
  reset: () => void;
  onClose: () => void;
}
function FormattedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}

function TypingIndicator() {
  return (
    <div className="flex max-w-[88%] items-start gap-2">
      <UserAvatar
        name="Whittard"
        image="/icon-whittard.png"
        size="sm"
        className="border-0 after:border-0"
      />
      <div className="bg-brand-100 rounded-2xl rounded-tl-none p-3 shadow-sm">
        <div className="flex items-center gap-1 py-1">
          <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
          <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
          <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

export function ChatbotWindow({
  messages,
  isTyping,
  selectOption,
  reset,
  onClose,
}: ChatbotWindowProps) {
  return (
    <div className="w-85 overflow-hidden rounded-2xl bg-white shadow-2xl sm:w-95">
      {/* Header */}
      <div className="bg-brand-primary flex items-center justify-between p-3.5 text-white shadow-sm">
        <div className="flex items-center gap-2.5">
          <UserAvatar
            name="Whittard"
            image="/icon-whittard.png"
            size="sm"
            className="border-0 bg-white text-white after:border-0"
            fallbackClassName="text-white text-[10px]"
          />
          <span className="text-sm font-medium tracking-wide text-white">Whittard de Perú</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            onClick={reset}
            size="icon"
            variant="ghost"
            disabled={isTyping}
            className="h-7 w-7 rounded-md text-white transition-colors hover:bg-transparent hover:text-white disabled:opacity-50"
            aria-label="Reiniciar conversación"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            onClick={onClose}
            size="icon"
            variant="ghost"
            className="h-7 w-7 rounded-md text-white transition-colors hover:bg-transparent hover:text-white"
            aria-label="Cerrar chat"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat Body */}
      <div className="bg-slate-50/50">
        <MessageScrollerProvider>
          <MessageScroller className="h-90">
            {/* 💡 overscroll-contain evita que el scroll se escape a la página web */}
            <MessageScrollerViewport className="overscroll-contain">
              <MessageScrollerContent className="gap-3.5 p-4">
                {messages.map((msg, index) => {
                  const isLastMessage = index === messages.length - 1;
                  const isUserTurn = msg.sender === 'user';

                  return (
                    <MessageScrollerItem key={msg.id} scrollAnchor={isUserTurn}>
                      {msg.sender === 'bot' && (
                        <div className="flex max-w-[90%] items-start gap-2">
                          <UserAvatar
                            name="Whittard"
                            image="/icon-whittard.png"
                            size="sm"
                            className="border-0 after:border-0"
                          />
                          <div className="flex w-full flex-col gap-2">
                            {msg.text && (
                              <div className="bg-brand-100 rounded-2xl rounded-tl-none p-3 text-xs leading-relaxed whitespace-pre-line text-slate-800 shadow-sm">
                                <FormattedText text={msg.text} />
                              </div>
                            )}

                            {msg.options && (
                              <div className="mt-1 flex flex-col gap-1.5">
                                {msg.options.map((opt) => (
                                  <Button
                                    key={opt.id}
                                    onClick={() => selectOption(opt)}
                                    disabled={!isLastMessage || isTyping}
                                    className="bg-brand-primary hover:bg-brand-primary/90 h-auto rounded-xl px-3 py-2 text-left text-xs font-normal whitespace-normal text-white shadow-xs transition-all disabled:pointer-events-none disabled:opacity-50"
                                  >
                                    {opt.label}
                                  </Button>
                                ))}
                              </div>
                            )}

                            {msg.action && (
                              <a
                                href={msg.action.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 w-full"
                              >
                                <Button className="bg-brand-quaternary hover:bg-brand-quaternary/90 w-full rounded-xl py-2 text-xs font-semibold text-white shadow-sm transition-colors">
                                  {msg.action.label}
                                </Button>
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {msg.sender === 'user' && (
                        <div className="ml-auto flex max-w-[85%] items-center justify-end gap-2 self-end">
                          <div className="bg-brand-primary rounded-2xl rounded-tr-none p-3 text-xs text-white shadow-sm">
                            {msg.text}
                          </div>
                        </div>
                      )}
                    </MessageScrollerItem>
                  );
                })}

                {isTyping && (
                  <MessageScrollerItem>
                    <TypingIndicator />
                  </MessageScrollerItem>
                )}
              </MessageScrollerContent>
            </MessageScrollerViewport>

            <MessageScrollerButton direction="end" variant="secondary" />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
    </div>
  );
}
