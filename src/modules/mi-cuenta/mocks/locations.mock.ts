import type { Department } from '../types/profile';

export const MOCK_DEPARTMENTS: Department[] = [
  {
    id: 'lima',
    name: 'Lima',
    provinces: [
      {
        id: 'lima-prov',
        name: 'Lima',
        districts: [
          { id: 'mir', name: 'Miraflores' },
          { id: 'san-isid', name: 'San Isidro' },
          { id: 'san-bor', name: 'San Borja' },
          { id: 'bar', name: 'Barranco' },
          { id: 'sur', name: 'Surco' },
          { id: 'la-mol', name: 'La Molina' },
          { id: 'san-mig', name: 'San Miguel' },
          { id: 'jes-mar', name: 'Jesús María' },
          { id: 'magd', name: 'Magdalena del Mar' },
          { id: 'lin', name: 'Lince' },
        ],
      },
      {
        id: 'callao',
        name: 'Callao',
        districts: [
          { id: 'call-call', name: 'Callao' },
          { id: 'la-perl', name: 'La Perla' },
          { id: 'la-punt', name: 'La Punta' },
          { id: 'vent', name: 'Ventanilla' },
        ],
      },
    ],
  },
  {
    id: 'arequipa',
    name: 'Arequipa',
    provinces: [
      {
        id: 'areq-prov',
        name: 'Arequipa',
        districts: [
          { id: 'areq-cerc', name: 'Arequipa (Cercado)' },
          { id: 'yan', name: 'Yanahuara' },
          { id: 'cay', name: 'Cayma' },
          { id: 'cerr', name: 'Cerro Colorado' },
        ],
      },
      {
        id: 'caman',
        name: 'Camaná',
        districts: [
          { id: 'caman-cam', name: 'Camaná' },
          { id: 'jose-m', name: 'José María Quimper' },
        ],
      },
    ],
  },
  {
    id: 'cusco',
    name: 'Cusco',
    provinces: [
      {
        id: 'cus-prov',
        name: 'Cusco',
        districts: [
          { id: 'cus-cerc', name: 'Cusco (Cercado)' },
          { id: 'san-seb', name: 'San Sebastián' },
          { id: 'san-jer', name: 'San Jerónimo' },
        ],
      },
    ],
  },
  {
    id: 'la-libertad',
    name: 'La Libertad',
    provinces: [
      {
        id: 'truj',
        name: 'Trujillo',
        districts: [
          { id: 'truj-cerc', name: 'Trujillo (Cercado)' },
          { id: 'vic-lar', name: 'Víctor Larco Herrera' },
          { id: 'huanch', name: 'Huanchaco' },
        ],
      },
    ],
  },
  {
    id: 'piura',
    name: 'Piura',
    provinces: [
      {
        id: 'piur-prov',
        name: 'Piura',
        districts: [
          { id: 'piur-cerc', name: 'Piura (Cercado)' },
          { id: 'cast', name: 'Castilla' },
        ],
      },
    ],
  },
];
