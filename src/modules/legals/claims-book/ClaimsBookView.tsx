import { ComplaintsBookSection } from '@/modules/content/types/legals';
import { Container } from '@/shared/components/custom-ui/Container';
import { Heading } from '@/shared/components/custom-ui/Heading';
import { Text } from '@/shared/components/custom-ui/Text';
import { ClaimsBookForm } from './components/ClaimsBookForm';
import type { ClaimsBookContent } from './types/claims-book';

interface ClaimsBookViewProps {
  content?: ComplaintsBookSection;
}

const DEFAULT_CLAIMS_CONTENT: ClaimsBookContent = {
  subtitle: 'OBSERVACIONES Y ACCIONES ADOPTADAS POR EL PROVEEDOR:',
  paragraph: `
    <p>*El plazo máximo de atención es de 30 días calendario desde su presentación, el cual podrá extenderse excepcionalmente de acuerdo a la complejidad del reclamo o queja lo cual será informado oportunamente mediante un previo aviso al USUARIO.</p>
    <p>*Con el envío del presente documento EL USUARIO valida la información consignada y declara haber sido debidamente informado sobre el procedimiento, plazo de atención y medio de respuesta a su reclamo o queja.</p>
    <p>*En caso el reclamo resulte procedente o improcedente, será notificado a través del correo electrónico por el cual nos está enviando la presente comunicación.</p>
    <p>*Su HOJA DE RECLAMO / QUEJA así como el seguimiento, le será enviado a su correo electrónico por el cual nos está enviando la presente comunicación.</p>
    <p>*La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.</p>
  `,
  info_definitions: [
    {
      label: 'Reclamo',
      value: 'Disconformidad relacionada a los productos o servicios.',
    },
    {
      label: 'Queja',
      value:
        'Disconformidad no relacionada a los productos o servicios o malestar o descontento respecto a la atención al público.',
    },
  ],
};

export function ClaimsBookView({ content }: ClaimsBookViewProps) {
  // Si desde el backend se configuró is_visible en false, deshabilitamos la vista
  if (content?.is_visible === false) {
    return null;
  }

  // Fusionamos los datos dinámicos recibidos del backend con el fallback estático
  const formContent: ClaimsBookContent = {
    ...DEFAULT_CLAIMS_CONTENT,
    paragraph: content?.observations || content?.paragraph || DEFAULT_CLAIMS_CONTENT.paragraph,
  };

  return (
    <Container as="main" size="full" className="mb-8 flex-1">
      <Container className="mt-14 mb-14 space-y-5">
        <Heading
          as="h1"
          variant="heading"
          className="font-brand-elephant text-brand-primary text-3xl"
        >
          {content?.title || 'Libro de Reclamaciones'}
        </Heading>

        {content?.paragraph ? (
          <Text
            variant="body"
            className="text-brand-secondary max-w-none text-sm leading-relaxed font-light"
          >
            {content.paragraph}
          </Text>
        ) : (
          <Text
            variant="body"
            className="text-brand-secondary max-w-none text-sm leading-relaxed font-light"
          >
            Con el objetivo de brindarle un mejor servicio, ponemos a su disposición nuestro Libro
            de Reclamaciones Virtual. Por favor, complete los datos requeridos para procesar su
            solicitud.
          </Text>
        )}

        <div className="pt-4">
          <ClaimsBookForm content={formContent} />
        </div>
      </Container>
    </Container>
  );
}
