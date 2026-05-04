import { StyleSheet } from 'react-native';
import { tokens } from '@/shared/styles/tokens';

export const stylesheet = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: tokens.palette.neutral[0],
  },
  keyboardAvoiding: {
    flex: 1,
  },
});
