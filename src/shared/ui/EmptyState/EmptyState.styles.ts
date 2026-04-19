import { StyleSheet } from 'react-native';
import { theme } from '@/shared/styles/theme';

export const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.default,
  },
  content: {
    alignItems: 'center',
    gap: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
  },
  illustration: {
    width: 112,
    height: 112,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  actionWrapper: {
    alignSelf: 'stretch',
  },
});
