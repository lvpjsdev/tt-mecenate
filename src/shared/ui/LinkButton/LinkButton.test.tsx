import { describe, expect, it, vi } from 'vitest';

vi.mock('react-native', () => ({
  Pressable: ({ children, onPress }: any) => ({
    type: 'Pressable',
    props: { children, onPress },
  }),
  Text: ({ children, style }: any) => ({
    type: 'Text',
    props: { children, style },
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

describe('LinkButton', () => {
  it('default state: text color is primary.default', () => {
    const result = LinkButton({ label: 'Link' }) as any;
    const color = result.props.children({ pressed: false }).props.style[1].color;
    expect(color).toBe('#6115cd');
  });

  it('pressed state: text color is primary.hover', () => {
    const result = LinkButton({ label: 'Link' }) as any;
    const color = result.props.children({ pressed: true }).props.style[1].color;
    expect(color).toBe('#4e11a4');
  });

  it('disabled state: text color is primary.disabled', () => {
    const result = LinkButton({ label: 'Link', disabled: true }) as any;
    const color = result.props.children({ pressed: false }).props.style[1].color;
    expect(color).toBe('#d5c9ff');
  });

  it('disabled blocks onPress', () => {
    const onPress = vi.fn();
    const result = LinkButton({ label: 'Link', disabled: true, onPress }) as any;
    result.props.onPress();
    expect(onPress).not.toHaveBeenCalled();
  });

  it('enabled calls onPress', () => {
    const onPress = vi.fn();
    const result = LinkButton({ label: 'Link', onPress }) as any;
    result.props.onPress();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('label is rendered', () => {
    const result = LinkButton({ label: 'Click me' }) as any;
    const text = result.props.children({ pressed: false });
    expect(text.props.children).toBe('Click me');
  });
});
