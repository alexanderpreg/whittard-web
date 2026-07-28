import type { ChatbotFlow } from './types';

export const chatbotFlow: ChatbotFlow = {
  // 1. BIENVENIDA (Menú Principal)
  welcome: {
    id: 'welcome',
    question: '¡Hola! ☕🫖 Te damos la bienvenida a Whittard Perú.\n¿En qué podemos ayudarte hoy?',
    options: [
      {
        id: 'opt-products',
        label: '🛍️ Recomendación de productos y regalos',
        nextStepId: 'products-menu',
      },
      { id: 'opt-shipping', label: '🚚 Envíos, tiempos y costos', nextStepId: 'shipping-info' },
      { id: 'opt-order', label: '📦 Tengo una duda con mi pedido', nextStepId: 'order-menu' },
      { id: 'opt-stores', label: '📍 Tiendas físicas y horarios', nextStepId: 'stores-info' },
    ],
  },

  // 2. RECOMENDACIÓN DE PRODUCTOS
  'products-menu': {
    id: 'products-menu',
    question: '¡Perfecto! Cuéntanos, ¿qué estás buscando hoy?',
    options: [
      { id: 'opt-gifts', label: '🎁 Packs y Regalos Especiales', nextStepId: 'gifts-info' },
      { id: 'opt-tea', label: '🫖 Tés en hebras e infusiones', nextStepId: 'tea-info' },
      { id: 'opt-coffee', label: '☕ Café de Especialidad', nextStepId: 'coffee-info' },
      {
        id: 'opt-sales-advisor',
        label: '💬 Hablar con un asesor de ventas',
        nextStepId: 'sales-whatsapp',
      },
      { id: 'opt-back', label: '↩️ Volver al menú principal', nextStepId: 'welcome' },
    ],
  },

  'gifts-info': {
    id: 'gifts-info',
    question:
      ' Descubre nuestras cajas de regalo, vajillas fine bone china y sets de degustación exclusivos.',
    action: {
      type: 'url',
      url: '/colecciones/regalos', // O enlace a la sección de la web
      label: 'Ver Colección de Regalos 🎁',
    },
    options: [
      { id: 'opt-back-prod', label: '↩️ Probar otra categoría', nextStepId: 'products-menu' },
    ],
  },

  'tea-info': {
    id: 'tea-info',
    question:
      'Desde nuestro emblemático **English Breakfast** hasta infusiones frutales y herbales sin cafeína.\n\n¿Quieres ayuda para elegir según tus gustos?',
    action: {
      type: 'url',
      url: '/tes-e-infusiones',
      label: 'Explorar Catálogo de Tés 🫖',
    },
    options: [
      {
        id: 'opt-tea-ws',
        label: '💬 Pedir recomendación por WhatsApp',
        nextStepId: 'sales-tea-ws',
      },
      { id: 'opt-back-prod', label: '↩️ Volver a productos', nextStepId: 'products-menu' },
    ],
  },

  'coffee-info': {
    id: 'coffee-info',
    question:
      'Ofrecemos granos de origen único (Etiopía, Colombia, Perú) y tostados artesanales ideales para prensa francesa, espresso o filtro.',
    action: {
      type: 'url',
      url: '/cafes',
      label: 'Ver Cafés de Especialidad ☕',
    },
    options: [{ id: 'opt-back-prod', label: '↩️ Volver a productos', nextStepId: 'products-menu' }],
  },

  // 3. ENVÍOS Y ENTREGAS (Respuesta inmediata sin ir a WhatsApp)
  'shipping-info': {
    id: 'shipping-info',
    question:
      '🚚 **Información de Envíos en Perú:**\n\n• **Lima Metropolitana:** Entrega en 24 a 48 horas hábiles.\n• **Provincias:** Entrega en 3 a 5 días hábiles vía Olva Courier / Shalom.\n• **Envío Gratis:** Por compras mayores a S/ 200.',
    options: [
      { id: 'opt-payment', label: '💳 Métodos de Pago aceptados', nextStepId: 'payment-info' },
      { id: 'opt-back', label: '↩️ Volver al menú principal', nextStepId: 'welcome' },
    ],
  },

  'payment-info': {
    id: 'payment-info',
    question:
      '💳 **Métodos de Pago:**\n\nAceptamos todas las tarjetas de crédito/débito (Visa, Mastercard, Amex), **Yape**, **Plin** y transferencia bancaria directa en el checkout.',
    options: [{ id: 'opt-back', label: '↩️ Volver al menú principal', nextStepId: 'welcome' }],
  },

  // 4. ATENCIÓN DE PEDIDOS
  'order-menu': {
    id: 'order-menu',
    question: 'Para consultas de pedidos realizados, selecciona la opción correspondiente:',
    options: [
      { id: 'opt-status', label: '🔍 Rastrear mi pedido enviado', nextStepId: 'order-status' },
      { id: 'opt-issue', label: '⚠️ Tuve un problema con mi entrega', nextStepId: 'order-issue' },
      { id: 'opt-returns', label: '🔄 Cambios y Devoluciones', nextStepId: 'order-returns' },
      { id: 'opt-back', label: '↩️ Volver al menú principal', nextStepId: 'welcome' },
    ],
  },

  'order-status': {
    id: 'order-status',
    question:
      'Ten a la mano tu **Número de Orden** (ej: #W-1042) y el DNI del comprador para que nuestro equipo lo verifique.',
    action: {
      type: 'whatsapp',
      url: 'https://wa.me/51999999999?text=Hola,%20quisiera%20saber%20el%20estado%20de%20mi%20pedido.%20Mi%20número%20de%20orden%20es:%20',
      label: 'Consultar estado por WhatsApp',
    },
    options: [{ id: 'opt-back', label: '↩️ Volver al menú', nextStepId: 'welcome' }],
  },

  'order-issue': {
    id: 'order-issue',
    question:
      'Lamentamos el inconveniente. Por favor escríbenos con tu número de pedido y fotos si el empaque llegó dañado.',
    action: {
      type: 'whatsapp',
      url: 'https://wa.me/51999999999?text=Hola,%20tuve%20un%20inconveniente%20con%20mi%20pedido.%20Mi%20número%20de%20orden%20es:%20',
      label: 'Reportar problema a Soporte',
    },
  },

  'order-returns': {
    id: 'order-returns',
    question:
      ' Puedes realizar cambios de productos cerrados dentro de los 7 días posteriores a tu compra presentando tu boleta o factura.',
    options: [{ id: 'opt-back', label: '↩️ Volver al menú principal', nextStepId: 'welcome' }],
  },

  // 5. TIENDAS FÍSICAS (Respuesta Inmediata)
  'stores-info': {
    id: 'stores-info',
    question:
      '📍 **Nuestras Boutiques Whittard en Lima:**\n\n• **Jockey Plaza**: Nivel 1, Hall Principal.\n• **Larcomar**: Plaza Principal.\n\n⏰ **Horario de atención:**\nLunes a Domingo de 10:00 am a 10:00 pm.',
    options: [{ id: 'opt-back', label: '↩️ Volver al menú principal', nextStepId: 'welcome' }],
  },

  // ACCIONES DE WHATSAPP DIRECTO DESDE SUB-BOTONES
  'sales-whatsapp': {
    id: 'sales-whatsapp',
    question: 'Te derivamos con un sommelier/asesor de Whittard en tiempo real.',
    action: {
      type: 'whatsapp',
      url: 'https://wa.me/51999999999?text=Hola,%20quisiera%20asesoría%20personalizada%20de%20compras',
      label: 'Iniciar Chat de Ventas 📲',
    },
  },

  'sales-tea-ws': {
    id: 'sales-tea-ws',
    question: 'Te conectamos con nuestro especialista en tés e infusiones.',
    action: {
      type: 'whatsapp',
      url: 'https://wa.me/51999999999?text=Hola,%20busco%20asesoría%20para%20elegir%20un%20Té%20o%20Infusión',
      label: 'Asesoría de Tés en WhatsApp 🫖',
    },
  },
};
