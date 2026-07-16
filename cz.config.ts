import { definePrompt } from 'cz-git';

export default definePrompt({
  alias: {
    fd: 'docs: corregir errores tipográficos',
  },

  messages: {
    type: 'Selecciona el tipo de cambio que vas a realizar:',
    scope: 'Selecciona el módulo afectado (opcional):',
    customScope: 'Escribe un scope personalizado:',
    subject: 'Describe brevemente el cambio:\n',
    body: 'Describe el cambio con más detalle (opcional, Enter para omitir). Usa "|" para crear una nueva línea:\n',
    breaking: 'Describe los BREAKING CHANGES (opcional). Usa "|" para crear una nueva línea:\n',
    footerPrefixesSelect: 'Selecciona el tipo de referencia o issue relacionado (opcional):',
    customFooterPrefix: 'Ingresa un prefijo personalizado:',
    footer: 'Ingresa los issues relacionados. Ejemplo: #31, #34:\n',
    generatingByAI: 'Generando descripción mediante IA...',
    generatedSelectByAI: 'Selecciona la descripción sugerida:',
    confirmCommit: '¿Deseas crear este commit?',
  },

  types: [
    {
      value: 'feat',
      name: '✨ feat: Nueva funcionalidad',
      emoji: '✨',
    },
    {
      value: 'fix',
      name: '🐛 fix: Corrección de errores',
      emoji: '🐛',
    },
    {
      value: 'docs',
      name: '📝 docs: Documentación',
      emoji: '📝',
    },
    {
      value: 'style',
      name: '💎 style: Cambios de formato y estilos',
      emoji: '💎',
    },
    {
      value: 'refactor',
      name: '♻️ refactor: Refactorización de código',
      emoji: '♻️',
    },
    {
      value: 'perf',
      name: '🚀 perf: Mejora de rendimiento',
      emoji: '🚀',
    },
    {
      value: 'test',
      name: '✅ test: Agregar o actualizar pruebas',
      emoji: '✅',
    },
    {
      value: 'build',
      name: '📦 build: Configuración de build o dependencias',
      emoji: '📦',
    },
    {
      value: 'ci',
      name: '🤖 ci: Configuración de CI/CD',
      emoji: '🤖',
    },
    {
      value: 'chore',
      name: '🔧 chore: Tareas de mantenimiento',
      emoji: '🔧',
    },
    {
      value: 'revert',
      name: '⏪ revert: Revertir cambios anteriores',
      emoji: '⏪',
    },
  ],

  scopes: [
    'auth',
    'products',
    'cart',
    'checkout',
    'users',
    'orders',
    'shared',
    'ui',
    'app',
    'providers',
    'store',
    'styles',
    'config',
    'docs',
    'docker',
    'deployment',
    'ci',
    'husky',
  ],

  useEmoji: false,

  emojiAlign: 'center',
  skipQuestions: ['footer', 'breaking', 'footerPrefix'],
  allowCustomScopes: true,
  allowEmptyScopes: true,

  customScopesAlias: 'personalizado',
  emptyScopesAlias: 'sin scope',
  markBreakingChangeMode: false,

  allowBreakingChanges: ['feat', 'fix'],
  enableMultipleScopes: true,
  scopeEnumSeparator: ',',
  breaklineNumber: 100,

  issuePrefixes: [
    {
      value: 'closed',
      name: 'closed: Issue resuelto',
    },
  ],

  allowCustomIssuePrefix: true,
  allowEmptyIssuePrefix: true,
  customScopesAlign: 'bottom',
  confirmColorize: true,
  // maxSubjectLength: 100,
  // minSubjectLength: 5,
  useAI: false,
});
