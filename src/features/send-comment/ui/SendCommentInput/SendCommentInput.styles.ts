import { StyleSheet } from 'react-native';
import { tokens } from '@/shared/styles/tokens';

export const stylesheet = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: tokens.spacing.xl,
    paddingRight: tokens.spacing.xl,
    paddingBottom: 13,
    paddingLeft: tokens.spacing.xl,
    gap: tokens.spacing.base,
  },
  input: {
    flex: 1,
    borderRadius: tokens.borderRadius.xl,
    paddingVertical: tokens.spacing.base,
    paddingHorizontal: tokens.spacing.xl,
    borderWidth: 2,
    fontSize: tokens.fontSize.base,
    // borderColor, backgroundColor, color — передаются из компонента через useTheme()
  },
});
