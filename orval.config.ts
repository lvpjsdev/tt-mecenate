import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
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
});
