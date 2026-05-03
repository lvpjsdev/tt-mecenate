import { defineConfig } from 'orval';

export default defineConfig({
  // HTTP client generation (axios-functions)
  mecenate: {
    input: './openapi.json',
    output: {
      target: './src/shared/api/generated',
      client: 'axios-functions',
      mode: 'tags-split',
      tsconfig: './tsconfig.json',
      clean: true,
      override: {
        components: {
          schemas: {
            suffix: 'DTO',
          },
        },
        mutator: {
          path: './src/shared/api/client.ts',
          name: 'customClient',
        },
      },
    },
    // Хак для того что бы Typescript считал файл модулем
    hooks: {
      afterAllFilesWrite: 'node scripts/patch-generated-schemas.mjs',
    },
  },

  // Zod schema generation for runtime validation
  mecenateZod: {
    input: './openapi.json',
    output: {
      target: './src/shared/api/generated',
      client: 'zod',
      mode: 'tags-split',
      fileExtension: '.zod.ts',
    },
  },
});
