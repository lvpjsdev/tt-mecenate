// Feature: ui-kit-components, Property 2: TabItem visual state invariant
// Validates: Requirements 1.2, 1.3
import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-native', () => ({
  Pressable: ({ children, style, onPress, testID }: any) => ({
    type: 'Pressable',
    props: { children, style, onPress, testID },
  }),
  StyleSheet: { create: (s: any) => s },
}));

vi.mock('../../styles/theme', () => ({
  theme: {
    colors: {
      primary: { default: '#6115cd', disabled: '#d5c9ff' },
      text: { inverse: '#ffffff', secondary: '#57626f', disabled: '#c3cad1' },
    },
    borderRadius: { '2xl': 22, full: 9999 },
    spacing: { xs: 4, sm: 6, lg: 12 },
  },
}));

vi.mock('../Text', () => ({
  Text: ({ children, color, variant }: any) => ({
    type: 'Text',
    props: { children, color, variant },
  }),
}));

vi.mock('./TabItem.styles', () => ({
  stylesheet: { container: {} },
}));

import { TabItem } from './TabItem';

describe('Property 2: TabItem visual state invariant', () => {
  it('active=true always uses correct background and inverse text color', () => {
    fc.assert(
      fc.property(fc.boolean(), (disabled) => {
        const result = TabItem({ label: 'Tab', active: true, disabled }) as any;
        const bg = result.props.style[1].backgroundColor;
        const textColor = result.props.children.props.color;
        if (disabled) {
          expect(bg).toBe('#d5c9ff');
        } else {
          expect(bg).toBe('#6115cd');
        }
        expect(textColor).toBe('#ffffff');
      }),
      { numRuns: 100 },
    );
  });

  it('active=false always uses transparent background and secondary/disabled text', () => {
    fc.assert(
      fc.property(fc.boolean(), (disabled) => {
        const result = TabItem({ label: 'Tab', active: false, disabled }) as any;
        const bg = result.props.style[1].backgroundColor;
        const textColor = result.props.children.props.color;
        expect(bg).toBe('transparent');
        if (disabled) {
          expect(textColor).toBe('#c3cad1');
        } else {
          expect(textColor).toBe('#57626f');
        }
      }),
      { numRuns: 100 },
    );
  });
});
