import { Heading } from '@/shared/components/custom-ui/Heading';
import { Text } from '@/shared/components/custom-ui/Text';

export function DeliveryContent() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 text-center">
      <Heading as="h2" variant="heading" className="font-brand-elephant">
        Sobre el Delivery
      </Heading>

      <Text variant="body" className="text-brand-secondary text-sm">
        Realizamos envíos a Lima Metropolitana (2 a 3 días hábiles) y provincias (3 a 7 días
        hábiles).
      </Text>

      <div className="text-brand-secondary space-y-1 text-sm">
        <Text variant="body" className="text-brand-secondary font-medium">
          Precio de envío:
        </Text>
        <ul className="mt-2 space-y-1">
          <li>
            Lima Metropolitana: S/ 10.00
            <ul className="mt-1 ml-6 list-disc space-y-1">
              <li>Ancón: S/ 15.00</li>
              <li>Independencia: S/ 15.00</li>
              <li>Lurín: S/ 15.00</li>
            </ul>
          </li>
          <li className="mt-1">San Juan de Lurigancho: S/ 15.00</li>
          <li>Santa Anita: S/ 15.00</li>
          <li>Comas: S/ 18.00</li>
          <li>Chaclacayo: S/ 20.00</li>
          <li>Pachacámac: S/ 20.00</li>
          <li>Santa Clara: S/ 20.00</li>
        </ul>
      </div>

      <Text variant="body" className="text-brand-secondary text-sm">
        Una vez confirmado tu pedido, recibirás la información necesaria para hacer seguimiento.
      </Text>
    </div>
  );
}
