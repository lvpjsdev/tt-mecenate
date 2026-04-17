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
        mutator: {
          path: './src/shared/api/client.ts',
          name: 'customClient',
        },
      },
    },
  },
});
