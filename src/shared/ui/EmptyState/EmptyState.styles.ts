import { StyleSheet } from 'react-native';
import { tokens } from '@/shared/styles/tokens';

export const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.palette.neutral[0],
  },
  content: {
    alignItems: 'center',
    gap: tokens.spacing.xl,
    paddingHorizontal: tokens.spacing.xl,
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
