import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-native', () => ({
  Pressable: ({ children, onPress }: any) => ({
    type: 'Pressable',
    props: { children, onPress },
  }),
  StyleSheet: { create: (s: any) => s },
}));

vi.mock('../../styles/theme', () => ({
  theme: {
    colors: {
      primary: { default: '#6115cd', hover: '#4e11a4', disabled: '#d5c9ff' },
    },
    typography: { fontSize: { base: 15 }, fontWeight: { medium: 500 } },
    spacing: { xs: 4 },
  },
}));

vi.mock('./LinkButton.styles', () => ({
  stylesheet: { label: {} },
}));

import { LinkButton } from './LinkButton';

describe('Property 7: Disabled components do not invoke onPress', () => {
  it('disabled LinkButton never calls onPress regardless of press count', () => {
    fc.assert(
      fc.property(fc.nat(10), (pressCount) => {
        const onPress = vi.fn();
        const result = LinkButton({ label: 'Link', disabled: true, onPress }) as any;
        for (let i = 0; i < pressCount; i++) {
          result.props.onPress();
        }
        expect(onPress).not.toHaveBeenCalled();
      }),
      { numRuns: 100 },
    );
  });
});
