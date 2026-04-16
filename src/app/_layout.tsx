// TODO: При выпуске финального релиза заменить на экспорт шрифтов через Expo Config Plugin
import { SpaceMono_400Regular, useFonts } from '@expo-google-fonts/dev';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono_400Regular,
  });

  if (!loaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
