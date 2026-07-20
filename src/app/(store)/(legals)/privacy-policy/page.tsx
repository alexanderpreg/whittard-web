// src/app/(store)/(legals)/privacy-policy/page.tsx
import { PrivacyPolicyView } from '@/modules/legals/privacy-policy/PrivacyPolicyView';

const MOCK_HTML_CONTENT = `
  <p>En Whittard Perú valoramos y respetamos la privacidad de nuestros clientes y usuarios. Por ello, tratamos los datos personales que nos proporcionas de manera segura, confidencial y conforme a la legislación peruana vigente en materia de protección de datos personales. La presente Política de Privacidad se encuentra regulada por la Ley N.° 29733, Ley de Protección de Datos Personales, y su Reglamento aprobado por el Decreto Supremo N.° 016-2024-JUS, así como por las demás normas aplicables en la República del Perú.</p>

  <h2>1. Información que recopilamos</h2>
  <p>Al navegar en nuestra web, registrarte, realizar una compra, completar un formulario, solicitar atención al cliente o comunicarte con nosotros, podremos recopilar los siguientes datos personales:</p>
  <ul>
    <li>Nombres y apellidos.</li>
    <li>Documento de identidad.</li>
    <li>Correo electrónico.</li>
    <li>Número de teléfono.</li>
    <li>Dirección de entrega.</li>
    <li>Datos de facturación.</li>
    <li>Historial de compras.</li>
  </ul>
  <p>Información necesaria para procesar pedidos, cambios, devoluciones, reclamos o consultas. Datos derivados del uso de nuestra web, como información de navegación, cookies y preferencias de usuario.</p>

  <h2>2. Finalidades del tratamiento de datos personales</h2>
  <p>Los datos personales recopilados podrán ser utilizados para las siguientes finalidades:</p>
  <ul>
    <li>Procesar, confirmar y gestionar tus compras realizadas en nuestra web.</li>
    <li>Coordinar el despacho, entrega o recojo de tus pedidos.</li>
    <li>Emitir comprobantes de pago.</li>
    <li>Atender consultas, solicitudes, reclamos, cambios o devoluciones.</li>
    <li>Brindar soporte a través de nuestros canales de atención.</li>
    <li>Gestionar tu registro como usuario, en caso corresponda.</li>
    <li>Mejorar la experiencia de navegación, compra y atención en nuestra web.</li>
    <li>Enviar información relacionada con tus pedidos o transacciones.</li>
    <li>Enviar promociones, novedades, beneficios, campaigns comerciales o comunicaciones publicitarias, siempre que hayas brindado tu consentimiento previo.</li>
  </ul>

  <h2>3. Consentimiento del usuario</h2>
  <p>Al proporcionar tus datos personales a través de nuestra web, formularios, canales de atención o al realizar una compra, declaras haber sido informado sobre el tratamiento de tus datos personales y otorgas tu consentimiento para que sean utilizados conforme a las finalidades descritas en esta Política de Privacidad. En caso de comunicaciones comerciales, publicitarias o promocionales, estas serán enviadas únicamente cuando hayas autorizado expresamente recibirlas. Podrás retirar tu consentimiento en cualquier momento a través de los mecanismos indicados en cada comunicación o escribiéndonos a nuestro canal de atención.</p>

  <h2>4. Transferencia y encargo de datos personales</h2>
  <p>Whittard Perú no venderá, alquilará ni compartirá tus datos personales con terceros ajenos a la prestación del servicio. Sin embargo, podremos compartir tus datos personales con proveedores o aliados necesarios para cumplir con las finalidades descritas, tales como operadores logísticos, pasarelas de pago, proveedores tecnológicos, servicios de atención al cliente, plataformas de email marketing, entidades financieras o autoridades competentes cuando sea requerido conforme a ley. En todos los casos, procuraremos que dichos terceros traten la información de manera segura, confidencial y únicamente para las finalidades autorizadas.</p>

  <h2>5. Conservación de los datos personales</h2>
  <p>Tus datos personales serán conservados durante el tiempo necesario para cumplir con las finalidades descritas en esta Política de Privacidad, así como para atender obligaciones legales, contractuales, tributarias, contables, administrativas o comerciales aplicables. Una vez cumplidas dichas finalidades, los datos serán eliminados, bloqueados o anonimizados, según corresponda.</p>

  <h2>6. Derechos del titular de datos personales</h2>
  <p>Como titular de tus datos personales, puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición, conocidos como derechos ARCO, conforme a la normativa peruana vigente. Para ejercer estos derechos, puedes enviar una solicitud al correo: <strong>ventas.retail@onzafoods.com</strong></p>
  <p>Tu solicitud deberá incluir:</p>
  <ul>
    <li>Nombre completo.</li>
    <li>Documento de identidad.</li>
    <li>Correo electrónico o medio de contacto.</li>
    <li>Derecho que deseas ejercer.</li>
    <li>Descripción clara de tu solicitud.</li>
  </ul>
  <p>Whittard Perú atenderá tu solicitud dentro de los plazos establecidos por la normativa aplicable.</p>

  <h2>7. Seguridad de la información</h2>
  <p>Whittard Perú adopta medidas técnicas, legales, organizativas y de seguridad razonables para proteger tus datos personales frente a accesos no autorizados, pérdida, alteración, uso indebido, divulgación o tratamiento no autorizado. No obstante, el usuario reconoce que ningún sistema de transmisión o almacenamiento de información en internet es completamente infalible, por lo que se recomienda hacer un uso responsable de sus datos, claves de acceso y dispositivos.</p>

  <h2>8. Uso de cookies</h2>
  <p>Nuestra web podrá utilizar cookies y tecnologías similares para mejorar la experiencia de navegación, recordar preferencias, analizar el tráfico del sitio, optimizar nuestros servicios y ofrecer contenido relevante. El usuario puede configurar su navegador para aceptar, rechazar o eliminar cookies en cualquier momento. Sin embargo, la desactivación de cookies podría afectar el correcto funcionamiento de algunas secciones de la web.</p>

  <h2>9. Enlaces a terceros</h2>
  <p>Nuestra web podría contener enlaces a sitios web de terceros. Una vez que el usuario acceda a dichos enlaces y abandone nuestra web, Whittard Perú no tendrá control sobre el sitio externo ni será responsable por sus políticas de privacidad, términos, contenido o tratamiento de datos personales. Recomendamos revisar las políticas de privacidad de cada sitio web externo antes de proporcionar cualquier información personal.</p>

  <h2>10. Modificaciones de la Política de Privacidad</h2>
  <p>Whittard Perú se reserva el derecho de actualizar, modificar o complementar la presente Política de Privacidad cuando lo considere necesario o cuando existan cambios normativos, comerciales, operativos o tecnológicos. Cualquier modificación será publicada en esta sección de la web, por lo que recomendamos revisarla periódicamente.</p>
  
  <p><em>Última actualización: 23/06/2026.</em></p>
`;

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyView htmlContent={MOCK_HTML_CONTENT} />;
}
