import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url('EXPO_PUBLIC_API_URL must be a valid URL'),
  EXPO_PUBLIC_WS_URL: z
    .string()
    .regex(/^wss?:\/\//, 'EXPO_PUBLIC_WS_URL must start with ws:// or wss://'),
  EXPO_PUBLIC_API_TOKEN: z.string().min(1, 'EXPO_PUBLIC_API_TOKEN is required'),
});

type Env = z.infer<typeof envSchema>;

const parseEnv = (): Env => {
  const result = envSchema.safeParse({
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
    EXPO_PUBLIC_WS_URL: process.env.EXPO_PUBLIC_WS_URL,
    EXPO_PUBLIC_API_TOKEN: process.env.EXPO_PUBLIC_API_TOKEN,
  });

  if (!result.success) {
    const errors = result.error.errors
      .map((e) => `  • ${e.path.join('.')}: ${e.message}`)
      .join('\n');

    throw new Error(`Invalid environment variables:\n${errors}`);
  }

  return result.data;
};

export const env = parseEnv();
