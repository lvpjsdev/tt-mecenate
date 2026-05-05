import { defineConfig } from 'orval';

export default defineConfig({
  mecenateMock: {
    input: './openapi.json',
    output: {
      target: './src/rest-generated.ts',
      client: 'hono',
      mode: 'single',
      tsconfig: './tsconfig.json',
    },
  },
});
