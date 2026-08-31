import { buildSeoMetadata } from '@/lib/seo';
import { FaqsView } from '@/modules/legals/faq/FaqView';

export const metadata = buildSeoMetadata({
  defaults: {
    title: 'Preguntas Frecuentes',
    description:
      'Resolvemos tus dudas sobre compras, métodos de pago, envíos a provincia y conservación de productos Whittard.',
  },
});

const MOCK_FAQ_DATA = {
  content: {
    title: 'Preguntas Frecuentes',
    description:
      '¿Tienes una pregunta? Mira nuestras preguntas más frecuentes en la parte inferior. No dudes contactarnos si estás buscando algo en específico. Estamos para resolverlo.',
    questions: [
      {
        question: '¿Dónde puedo comprar?',
        answer:
          '<p>En nuestra tienda online y en el módulo Whittard Perú del C.C. Jockey Plaza, Pasillo de Lujo.</p>',
      },
      {
        question: '¿Qué métodos de pago se aceptan?',
        answer:
          '<p>Aceptamos pagos en línea con tarjetas de crédito y débito (Visa, Mastercard, American Express, Diners Club), así como transferencias bancarias, Yape y Plin.</p>',
      },
      {
        question: '¿Hacen envíos a provincias?',
        answer:
          '<p>Sí, realizamos envíos a nivel nacional. El tiempo de entrega y el costo de envío varían según la provincia y la accesibilidad de la zona de cobertura.</p>',
      },
      {
        question: '¿Cómo puedo dar seguimiento a la entrega de mi pedido?',
        answer:
          '<p>Una vez validado tu pago y procesado el pedido, te enviaremos una notificación por correo electrónico con los detalles del despacho o podrás coordinar el estado mediante nuestros canales oficiales de atención.</p>',
      },
      {
        question: '¿Qué debo hacer si mi pago no funciona?',
        answer:
          '<p>Asegúrate de que tu tarjeta esté habilitada para compras por internet y cuente con fondos suficientes. Si el problema persiste, te recomendamos comunicarte con tu banco emisor o intentar pagar vía transferencia, Yape o Plin enviando el comprobante.</p>',
      },
      {
        question: '¿Cómo conservo los productos?',
        answer:
          '<p>Para mantener la máxima frescura y calidad de nuestros tés, cafés y chocolates, recomendamos conservarlos en un lugar fresco, seco, alejados de la luz directa del sol y en envases herméticos bien cerrados.</p>',
      },
    ],
  },
};

export default function Page() {
  return <FaqsView faqData={MOCK_FAQ_DATA} />;
}
