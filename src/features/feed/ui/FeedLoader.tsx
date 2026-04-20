import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { SpinningIcon } from '@/shared/ui';
import { ICON_SIZE } from '@/shared/ui/Icon/icons';

interface FeedLoaderProps {
  paddingVertical?: number;
}

export function FeedLoader({ paddingVertical = 16 }: FeedLoaderProps) {
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
