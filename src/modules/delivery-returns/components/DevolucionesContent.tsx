import { Heading } from '@/shared/components/custom-ui/Heading';
import { Text } from '@/shared/components/custom-ui/Text';

export function DevolucionesContent() {
  return (
    <div className="mx-auto mb-12 max-w-2xl space-y-6 text-center">
      <Heading as="h2" variant="heading" className="font-brand-elephant">
        Sobre las Devoluciones
      </Heading>

      <Text variant="body" className="text-brand-secondary text-sm">
        Puedes solicitar un cambio o devolución siempre que el producto se encuentre en buen estado,
        sin uso, con su empaque original y dentro de 10 días calendario. Para iniciar el proceso,
        deberás comunicarte con nuestro equipo de atención al cliente indicando tu número de pedido
        y el motivo de la solicitud. La evaluación estará sujeta a las condiciones del producto y a
        nuestras políticas de cambios y devoluciones.
      </Text>
    </div>
  );
}
