import { useId } from 'react';

export function Stars({ rating }: { rating: number }) {
  // Generamos un ID único por cada tarjeta para que los gradientes no se pisen en el DOM
  const uniqueId = useId();

  // Forzamos que la nota esté estrictamente entre 0 y 5
  const safeRating = Math.max(0, Math.min(5, rating));

  return (
    <div className="flex items-center gap-1" aria-label={`${safeRating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, index) => {
        // Calculamos cuánto debe llenarse ESTA estrella en específico (de 0 a 1)
        const starFill = Math.max(0, Math.min(1, safeRating - index));
        const gradientId = `star-grad-${uniqueId}-${index}`;

        return (
          <svg key={index} className="size-4.5" viewBox="0 0 20 20" aria-hidden="true">
            <defs>
              {/* El gradiente se adapta dinámicamente al porcentaje exacto */}
              <linearGradient id={gradientId}>
                <stop offset={`${starFill * 100}%`} stopColor="#E7A81B" />
                <stop offset={`${starFill * 100}%`} stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${gradientId})`}
              // Cambiamos a un trazo sutil gris exterior para que las estrellas vacías tengan mejor definición
              className="stroke-transparent stroke-[0.5]"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        );
      })}

      {/* Texto sutil al lado para dar contexto real al usuario */}
      <span className="mt-0.5 ml-1 text-xs font-semibold text-gray-500">
        {safeRating.toFixed(1)}
      </span>
    </div>
  );
}
