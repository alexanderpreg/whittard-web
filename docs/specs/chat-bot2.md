# 🛠️ Especificaciones de Corrección: Hook `useChatbot`

Documento técnico que detalla la resolución de los problemas de renderizado de mensajes y sincronización de animaciones en el chatbot de Whittard Perú.

---

## 🔍 Diagnóstico de Errores

1. **Estado Indefinido en `botMsg`**: Cuando el objeto `option` carece de `nextStepId`, la búsqueda en `chatbotFlow` devuelve `undefined`. Al construir `botMsg.text` como `undefined`, el renderizador falla en pantalla.
2. **Renderizado Asíncrono ausente**: La mutación simultánea de los mensajes de usuario y bot en una sola llamada a `setMessages` impide que los componentes de virtualización/scroll (`MessageScroller`) y las animaciones de texto detecten el cambio incremental.

---

## ✅ Soluciones Aplicadas

1. **Valor por defecto (Fallback) en la propiedad `text`**: Se añade un encadenamiento opcional con operador nulo (`??`) para asegurar que todo mensaje emitido por el bot contenga texto interactivo o una confirmación de acción.
2. **Efecto de Tiempo Real (`setTimeout` + `isTyping`)**: Se dividió la inserción del mensaje en dos fases:
   - **Fase A (Inmediata)**: Renderiza la opción seleccionada por el usuario (`sender: 'user'`).
   - **Fase B (Retardada 400ms)**: Renderiza la respuesta del asistente (`sender: 'bot'`), permitiendo el cálculo correcto del `scrollAnchor`.

---

## 💻 Uso en el Componente Principal (`WhittardChatbot.tsx`)

Asegúrate de consumir la variable `isTyping` enviada por el hook si deseas mostrar un indicador de carga opcional:

```tsx
const { messages, isTyping, selectOption, reset } = useChatbot();

// Opcional: mostrar un indicador de tipeo si isTyping === true
```
