import { ApiServer } from '@/lib/http/server/api-server';

export const ContentService = {
  getPageContent: async <T>(slug: string, locale = 'es'): Promise<T> => {
    try {
      // Agregamos 'api/' al inicio del endpoint
      const response = await ApiServer.get<{ data: T } | T>(
        `api/v1/content/pages/${slug}?locale=${locale}`,
        {
          auth: false,
          cache: 'no-store',
        },
      );

      // Desempaquetamos la propiedad data de la respuesta del backend
      if (response && typeof response === 'object' && 'data' in response) {
        return (response as { data: T }).data;
      }

      return response as T;
    } catch (error) {
      console.error('--- ERROR EN CONTENT SERVICE ---', error);
      return {} as T;
    }
  },
};
