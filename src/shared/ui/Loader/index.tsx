import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { SpinningIcon } from '@/shared/ui';
import { ICON_SIZE } from '@/shared/ui/Icon/icons';

interface LoaderProps {
  paddingVertical?: number;
}

export function Loader({ paddingVertical = 16 }: LoaderProps) {
  const theme = useTheme();
  return (
    <View style={[styles.container, { paddingVertical }]}>
      <SpinningIcon size={ICON_SIZE.md} color={theme.colors.icon.default} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
