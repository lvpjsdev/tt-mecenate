import { StyleSheet } from 'react-native';
import { tokens } from '../../styles/tokens';

export const stylesheet = StyleSheet.create({
  label: {
    fontSize: tokens.fontSize.base,
    fontWeight: `${tokens.fontWeight.medium}` as '500',
  },
});
