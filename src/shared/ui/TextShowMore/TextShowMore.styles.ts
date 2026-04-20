import { StyleSheet } from 'react-native';
import { tokens } from '@/shared/styles/tokens';

const BODY_LINE_HEIGHT = tokens.fontSize.base * tokens.lineHeight.relaxed;

export const stylesheet = StyleSheet.create({
  container: {
    position: 'relative',
  },
  hiddenText: {
    position: 'absolute',
    opacity: 0,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: tokens.palette.neutral[0],
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: 40,
    height: BODY_LINE_HEIGHT,
  },
});
