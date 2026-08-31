import { buildSeoMetadata } from '@/lib/seo';
import { TermsView } from '@/modules/legals/terms/TermsView';
export const metadata = buildSeoMetadata({
  defaults: {
    title: 'Términos y Condiciones',
    description: 'Términos y condiciones de uso y compra en www.whittardperu.com.',
  },
});

const MOCK_TERMS_CONTENT = `
  <p>Presentamos los términos y condiciones a través de los cuales podrás tener acceso y uso de la página www.whittardperu.com en el Perú. Al acceder y hacer uso de nuestros servicios, aceptas que has leído, entiendes y estás de acuerdo con las condiciones descritas en esta sección de Términos y Condiciones, así como con la legislación aplicable en la República del Perú.</p>
  <p>Los Términos y Condiciones contenidos en esta sección se aplicarán y se entenderán incorporados a todos los actos, contratos, compras y transacciones que se ejecuten o celebren mediante los sistemas de oferta y comercialización comprendidos en este sitio web entre los usuarios y Whittard Perú, que en adelante podrá denominarse indistintamente como “Whittard Perú”, “la empresa”, “la empresa oferente”, “el proveedor” o “la empresa proveedora”, según corresponda al sentido del texto.</p>
  <p>Se entenderán conocidos y aceptados los presentes Términos y Condiciones por el solo hecho de realizar una compra de productos a través de este sitio web.</p>
  <p>Whittard Perú se reserva el derecho de actualizar y/o modificar los Términos y Condiciones detallados a continuación en cualquier momento. Por esta razón, recomendamos revisar esta sección cada vez que utilices el sitio web o realices una transacción a través de la página web, WhatsApp, teléfono u otros canales oficiales destinados para tal efecto. Por favor, lee cuidadosamente estos términos de uso.</p>

  <h2>Registro del usuario o cliente</h2>
  <p>Para la adquisición de productos ofrecidos en este sitio web, podrá ser necesario que el usuario acepte las presentes condiciones y se registre con un correo electrónico vigente, genere una clave de acceso o ingrese mediante las opciones habilitadas en la plataforma. Se entenderán conocidos y aceptados estos Términos y Condiciones mediante la aceptación expresa del usuario, realizada a través de un “click” en el recuadro correspondiente o mediante la confirmación de compra.</p>
  <p>El registro en www.whittardperu.com es gratuito. Para registrarse, el usuario deberá completar el formulario publicado en este sitio web con información verdadera, vigente y actualizada. El formulario podrá requerir datos como nombres y apellidos, documento de identidad, teléfono, correo electrónico, dirección de entrega y datos necesarios para la facturación o atención del pedido.</p>
  <p>El usuario es responsable, en caso de compartir el dispositivo de acceso, de proteger sus claves, cuentas y accesos frente al uso de terceros. Whittard Perú no será responsable por operaciones realizadas desde una cuenta del usuario cuando estas se hayan generado por descuido, entrega voluntaria de claves o uso indebido por parte de terceros.</p>

  <h2>Contraseña o clave secreta</h2>
  <p>El acceso del usuario será personalizado, confidencial y seguro. El usuario tendrá la posibilidad de cambiar su contraseña siguiendo el procedimiento establecido en el sitio web www.whittardperu.com. El usuario asume totalmente la responsabilidad por mantener la confidencialidad de su clave secreta registrada en este sitio web, así como de los accesos asociados a su cuenta. Dichas claves son de uso personal y su entrega a terceros no involucra responsabilidad de Whittard Perú en caso de mala utilización. El usuario acepta responsabilizarse por cualquier uso de este sitio web realizado desde su cuenta, incluyendo el uso por parte de terceros en su nombre.</p>

  <h2>Derechos del usuario del sitio</h2>
  <p>El usuario gozará de los derechos reconocidos por la legislación peruana vigente en materia de protección al consumidor, así como de los derechos otorgados en los presentes Términos y Condiciones. Asimismo, el usuario podrá ejercer sus derechos de acceso, rectificación, cancelación y oposición respecto de sus datos personales, conforme a la Ley N.° 29733, Ley de Protección de Datos Personales, y su Reglamento aprobado por el Decreto Supremo N.° 016-2024-JUS, de acuerdo con lo indicado en la Política de Privacidad de Whittard Perú.</p>
  <p>La sola visita a este sitio web, en el cual se ofrecen determinados productos, no impone al consumidor obligación alguna, a menos que haya aceptado las condiciones ofrecidas por la empresa o haya realizado una compra en la forma indicada en estos Términos y Condiciones.</p>

  <h2>Procedimientos para hacer uso de www.whittardperu.com</h2>
  <p>Para los productos ofrecidos por medio de este sitio web, Whittard Perú informará de manera adecuada y accesible los pasos que deben seguirse para realizar una compra. Una vez recibida la solicitud del pedido, se podrá enviar una confirmación al correo electrónico proporcionado por el usuario. Esta solicitud pasará por un proceso de validación de datos del cliente, información del pago, disponibilidad de stock y preparación del pedido. Luego, se emitirá el comprobante correspondiente, el cual podrá ser enviado al cliente junto con el despacho de su pedido o por correo electrónico, según corresponda.</p>
  <p>El producto será entregado en la dirección indicada por el cliente y dentro del plazo informado durante el proceso de compra, sujeto a cobertura, disponibilidad logística y validación del pago. Cualquier dato consignado erróneamente u omitido por el cliente en el formulario de compra podrá generar retrasos, reprogramaciones, costos adicionales o incluso la anulación de la compra, según evaluación de Whittard Perú. Whittard Perú indicará sus canales oficiales de atención para que el consumidor pueda identificar y corregir errores en sus datos, despacho o pedido, cuando ello sea posible.</p>
  <p><strong>Importante:</strong> El proceso de validación se realiza con la finalidad de proteger a nuestros clientes, evitar el uso indebido de datos y prevenir posibles fraudes. El cliente deberá tomar en cuenta que el banco, entidad emisora o pasarela de pago podría validar la transacción. Mientras el pago no sea aprobado, Whittard Perú no podrá procesar ni despachar el pedido.</p>

  <h2>Medios de pago</h2>
  <p>Los productos ofrecidos en este sitio web podrán ser pagados mediante los medios de pago habilitados por Whittard Perú, tales como pagos en línea, tarjetas de crédito, tarjetas de débito, transferencias bancarias, Yape, Plin u otros medios disponibles en la web. Los pagos en línea serán procesados por la pasarela de pago habilitada, quien se encarga del procesamiento de las transacciones. Los pagos con tarjeta podrán realizarse con tarjetas de débito y crédito de las marcas aceptadas en el sitio web, tales como Visa, Mastercard, American Express, Diners Club u otras que se indiquen durante el proceso de compra.</p>
  <p>El uso de tarjetas de crédito o débito se sujetará a lo establecido por el banco emisor, la entidad financiera, la pasarela de pago y los respectivos contratos o reglamentos de uso de tarjetas. En caso de contradicción, prevalecerán las condiciones establecidas por la entidad emisora de la tarjeta o proveedor del servicio de pago. Whittard Perú no será responsable por rechazos, bloqueos, errores de autenticación, falta de fondos, restricciones para compras por internet, demoras o cualquier inconveniente atribuible al banco, entidad emisora, pasarela de pago o proveedor correspondiente.</p>
  <p>Los reembolsos por devoluciones, anulaciones o pagos parciales y/o totales se realizarán, de corresponder, a través del mismo medio de pago utilizado en la compra, salvo que Whittard Perú y el cliente acuerden otro mecanismo permitido. En el caso de tarjetas de crédito o débito, el plazo de devolución dependerá de las políticas del banco emisor, pasarela de pago o entidad financiera del cliente. En caso de realizar una compra mediante transferencia bancaria, Yape o Plin, el cliente deberá enviar el comprobante de pago al correo o WhatsApp indicado por Whittard Perú para confirmar la operación.</p>

  <h2>Formación del consentimiento en los contratos celebrados a través de este sitio</h2>
  <p>A través de este sitio web, Whittard Perú realizará ofertas de productos que podrán ser aceptadas vía electrónica, correo, teléfono, WhatsApp o mediante los mecanismos que el sitio web ofrezca. Toda aceptación de oferta quedará sujeta a la validación de la transacción por parte de Whittard Perú. En consecuencia, para toda operación realizada en este sitio web, la confirmación, validación o verificación por parte de Whittard Perú será requisito esencial para la formación definitiva del consentimiento.</p>
  <p>Para validar la transacción durante el proceso de compra online, Whittard Perú podrá verificar lo siguiente:</p>
  <ul>
    <li>a) El precio del producto incluido en la orden.</li>
    <li>b) El medio de pago utilizado por el usuario.</li>
    <li>c) Que los datos registrados por el cliente coincidan con los proporcionados al efectuar la compra.</li>
    <li>d) Que exista stock disponible del producto ofertado.</li>
    <li>e) Que la dirección de entrega se encuentre dentro de la zona de cobertura.</li>
    <li>f) Que el pago haya sido aprobado por el banco, pasarela de pago o medio correspondiente.</li>
  </ul>
  <p>Al finalizar la compra, el sitio web podrá mostrar una pantalla de confirmación del pedido y/o enviar un correo electrónico a la cuenta proporcionada por el usuario durante el proceso de compra.</p>

  <h2>Despacho a domicilio</h2>
  <p>La información del lugar de envío, referencias, número de contacto y persona autorizada para recibir el pedido es de exclusiva responsabilidad del usuario. Para la entrega del pedido, será requisito:</p>
  <ul>
    <li>a) Que la persona que reciba el pedido sea el usuario o la persona designada por él durante el proceso de compra.</li>
    <li>b) Que la persona que reciba el pedido sea mayor de edad y, de ser solicitado, presente su DNI.</li>
    <li>c) Que el usuario o persona designada revise el pedido al momento de la entrega.</li>
    <li>d) Que, una vez concluida la entrega, el personal de despacho solicite una firma, constancia digital, fotografía u otro mecanismo de conformidad de entrega.</li>
  </ul>
  <p>Whittard Perú o el operador logístico podrá esperar un tiempo razonable luego de notificar al cliente la llegada del repartidor al domicilio indicado. En caso no se pueda concretar la entrega por ausencia del cliente, datos incorrectos, falta de respuesta o cualquier causa atribuible al usuario, Whittard Perú podrá coordinar la reprogramación de la entrega. Las reprogramaciones podrán generar un costo de envío adicional equivalente al monto correspondiente a la nueva entrega, el cual deberá ser asumido por el cliente.</p>
  <p>Durante campañas específicas como Cyber, Día de la Madre, Día del Padre, Navidad u otros eventos que incrementen la cantidad de pedidos, Whittard Perú podrá coordinar con el cliente la reprogramación de pedidos cuando existan factores logísticos, operativos o de fuerza mayor que lo justifiquen.</p>

  <h2>Derecho de anulación</h2>
  <p>Whittard Perú podrá aceptar solicitudes de anulación siempre que el pedido no haya sido preparado, facturado, despachado o entregado al operador logístico. Las anulaciones deberán solicitarse a través de los canales oficiales de atención de Whittard Perú, indicando el número de pedido, nombre completo y motivo de la solicitud. Si el pedido ya se encuentra en preparación, despacho o fue entregado al operador logístico, la solicitud de anulación estará sujeta a evaluación y podría gestionarse como cambio, devolución o reprogramación, según corresponda. Si la compra fue realizada mediante tarjeta de crédito o débito, el banco emisor o pasarela de pago será responsable de procesar el extorno bajo sus propios plazos. Si la compra fue realizada mediante Yape, Plin o transferencia bancaria, la devolución se gestionará previa validación de los datos del cliente y dentro del plazo informado por Whittard Perú.</p>

  <h2>Cambios y devolución de productos</h2>
  <p>El usuario podrá solicitar un cambio o devolución dentro de los 10 días calendario posteriores a la recepción del pedido, siempre que se cumplan las siguientes condiciones:</p>
  <ul>
    <li>a) El producto no muestre evidencia de uso.</li>
    <li>b) El producto se encuentre sellado, sin abrir y en buen estado.</li>
    <li>c) El empaque, etiqueta, accesorios y presentación original no se encuentren dañados o maltratados.</li>
    <li>d) Se presente la boleta, factura o comprobante de compra.</li>
    <li>e) El producto cumpla con condiciones sanitarias adecuadas para su evaluación o eventual reventa.</li>
  </ul>
  <p>No se aceptarán cambios ni devoluciones de productos abiertos, usados, manipulados, deteriorados por causas atribuibles al cliente, sin empaque original, sin sello de seguridad o que no cumplan con las condiciones antes indicadas, salvo que exista una falla, daño de origen o error atribuible a Whittard Perú. Toda solicitud estará sujeta a evaluación por parte de Whittard Perú.</p>

  <h2>Vigencia y validez de los productos contenidos en este sitio</h2>
  <p>Los precios de los productos publicados en este sitio web se encuentran vigentes únicamente mientras aparezcan en www.whittardperu.com, salvo que se indique una vigencia específica o hasta agotar stock. Whittard Perú podrá modificar cualquier información contenida en este sitio web, incluyendo precios, promociones, imágenes, descripciones, disponibilidad y condiciones comerciales, en cualquier momento. Dichas modificaciones no afectarán las compras que ya hayan sido confirmadas y validadas por la empresa.</p>

  <h2>Otros sitios web</h2>
  <p>www.whittardperu.com podría contener enlaces a otros sitios web o portales de terceros. Whittard Perú no garantiza, avala ni respalda de ninguna forma el acceso, contenido, seguridad, políticas, términos o tratamiento de datos personales de dichos sitios externos. Una vez que el usuario abandone nuestro sitio web, estará sujeto a los términos y políticas del sitio al que acceda.</p>

  <h2>Contenido fotográfico como referencia</h2>
  <p>Las fotos de productos que aparecen en el sitio web son referenciales. Pueden existir variaciones entre la foto mostrada en www.whittardperu.com y el producto recibido, especialmente en color, presentación, empaque, lote, edición o disponibilidad. Para mayor detalle, el usuario deberá revisar la ficha de cada producto, donde encontrará características, presentation, contenido, ingredientes, alérgenos, recomendaciones de uso y demás información relevante.</p>

  <h2>Libro de Reclamaciones</h2>
  <p>Whittard Perú cuenta con un Libro de Reclamaciones a disposición de los consumidores, conforme a la normativa peruana vigente. El usuario podrá registrar una queja o reclamo a través del Libro de Reclamaciones disponible en la web o mediante los canales oficiales establecidos por Whittard Perú. La presentación de un reclamo no limita el derecho del consumidor de acudir a las autoridades competentes si lo considera necesario.</p>

  <h2>Protección de datos personales</h2>
  <p>Los datos personales proporcionados por los usuarios serán tratados conforme a la Política de Privacidad de Whittard Perú, la Ley N.° 29733, Ley de Protección de Datos Personales, y su Reglamento aprobado por el Decreto Supremo N.° 016-2024-JUS. El usuario podrá ejercer sus derechos de acceso, rectificación, cancelación y oposición respecto de sus datos personales, conforme a la normativa vigente, a través del correo indicado en la Política de Privacidad de Whittard Perú.</p>

  <h2>Legislación aplicable</h2>
  <p>Los presentes Términos y Condiciones se rigen por las leyes de la República del Perú. Cualquier controversia relacionada con el uso del sitio web, compras realizadas, interpretación o cumplimiento de estos Términos y Condiciones será atendida conforme a la normativa peruana vigente y por las autoridades competentes.</p>

  <p><em>Última actualización: 23/06/2026.</em></p>
`;

export default function Page() {
  return <TermsView htmlContent={MOCK_TERMS_CONTENT} />;
}
