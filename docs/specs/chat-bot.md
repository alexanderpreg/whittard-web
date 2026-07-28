# 🤖 Especificaciones de Implementación: Widget Chatbot Whittard Perú

Documentación técnica para la integración del widget flotante de atención/chatbot utilizando React, Tailwind CSS (con paleta en `globals.css`), shadcn/ui y el componente interno `MessageScroller`.

---

## 🎨 1. Estilos y Clases de Tailwind (desde `globals.css`)

El componente consume directamente la paleta corporativa definida en tu `globals.css`:

- **`bg-whittard-primary`**: Encabezado superior y botón disparador principal (`#2D434E`).
- **`bg-whittard-secondary`**: Botones de opción iniciales y burbujas del usuario (`#3B525A`).
- **`bg-whittard-accent`**: Botón de acción destacado "Aquí" (`#1A5D3B`).
- **`bg-whittard-bot`**: Fondo de la respuesta del bot (`#E8ECEF`).

---

## 🧩 2. Integración de Componentes

### Dependencias de UI

- **`Popover`**: Ventana desplegable del chat flotante.
- **`Button`**: Acciones y disparadores.
- **`MessageScroller`**: Sistema de scroll fluido, soporte de anclas y botón de retorno.

---

## 💻 3. Código Fuente del Componente (`WhittardChatbot.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from "@/components/ui/message-scroller";

interface Message {
  id: string;
  sender: "bot" | "user";
  text?: string;
  options?: Array<{ id: string; label: string; value: string }>;
  actionLink?: string;
}

export function WhittardChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: "¡Bienvenido a Whittard Perú!\n¿Cómo podemos ayudarte?",
      options: [
        { id: "opt1", label: "Hablar con un asesor de ventas", value: "sales" },
        { id: "opt2", label: "Solicitar ayuda con mi pedido", value: "order" },
      ],
    },
  ]);

  const handleOptionSelect = (option: { label: string; value: string }) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: option.label,
    };

    const botResponse: Message = {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: "¡Comunícate en el siguiente enlace!",
      actionLink:
        option.value === "sales"
          ? "[https://wa.me/51999999999?text=Hola,%20deseo%20hablar%20con%20un%20asesor](https://wa.me/51999999999?text=Hola,%20deseo%20hablar%20con%20un%20asesor)"
          : "[https://wa.me/51999999999?text=Hola,%20necesito%20ayuda%20con%20mi%20pedido](https://wa.me/51999999999?text=Hola,%20necesito%20ayuda%20con%20mi%20pedido)",
    };

    setMessages((prev) => [...prev, userMsg, botResponse]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover onOpenChange="{setIsOpen}" open="{isOpen}">
        <PopoverTrigger asChild>
          <Button className="h-14 w-14 rounded-2xl bg-whittard-primary hover:bg-whittard-primary/90 text-white shadow-xl transition-all duration-300" size="icon">
            <MessageSquare className="h-7 w-7"/>
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-[340px] sm:w-[380px] p-0 rounded-2xl shadow-2xl border-none overflow-hidden bg-white" side="top">
          {/* Header Superior */}
          <div className="bg-whittard-primary text-white p-4 flex items-center justify-between">
            <span className="font-semibold text-xs tracking-widest text-slate-200 uppercase">
              CHATBOT
            </span>
            <Button onClick="{()" size="icon" variant="ghost"> setIsOpen(false)}
              className="h-7 w-7 text-white hover:bg-white/10 rounded-md"
            >
              <X className="h-5 w-5"/>
            </Button>
          </div>

          {/* Cuerpo Interno */}
          <div className="p-3 bg-gray-100">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Branding Whittard */}
              <div className="p-3 border-b border-gray-200 flex items-center gap-3 bg-white">
                <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center font-serif text-xs font-bold text-slate-800">
                  W
                </div>
                <span className="font-serif text-slate-800 font-medium text-sm">
                  Whittard of Perú
                </span>
              </div>

              {/* MessageScroller */}
              <MessageScrollerProvider>
                <MessageScroller className="h-[340px] p-4">
                  <MessageScrollerViewport>
                    <MessageScrollerContent className="gap-4">
                      {messages.map((msg, index) => {
                        const isLast = index === messages.length - 1;
                        return (
                          <MessageScrollerItem key="{msg.id}" scrollAnchor="{isLast}">
                            {/* Mensaje del Bot */}
                            {msg.sender === "bot" && (
                              <div className="flex items-start gap-2 max-w-[88%]">
                                <div className="w-6 h-6 rounded-full border border-slate-300 flex-shrink-0 flex items-center justify-center font-serif text-[10px] font-bold text-slate-800 mt-1">
                                  W
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                  {msg.text && (
                                    <div className="bg-whittard-bot text-slate-800 text-xs p-3 rounded-xl rounded-tl-none whitespace-pre-line leading-relaxed shadow-sm">
                                      <p className="font-medium text-[11px] text-slate-500 mb-1">
                                        Whittard of Perú
                                      </p>
                                      {msg.text}
                                    </div>
                                  )}

                                  {msg.options && (
                                    <div className="flex flex-col gap-2 mt-1">
                                      {msg.options.map((opt) => (
                                        <Button key="{opt.id}" onClick="{()"> handleOptionSelect(opt)}
                                          className="bg-whittard-secondary hover:bg-whittard-primary text-white text-xs py-2 px-3 h-auto rounded-lg font-normal transition-colors text-center whitespace-normal"
                                        >
                                          {opt.label}
                                        </Button>
                                      ))}
                                    </div>
                                  )}

                                  {msg.actionLink && (
                                    <a
                                      href={msg.actionLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-full"
                                    >
                                      <Button className="w-full bg-whittard-accent hover:bg-whittard-accent/90 text-white text-xs font-semibold py-2 rounded-lg transition-colors">
                                        Aquí
                                      </Button>
                                    </a>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Mensaje del Usuario */}
                            {msg.sender === "user" && (
                              <div className="flex justify-end items-center gap-2 max-w-[88%] self-end ml-auto">
                                <div className="bg-whittard-secondary text-white text-xs p-3 rounded-xl rounded-tr-none shadow-sm">
                                  {msg.text}
                                </div>
                                <div className="w-6 h-6 rounded-full border border-slate-300 flex-shrink-0 flex items-center justify-center font-serif text-[10px] font-bold text-slate-800">
                                  W
                                </div>
                              </div>
                            )}
                          </MessageScrollerItem>
                        );
                      })}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>

                  {/* Botón flotante para bajar rápido */}
                  <MessageScrollerButton direction="end" variant="secondary"/>
                </MessageScroller>
              </MessageScrollerProvider>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
```

"use client"

import \* as React from "react"
import {
MessageScroller as MessageScrollerPrimitive,
useMessageScroller,
useMessageScrollerScrollable,
useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller"
import { ArrowDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function MessageScrollerProvider(
props: React.ComponentProps<typeof MessageScrollerPrimitive.Provider>
) {
return <MessageScrollerPrimitive.Provider {...props} />
}

function MessageScroller({
className,
...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Root>) {
return (
<MessageScrollerPrimitive.Root
data-slot="message-scroller"
className={cn(
"group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
className
)}
{...props}
/>
)
}

function MessageScrollerViewport({
className,
...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Viewport>) {
return (
<MessageScrollerPrimitive.Viewport
data-slot="message-scroller-viewport"
className={cn(
"size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent",
className
)}
{...props}
/>
)
}

function MessageScrollerContent({
className,
...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Content>) {
return (
<MessageScrollerPrimitive.Content
data-slot="message-scroller-content"
className={cn("flex h-max min-h-full flex-col gap-6", className)}
{...props}
/>
)
}

function MessageScrollerItem({
className,
scrollAnchor = false,
...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Item>) {
return (
<MessageScrollerPrimitive.Item
data-slot="message-scroller-item"
scrollAnchor={scrollAnchor}
className={cn(
"min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]",
className
)}
{...props}
/>
)
}

function MessageScrollerButton({
direction = "end",
className,
children,
render,
variant = "secondary",
size = "icon-sm",
...props
}: React.ComponentProps<typeof MessageScrollerPrimitive.Button> &
Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
return (
<MessageScrollerPrimitive.Button
data-slot="message-scroller-button"
data-direction={direction}
data-variant={variant}
data-size={size}
direction={direction}
className={cn(
"absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
className
)}
render={render ?? <Button variant={variant} size={size} />}
{...props} >
{children ?? (
<>
<ArrowDownIcon />
<span className="sr-only">
{direction === "end" ? "Scroll to end" : "Scroll to start"}
</span>
</>
)}
</MessageScrollerPrimitive.Button>
)
}

export {
MessageScrollerProvider,
MessageScroller,
MessageScrollerViewport,
MessageScrollerContent,
MessageScrollerItem,
MessageScrollerButton,
useMessageScroller,
useMessageScrollerScrollable,
useMessageScrollerVisibility,
}
