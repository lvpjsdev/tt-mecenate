import { StyleSheet } from 'react-native';
import { tokens, lightTheme as theme } from '../../styles/theme';

export const stylesheet = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: tokens.spacing.xs,
    alignItems: 'center',
  },
});
